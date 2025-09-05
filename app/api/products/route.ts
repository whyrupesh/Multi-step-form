// app/api/products/route.ts
import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/db";

// GET all products
export async function GET() {
  const products = readDB();
  return NextResponse.json(products);
}

// POST new product
export async function POST(request: Request) {
  try {
    // If you are sending FormData from the client:
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const price = Number(formData.get("price"));
    const tax = Number(formData.get("tax"));

    // Handle file upload
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
      image: imageBase64, // store as base64 in JSON DB
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
