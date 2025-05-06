import fs from 'fs/promises';
import path from 'path';
import htmlPdf from 'html-pdf-node';

export async function generatePdf(html: string): Promise<Buffer> {
  const options = { format: 'A4' };
  const file = { content: html };
  const result = htmlPdf.generatePdf(file, options) as unknown;

  if (result instanceof Buffer) {
    return result; // Retorna o buffer caso o resultado seja um Buffer
  } else {
    throw new Error("O tipo retornado não é um Buffer.");
  }
}
