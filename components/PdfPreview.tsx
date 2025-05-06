import React, { useEffect, useState } from 'react';

type Props = { id: string; service: string; layout: string; answers: string[] };

export default function PdfPreview({ id, service, layout, answers }: Props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const doc = `
      <html>
        <head>
          <style>
            body {
              font-family: Georgia, 'Times New Roman', serif;
              padding: 1.5cm;
              margin: 0;
              line-height: 1.6;
              color: #000;
              box-sizing: border-box;
            }

            h1, h2 {
              text-align: center;
              margin-bottom: 10px;
            }

            h1 {
              font-size: 2.2rem;
              text-transform: uppercase;
            }

            h2 {
              font-size: 1.4rem;
              font-weight: normal;
              color: #333;
            }

            p {
              text-align: justify;
              margin-bottom: 1rem;
              font-size: 1rem;
            }

            hr {
              margin: 1.5rem 0;
            }

            /* Adicionando media query para telas menores */
            @media (max-width: 640px) {
              h1 {
                font-size: 1rem;
              }

              h2 {
                font-size: 0.5rem;
              }

              p {
                font-size: 0.3rem;
              }
            }
          </style>
        </head>
        <body>
          <h1>${layout}</h1>
          <h2>${service}</h2>
          <hr />
          ${answers.map((a) => `<p>${a}</p>`).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([doc], { type: 'text/html' });
    setUrl(URL.createObjectURL(blob));
  }, [answers]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="relative"
        style={{
          width: '100%',
          maxWidth: '420px', // Proporção A4: 210mm = 21cm
          aspectRatio: '210 / 297', // Mantém a proporção A4 vertical
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            border: 'none',
            transform: 'scale(1)',
            transformOrigin: 'top left',
          }}
        />
      </div>
    </div>
  );
}
