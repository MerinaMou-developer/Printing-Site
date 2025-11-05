import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const fd = await req.formData();

    // Billing details
    const firstName   = String(fd.get("firstName") ?? "");
    const lastName    = String(fd.get("lastName") ?? "");
    const companyName = String(fd.get("companyName") ?? "");
    const country     = String(fd.get("country") ?? "");
    const address1    = String(fd.get("address1") ?? "");
    const address2    = String(fd.get("address2") ?? "");
    const city        = String(fd.get("city") ?? "");
    const state       = String(fd.get("state") ?? "");
    const phone       = String(fd.get("phone") ?? "");
    const email       = String(fd.get("email") ?? "");
    const orderNotes  = String(fd.get("orderNotes") ?? "");

    // Validate required fields
    if (!firstName.trim() || !lastName.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "First name and last name are required" 
      }, { status: 400 });
    }

    if (!phone.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Phone is required" 
      }, { status: 400 });
    }

    if (!email.trim()) {
      return NextResponse.json({ 
        ok: false, 
        error: "Email is required" 
      }, { status: 400 });
    }

    // Parse products from form data
    const products: Array<{
      productSlug: string;
      productName: string;
      quantity: number;
      emiratesId?: File;
      tradeLicense?: File;
      specificDesign?: File;
    }> = [];

    let productIndex = 0;
    while (fd.get(`products[${productIndex}][productSlug]`)) {
      const productSlug = String(fd.get(`products[${productIndex}][productSlug]`) ?? "");
      const productName = String(fd.get(`products[${productIndex}][productName]`) ?? "");
      const quantity = parseInt(String(fd.get(`products[${productIndex}][quantity]`) ?? "1"));
      
      const emiratesIdFile = fd.get(`products[${productIndex}][emiratesId]`) as File | null;
      const tradeLicenseFile = fd.get(`products[${productIndex}][tradeLicense]`) as File | null;
      const specificDesignFile = fd.get(`products[${productIndex}][specificDesign]`) as File | null;

      if (!emiratesIdFile || !tradeLicenseFile) {
        return NextResponse.json({ 
          ok: false, 
          error: `Missing required files for ${productName}` 
        }, { status: 400 });
      }

      products.push({
        productSlug,
        productName,
        quantity,
        emiratesId: emiratesIdFile,
        tradeLicense: tradeLicenseFile,
        specificDesign: specificDesignFile || undefined
      });

      productIndex++;
    }

    if (products.length === 0) {
      return NextResponse.json({ 
        ok: false, 
        error: "No products in order" 
      }, { status: 400 });
    }

    // Validate file sizes first (parallel check)
    const fileSizeErrors: string[] = [];
    for (const product of products) {
      if (product.emiratesId && product.emiratesId.size > 10 * 1024 * 1024) {
        fileSizeErrors.push(`Emirates ID file for ${product.productName} is too large. Maximum 10MB allowed.`);
      }
      if (product.tradeLicense && product.tradeLicense.size > 10 * 1024 * 1024) {
        fileSizeErrors.push(`Trade License file for ${product.productName} is too large. Maximum 10MB allowed.`);
      }
      if (product.specificDesign && product.specificDesign.size > 10 * 1024 * 1024) {
        fileSizeErrors.push(`Specific Design file for ${product.productName} is too large. Maximum 10MB allowed.`);
      }
    }
    
    if (fileSizeErrors.length > 0) {
      return NextResponse.json({ 
        ok: false, 
        error: fileSizeErrors[0] 
      }, { status: 400 });
    }

    // Build attachments from all files in parallel (much faster!)
    const attachmentPromises: Promise<{ filename: string; content: Buffer; contentType?: string }>[] = [];
    
    for (const product of products) {
      // Helper function to get content type from file
      const getContentType = (file: File): string => {
        if (file.type) return file.type;
        // Fallback: detect from extension
        const ext = file.name.toLowerCase().split('.').pop();
        const mimeTypes: Record<string, string> = {
          'pdf': 'application/pdf',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'gif': 'image/gif',
          'webp': 'image/webp'
        };
        return mimeTypes[ext || ''] || 'application/octet-stream';
      };
      
      // Add Emirates ID
      if (product.emiratesId && product.emiratesId.size > 0) {
        const emiratesIdFile = product.emiratesId;
        attachmentPromises.push(
          emiratesIdFile.arrayBuffer().then(buf => ({
            filename: `${product.productName} - Emirates ID - ${emiratesIdFile.name}`,
            content: Buffer.from(buf),
            contentType: getContentType(emiratesIdFile)
          }))
        );
      }

      // Add Trade License
      if (product.tradeLicense && product.tradeLicense.size > 0) {
        const tradeLicenseFile = product.tradeLicense;
        attachmentPromises.push(
          tradeLicenseFile.arrayBuffer().then(buf => ({
            filename: `${product.productName} - Trade License - ${tradeLicenseFile.name}`,
            content: Buffer.from(buf),
            contentType: getContentType(tradeLicenseFile)
          }))
        );
      }

      // Add Specific Design if provided
      if (product.specificDesign && product.specificDesign.size > 0) {
        const specificDesignFile = product.specificDesign;
        attachmentPromises.push(
          specificDesignFile.arrayBuffer().then(buf => ({
            filename: `${product.productName} - Specific Design - ${specificDesignFile.name}`,
            content: Buffer.from(buf),
            contentType: getContentType(specificDesignFile)
          }))
        );
      }
    }

    // Wait for all file conversions to complete in parallel
    const attachments = await Promise.all(attachmentPromises);

    // Build full address
    const fullAddress = [
      address1.trim(),
      address2.trim(),
      city.trim(),
      state.trim(),
      country.trim()
    ].filter(Boolean).join(", ");

    // Send email using SMTP
    await sendOrderEmail({
      name: `${firstName.trim()} ${lastName.trim()}`,
      phone: phone.trim(),
      email: email.trim(),
      companyName: companyName.trim(),
      address: fullAddress,
      country: country.trim(),
      products: products.map(p => ({
        productSlug: p.productSlug,
        productName: p.productName,
        quantity: p.quantity
      })),
      orderNotes: orderNotes.trim(),
      attachments
    });

    // Log successful submission
    console.log(`Order received from ${firstName} ${lastName} for ${products.length} product(s)`);

    return NextResponse.json({ 
      ok: true, 
      message: "Order submitted successfully!" 
    });

  } catch (err: unknown) {
    console.error("Order submission error:", err);
    
    return NextResponse.json({ 
      ok: false, 
      error: err instanceof Error ? err.message : "Failed to submit order. Please try again." 
    }, { status: 500 });
  }
}
