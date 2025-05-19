"use client";

// import { useState } from "react";
import Header from "../../components/Header";
// import TextInputBox from "../../components/TextInputBox";
import LayoutSelector from "../../components/LayoutSelector";
// import PopupServiceSelector from "../../components/PopupServiceSelector";
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";

export default function Home() {
  const router = useRouter();
  // const [text, setText] = useState("");
  // const [layout, setLayout] = useState<string | null>(null);
  // const [showPopup, setShowPopup] = useState(false);
  // c

  // function handleStart() {
  //   setShowPopup(true);
  // }

 function onSelectService({ service, layout }: { service: string; layout: string }) {
  const id = Date.now();
  router.push(`/contract/${id}?service=${encodeURIComponent(service)}&layout=${encodeURIComponent(layout)}`);
}


  return (
    <>
    <Header />
    <div className="p-6 bg-[#14213d] text-white">
    
      {/* <h1 className="text-2xl mb-4">Gere seu PDF gratuitamente</h1>
      <TextInputBox value={text} onChange={setText} />
      <div className="text-center">
        <button
          disabled={!layout}
          onClick={handleStart}
          className="mt-4 px-4 py-2 bg-accent rounded bg-blue-500 mx-auto"
        >
          Iniciar contrato
        </button>
      </div> */}

      <LayoutSelector onSelectService={onSelectService} />

      {/* {showPopup && (
        <PopupServiceSelector
          onSelect={onSelectService}
          onClose={() => setShowPopup(false)}
        />
      )} */}
    </div>
    <Footer/>
    </>
  );
}
