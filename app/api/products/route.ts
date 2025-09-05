
import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";


export async function GET() {
  const products = readDB();
  return NextResponse.json(products);
}


export async function POST(request: Request) {
  try {

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const tax = Number(formData.get("tax"));

    
    const imageFile = formData.get("image") as File | null;
    let imageBase64: string | null = null;

    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageBase64 = buffer.toString("base64");
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      tax,
      image: imageBase64, 
    };

    const products = readDB();
    products.unshift(newProduct);
    writeDB(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    let products = readDB();

    const exists = products.some((p: any) => p.id === id);
    if (!exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    products = products.filter((p: any) => p.id !== id);
    writeDB(products);

    return NextResponse.json({ status: "ok", id });
  } catch (err) {
    console.error("DELETE /api/products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
