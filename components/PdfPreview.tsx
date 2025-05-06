import React, { useEffect, useState } from 'react';

type Props = { id: string; service: string; layout: string; answers: string[] };

export default function PdfPreview({ id, service, layout, answers }: Props) {
  const [html, setHtml] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    const doc = `<h1>${layout}</h1><h2>${service}</h2>${answers.map(a => `<p>${a}</p>`).join('')}`;
    setHtml(doc);
    const blob = new Blob([doc], { type: 'text/html' });
    setUrl(URL.createObjectURL(blob));
  }, [answers]);

  return (
    <iframe src={url} className="w-full h-96 border rounded" />
  );
}