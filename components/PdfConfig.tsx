"use client";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useState } from "react";

export type PdfSettings = {
  h1Size: string;
  h2Size: string;
  receiveSize: string;
  underlineH1: boolean;
};

interface Props {
  onConfigChange: (settings: PdfSettings) => void;
}

export default function PdfConfig({ onConfigChange }: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Controle do tamanho da tela
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Controle do popup
  const [underlineH1, setUnderlineH1] = useState<boolean>(false);
  const [h1Size, setH1Size] = useState<number>(22);
  const [h2Size, setH2Size] = useState<number>(14);
  const [receiveSize, setReceiveSize] = useState<number>(12);

  useEffect(() => {
    const settings: PdfSettings = {
      h1Size: `${h1Size}pt`,
      underlineH1,
      h2Size: `${h2Size}pt`,
      receiveSize: `${receiveSize}pt`,
    };

    // localStorage.setItem('pdf-settings', JSON.stringify(settings));
    onConfigChange(settings);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Verifica o tamanho da tela ao carregar
    window.addEventListener("resize", handleResize); // Atualiza ao redimensionar a janela

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o evento de resize
    };
  }, [h1Size, underlineH1, h2Size, receiveSize, onConfigChange]);

  const increment =
    (setValue: React.Dispatch<React.SetStateAction<number>>) => () => {
      setValue((prev) => {
        const updated = prev + 1;
        console.log("Novo valor:", updated);
        return updated;
      });
    };

  const decrement =
    (setValue: React.Dispatch<React.SetStateAction<number>>) => () => {
      setValue((prev) => {
        const updated = Math.max(prev - 1, 1);
        console.log("Novo valor:", updated);
        return updated;
      });
    };

  const renderInput = (
    label: string,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => (
    <label className="block mb-4">
      {label}
      <div className="flex items-center justify-center gap-2 mt-1">
        <button
          onClick={decrement(setValue)}
          className="bg-gray-600 px-2 rounded hover:bg-gray-500"
          type="button"
        >
          ↓
        </button>
        <input
          type="number"
          value={value || ""}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            setValue(isNaN(parsed) ? 0 : parsed);
          }}
          className="w-16 p-1 text-center bg-gray-700 rounded"
        />
        <button
          onClick={increment(setValue)}
          className="bg-gray-600 px-2 rounded hover:bg-gray-500"
          type="button"
        >
          ↑
        </button>
        <span className="text-sm text-gray-300">pt</span>
      </div>
    </label>
  );

  return (
    <div className="">
      {/* Exibe o ícone de configurações se a tela for menor que 600px */}
      {isMobile && (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="p-2 bg-[#415a77] rounded-full"
        >
          <IoIosSettings />
        </button>
      )}

      {/* Exibe o popup de configurações */}
      {isPopupOpen && (
        <div className=" absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center text-center">
          <div className=" bg-[#1e293b] p-6 rounded-lg text-white max-w-sm w-full z-10  ">
            <h3 className="text-lg font-semibold mb-4">Configurações de PDF</h3>

            {renderInput("Tamanho do título (h1):", h1Size, setH1Size)}


            <div className="flex items-center justify-center gap-2 mt-4">
              <input
                type="checkbox"
                id="underlineH1"
                checked={underlineH1}
                onChange={() => setUnderlineH1((prev) => !prev)}
                className="accent-blue-600"
              />
              <label htmlFor="underlineH1" className="text-sm">
                Sublinhar título (h1)
              </label>
            </div>

            {renderInput("Tamanho do subtítulo (h2):", h2Size, setH2Size)}
            {renderInput(
              "Tamanho do texto principal:",
              receiveSize,
              setReceiveSize
            )}
            <div className="flex justify-center items-center gap-5">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-500"
              >
                Apply
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="mt-4 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-500"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
