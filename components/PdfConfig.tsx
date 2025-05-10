'use client';

import { useState } from 'react';

export type PdfSettings = {
  h1Size: string;
  h2Size: string;
  receiveSize: string;
};

interface Props {
  onConfigChange: (settings: PdfSettings) => void;
}

export default function PdfConfig({ onConfigChange }: Props) {
  const [h1Size, setH1Size] = useState('22pt');
  const [h2Size, setH2Size] = useState('14pt');
  const [receiveSize, setReceiveSize] = useState('12pt');

  const handleChange = () => {
    onConfigChange({ h1Size, h2Size, receiveSize });
  };

  return (
    <div className="mt-4 p-4 border border-gray-600 rounded bg-[#1e293b] text-white">
      <h3 className="text-lg font-semibold mb-2">Configurações de PDF</h3>

      <label className="block mb-2">
        Tamanho do título (h1):
        <input
          type="text"
          value={h1Size}
          onChange={(e) => setH1Size(e.target.value)}
          className="ml-2 p-1 bg-gray-700 rounded"
        />
      </label>

      <label className="block mb-2">
        Tamanho do subtítulo (h2):
        <input
          type="text"
          value={h2Size}
          onChange={(e) => setH2Size(e.target.value)}
          className="ml-2 p-1 bg-gray-700 rounded"
        />
      </label>

      <label className="block mb-2">
        Tamanho do texto principal:
        <input
          type="text"
          value={receiveSize}
          onChange={(e) => setReceiveSize(e.target.value)}
          className="ml-2 p-1 bg-gray-700 rounded"
        />
      </label>

      <button
        onClick={handleChange}
        className="mt-2 bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
      >
        Aplicar
      </button>
    </div>
  );
}
