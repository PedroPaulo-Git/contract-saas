// import puppeteer from 'puppeteer';

// export async function generatePdf(data: any): Promise<Buffer> {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

//   const page = await browser.newPage();

//   await page.setContent(`<html><body>${data.text}</body></html>`, {
//     waitUntil: 'networkidle0',
//   });

//   const pdfUint8Array = await page.pdf({ format: 'A4' });
//   await browser.close();

//   return Buffer.from(pdfUint8Array); // 🔧 conversão correta aqui
// }
// import puppeteer from 'puppeteer';

// export async function generatePdf(data: any): Promise<Buffer> {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(`<html><body>${data.text}</body></html>`, {
//     waitUntil: 'networkidle0',
//   });

//   const pdfUint8Array = await page.pdf({ format: 'A4' });
//  await browser.close();

// return Buffer.from(pdfUint8Array); 
// }
