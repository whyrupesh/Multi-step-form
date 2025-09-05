
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



