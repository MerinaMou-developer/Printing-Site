const MAX_FILE_SIZE = 4 * 1024 * 1024; // Vercel request body limit ~4.5MB

export function getString(fd: FormData, key: string): string {
  const value = fd.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function getFileAttachment(
  fd: FormData,
  key = "file"
): Promise<{ filename: string; content: Buffer; contentType: string } | null> {
  const file = fd.get(key);
  if (!file || !(file instanceof File) || file.size === 0) return null;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    filename: file.name,
    content: buffer,
    contentType: file.type || "application/octet-stream",
  };
}

export async function getAllFileAttachments(
  fd: FormData,
  keys: string[]
): Promise<Array<{ filename: string; content: Buffer; contentType: string }>> {
  const attachments = [];
  for (const key of keys) {
    const att = await getFileAttachment(fd, key);
    if (att) attachments.push(att);
  }
  return attachments;
}

export function parseCartProducts(fd: FormData) {
  const products: Array<{
    productSlug: string;
    productName: string;
    quantity: number;
  }> = [];

  let index = 0;
  while (fd.has(`products[${index}][productSlug]`)) {
    products.push({
      productSlug: getString(fd, `products[${index}][productSlug]`),
      productName: getString(fd, `products[${index}][productName]`),
      quantity: parseInt(getString(fd, `products[${index}][quantity]`), 10) || 1,
    });
    index++;
  }

  return products;
}

export function buildCartAddress(fd: FormData): string {
  const parts = [
    getString(fd, "address1"),
    getString(fd, "address2"),
    getString(fd, "city"),
    getString(fd, "state"),
    getString(fd, "country"),
  ].filter(Boolean);
  return parts.join(", ");
}
