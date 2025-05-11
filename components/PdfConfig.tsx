"use client";
import { IoIosSettings } from "react-icons/io";
import { useEffect, useState } from "react";

export type PdfSettings = {
  h1Size: string;
  h2Size: string;
  receiveSize: string;
};

interface Props {
  onConfigChange: (settings: PdfSettings) => void;
}

export default function PdfConfig({ onConfigChange }: Props) {
  const [isMobile, setIsMobile] = useState<boolean>(false); // Controle do tamanho da tela
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false); // Controle do popup
  const [h1Size, setH1Size] = useState<number>(22);
  const [h2Size, setH2Size] = useState<number>(14);
  const [receiveSize, setReceiveSize] = useState<number>(12);

  // Carregar valores do localStorage ao iniciar
  // useEffect(() => {
  //   const saved = localStorage.getItem('pdf-settings');
  //   if (saved) {
  //     try {
  //       const parsed: PdfSettings = JSON.parse(saved);
  //       setH1Size(parseInt(parsed.h1Size));
  //       setH2Size(parseInt(parsed.h2Size));
  //       setReceiveSize(parseInt(parsed.receiveSize));
  //     } catch (error) {
  //       console.error('Erro ao carregar configurações do PDF:', error);
  //     }
  //   }
  // }, []);

  // Atualizar localStorage e parent sempre que os valores mudarem
  useEffect(() => {
    const settings: PdfSettings = {
      h1Size: `${h1Size}pt`,
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
  }, [h1Size, h2Size, receiveSize, onConfigChange]);

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
      <div className="flex items-center gap-2 mt-1">
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
    <div className="relative">
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
        <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-[#1e293b] p-6 rounded-lg text-white max-w-sm w-full z-10">
            <h3 className="text-lg font-semibold mb-4">Configurações de PDF</h3>

            {renderInput('Tamanho do título (h1):', h1Size, setH1Size)}
            {renderInput('Tamanho do subtítulo (h2):', h2Size, setH2Size)}
            {renderInput('Tamanho do texto principal:', receiveSize, setReceiveSize)}

            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-500"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
