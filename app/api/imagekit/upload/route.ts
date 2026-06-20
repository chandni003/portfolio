import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name || "resume.pdf",
      folder: "/resume",
      useUniqueFileName: true,
    });

    return NextResponse.json({ 
      url: result.url,
      fileId: result.fileId 
    }, { status: 200 });

  } catch (error: any) {
    console.error("ImageKit upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload to ImageKit", details: error.message },
      { status: 500 }
    );
  }
}
