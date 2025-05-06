"use client";

import { useState } from "react";
import Header from "../../components/Header";
import TextInputBox from "../../components/TextInputBox";
import LayoutSelector from "../../components/LayoutSelector";
import PopupServiceSelector from "../../components/PopupServiceSelector";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, setText] = useState("");
  const [layout, setLayout] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  function handleStart() {
    setShowPopup(true);
  }

  function onSelectService(service: string) {
    const id = Date.now();
    router.push(`/contract/${id}?service=${service}&layout=${layout}`);
  }

  return (
    <div className="p-6 bg-[#14213d] text-white">
      <Header />
      <h1 className="text-2xl mb-4">Gere seu PDF gratuitamente</h1>
      <TextInputBox value={text} onChange={setText} />
      <div className="text-center">
        <button
          disabled={!layout}
          onClick={handleStart}
          className="mt-4 px-4 py-2 bg-accent rounded bg-blue-500 mx-auto"
        >
          Iniciar contrato
        </button>
      </div>

      <LayoutSelector onSelect={setLayout} />

      {showPopup && (
        <PopupServiceSelector
          onSelect={onSelectService}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
