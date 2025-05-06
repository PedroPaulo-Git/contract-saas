import React from 'react';
import { X } from 'lucide-react'; // ícone de fechar, certifique-se que tem 'lucide-react' instalado

interface Props {
  onSelect: (service: string) => void;
  onClose: () => void;
}

const services = [
  { 
    name: 'Freelance Agreement', 
    description: 'For freelance projects, covering scope, deadlines, and payment terms.'
  },
  { 
    name: 'NDA (Non-Disclosure)', 
    description: 'Protect confidential information in business deals or partnerships.'
  },
  { 
    name: 'Service Contract', 
    description: 'Ideal for recurring services or custom business arrangements.'
  },
];


export default function PopupServiceSelector({ onSelect, onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="relative bg-white p-6 rounded-xl shadow-2xl max-w-md w-full text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-center mb-6">Select the Type of Service</h3>

        <div className="space-y-4">
          {services.map(service => (
            <button
              key={service.name}
              onClick={() => onSelect(service.name)}
              className="w-full text-left p-4 border rounded-lg hover:border-blue-600 hover:bg-blue-50 transition duration-200"
            >
              <div className="font-semibold text-blue-900">{service.name}</div>
              <div className="text-sm text-gray-600">{service.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
