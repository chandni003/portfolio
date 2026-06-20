import { NextRequest, NextResponse } from 'next/server';
import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');

    const response = await imagekit.upload({
      file: base64,
      fileName: 'portfolio_resume.pdf',
      folder: '/resume',
      useUniqueFileName: false,
    });

    return NextResponse.json({ url: response.url, fileId: response.fileId });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
