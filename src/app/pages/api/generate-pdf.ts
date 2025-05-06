import { NextApiRequest, NextApiResponse } from "next";
import { generatePdf } from "../../../../lib/pdf";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { html } = req.body;
  try {
    const file = await generatePdf(html);
    res.setHeader("Content-Type", "application/pdf");
    res.send(file);
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
}
