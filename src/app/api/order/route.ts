import { sendOrderEmail, sendSimpleOrderEmail } from "@/lib/email";
import {
  buildCartAddress,
  getAllFileAttachments,
  getString,
  parseCartProducts,
} from "@/lib/form-utils";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const fd = await request.formData();
    const attachments = await getAllFileAttachments(fd, [
      "file",
      "emiratesId",
      "tradeLicense",
      "specificDesign",
    ]);

    // Cart checkout (order page with multiple products)
    const firstName = getString(fd, "firstName");
    if (firstName) {
      const lastName = getString(fd, "lastName");
      const phone = getString(fd, "phone");
      const email = getString(fd, "email");
      const products = parseCartProducts(fd);

      if (!phone || !email) {
        return NextResponse.json(
          { error: "Phone and email are required." },
          { status: 400 }
        );
      }

      if (products.length === 0) {
        return NextResponse.json(
          { error: "No products in order." },
          { status: 400 }
        );
      }

      await sendOrderEmail({
        name: `${firstName} ${lastName}`.trim(),
        phone,
        email,
        companyName: getString(fd, "companyName") || undefined,
        address: buildCartAddress(fd),
        country: getString(fd, "country") || "United Arab Emirates",
        products,
        orderNotes: getString(fd, "orderNotes") || undefined,
        attachments: attachments.length
          ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
          : undefined,
      });

      return NextResponse.json({ success: true });
    }

    // Single product order form
    const name = getString(fd, "name");
    const phone = getString(fd, "phone");
    const product = getString(fd, "product");
    const quantity = getString(fd, "quantity");

    if (!name || !phone || !product || !quantity) {
      return NextResponse.json(
        { error: "Name, phone, product, and quantity are required." },
        { status: 400 }
      );
    }

    await sendSimpleOrderEmail({
      name,
      phone,
      email: getString(fd, "email"),
      address: getString(fd, "address"),
      product,
      productSlug: getString(fd, "product_slug"),
      quantity,
      specifications: getString(fd, "specifications"),
      attachments: attachments.length
        ? attachments.map((a) => ({ filename: a.filename, content: a.content }))
        : undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to submit order.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
