import React from 'react';
import pdf1 from '../pdf1.webp';
import pdf2 from '../pdf2.webp';
import pdf3 from '../pdf3.png';

interface Props { onSelect: (layout: string) => void; }

const layouts = [
  {
    name: 'Default ',
    preview: 'This contract is made between Party A and Party B. The terms and conditions are as follows...',
    pdf: pdf1
  },
  {
    name: 'Service Agreement ',
    preview: 'This contract is made between Party A and Party B. The terms and conditions are as follows...',
    pdf: pdf1
  },
  {
    name: 'Non-Disclosure Agreement (NDA)',
    preview: 'This agreement is made for the sale of goods. The seller agrees to deliver the goods as described...',
    pdf: pdf2
  },
  {
    name: 'Intellectual Property License Agreement',
    preview: 'Preview of contract C...',
    pdf: pdf3
  },
];

export default function LayoutSelector({ onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 ">
      {layouts.map(l => (
        <div
          key={l.name}
          className="p-0 bg-[#14213d] rounded-lg cursor-pointer transform transition duration-200
          text-center hover:scale-105 hover:shadow-2xl"
          onClick={() => onSelect(l.name)}
        >
          <h4 className="text-sm font-semibold mb-4">{l.name}</h4>
          <div className="relative bg-white p-4 rounded-lg border border-gray-300 shadow-md w-full h-[2in] max-w-[3in] mx-auto">
            <div className="absolute inset-0 border-2 border-gray-300 rounded-md">
              <div className="h-full p-0 text-sm ">
                <h5 className="font-semibold 
                text-lg mb-4 absolute top-1/2 left-1/2 transform 
                -translate-x-1/2 -translate-y-1/2 bg-gray-500 opacity-50 w-[95%] text-center  ">
                Preview:</h5>
                <img src={l.pdf.src} alt="Preview" className='w-full h-full' />
                {/* Exibe o link para download do PDF */}
                {/* <a 
                  href={l.pdf.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 underline mt-4 inline-block"
                >
                  Download PDF
                </a> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
