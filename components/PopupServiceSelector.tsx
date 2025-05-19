import React,{useEffect} from 'react';
import { X } from 'lucide-react'; // ícone de fechar, certifique-se que tem 'lucide-react' instalado

interface Props {
  onSelect: (service: string) => void;
  onClose: () => void;
}

const services = [
  {
    name: 'Essay (Free Writing)',
    service: 'None',
    description: 'Write a personalized document without predefined structure or legal format.'
  },
  { 
    name: 'Freelance Agreement', 
    service: 'Service',
    description: 'For freelance projects, covering scope, deadlines, and payment terms.'
  },
  { 
    name: 'NDA (Non-Disclosure) Agreement', 
    service: 'NDA',
    description: 'Protect confidential information in business deals or partnerships.'
  },
  { 
    name: 'Service Contract', 
    service: 'IP',
    description: 'Ideal for recurring services or custom business arrangements.'
  },
];


export default function PopupServiceSelector({ onSelect, onClose }: Props) {
  useEffect(() => {
    console.log(onSelect)
    // Impede o scroll do fundo
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Libera o scroll ao fechar o popup
      document.body.style.overflow = '';
    };
  }, []);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="relative bg-[#1b263b] p-4 rounded shadow-md border border-[#415a77] mx-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-200 hover:text-red-500 rounded-full p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold text-center mb-6">Select the Type of Service</h3>

        <div className="space-y-4">
          {services.map(service => (
            <button
              key={service.name}
              onClick={() => onSelect(service.name)}
              className="w-full text-left p-4 border border-[#415a77] rounded-lg hover:border-[#415a77] hover:bg-blue-50 transition duration-200"
            >
              <div className="font-semibold text-cyan-500">{service.name}</div>
              <div className="text-sm text-gray-100">{service.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
