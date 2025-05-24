import React, { useState } from "react";
import { layouts } from "../src/data/layoutsData";

interface Props {
  onSelectService: (data: { service: string; layout: string }) => void;
}

export default function LayoutSelector({ onSelectService }: Props) {
  const [layoutSelected, setLayoutSelected] = useState<string>("Default");
  // useEffect(() => {
  //   //console.log(layoutSelected)
  //   onSelectService(layoutSelected);
  // }, []); // Esse effect só roda uma vez, após a primeira renderização

  function handleClick(layout: string, service: string) {
    setLayoutSelected(layout);
    onSelectService({ layout, service });
  }

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold  mb-4">Select a Layout </h1>
      <h2 className="text-lg md:text-xl text-gray-300 mb-6">
        Choose from ready-made templates like NDA, IP Agreement, or Service
        Contract.
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {layouts.map((l) => (
          <div
            key={l.name}
            className="p-0 bg-[#14213d] rounded-lg cursor-pointer transform transition duration-200 text-center hover:scale-105 hover:shadow-2xl"
            onClick={() => handleClick(l.service, l.name)}
          >
            <h4 className="text-sm font-semibold mb-4">{l.name}</h4>

            <div
              className={`relative bg-white p-4 rounded-lg w-full h-[2in] max-w-[1.5in] mx-auto shadow-md
            border-4 
            ${
              layoutSelected === l.service
                ? "border-gray-300"
                : "border-gray-300"
            }
            `}
            >
              <div className="absolute inset-0 rounded-md">
                <div className="h-full text-sm relative">
                  <h5
                    className="font-semibold text-lg mb-4 absolute top-1/2 left-1/2 transform 
                  -translate-x-1/2 -translate-y-1/2 bg-gray-500 opacity-50 w-[95%] text-center"
                  >
                    Preview
                  </h5>
                  <img
                    src={l.pdf.src}
                    alt="Preview"
                    className="w-full h-full rounded"
                  />
                </div>
              </div>
            </div>
            <h4 className="text-xs text-gray-200 mt-2">{l.preview}</h4>
          </div>
        ))}
      </div>
    </>
  );
}
