import React, { useEffect, useState } from 'react';
import pdf1 from '../pdf1.webp';
import pdf2 from '../pdf2.webp';
import pdf3 from '../pdf3.png';

interface Props {
  onSelect: (layout: string) => void;
}

const layouts = [
  {
    name: 'Default',
    service: 'Default',
    preview: 'This contract is made between Party A and Party B. The terms and conditions are as follows...',
    pdf: pdf1
  },
  {
    name: 'Service Agreement',
    service: 'Service',
    preview: 'This contract is made between Party A and Party B. The terms and conditions are as follows...',
    pdf: pdf1
  },
  {
    name: 'Non-Disclosure Agreement (NDA)',
    service: 'NDA',
    preview: 'This agreement is made for the sale of goods. The seller agrees to deliver the goods as described...',
    pdf: pdf2
  },
  {
    name: 'Intellectual Property License Agreement',
    service: 'IP',
    preview: 'Preview of contract C...',
    pdf: pdf3
  },
];

export default function LayoutSelector({ onSelect }: Props) {
  const [layoutSelected, setLayoutSelected] = useState<string>('Default');
  useEffect(() => {
    //console.log(layoutSelected)
    onSelect(layoutSelected);
  }, []); // Esse effect só roda uma vez, após a primeira renderização

  function handleClick(service:string) {
    // if(name != "Default"){
    //   console.log("isnt a Essay ")
    //   setLayoutSelected("Legal");
    //   onSelect("Legal");
    // }else{
    //   setLayoutSelected(name);
    //   onSelect(name);
    // }
    console.log(layoutSelected)
    // const convertLayout = name;

    setLayoutSelected(service);
    onSelect(service);
   // console.log(name)
  }

  return (
    <>
    <h1 className='text-center text-2xl mt-4'>Select a Layout </h1>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
     
      
      {layouts.map(l => (
        <div
          key={l.name}
          className="p-0 bg-[#14213d] rounded-lg cursor-pointer transform transition duration-200 text-center hover:scale-105 hover:shadow-2xl"
          onClick={() => handleClick(l.service)}
        >
          {/* <h4 className="text-sm font-semibold mb-4">{l.name}</h4> */}

          <div className={`relative bg-white p-4 rounded-lg w-full h-[2in] max-w-[1.5in] mx-auto shadow-md
            border-4 ${layoutSelected === l.service ? 'border-red-500' : 'border-gray-300'}`}>
            <div className="absolute inset-0 rounded-md">
              <div className="h-full text-sm relative">
                <h5 className="font-semibold text-lg mb-4 absolute top-1/2 left-1/2 transform 
                  -translate-x-1/2 -translate-y-1/2 bg-gray-500 opacity-50 w-[95%] text-center">
                  Preview
                </h5>
                <img src={l.pdf.src} alt="Preview" className="w-full h-full rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
