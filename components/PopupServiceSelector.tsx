import React from 'react';

interface Props { onSelect: (service: string) => void; }
const services = ['Jurídico', 'Comercial', 'Outro'];

export default function PopupServiceSelector({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold text-center">Selecione o tipo de serviço</h3>
        <div className="mt-4 space-x-2 text-center">
          {services.map(s => (
            <button
              key={s}
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition duration-200"
              onClick={() => onSelect(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
