import { generatePdf } from "../../../../lib/pdf";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const pdfBuffer = await generatePdf(body);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    },
  });
}
