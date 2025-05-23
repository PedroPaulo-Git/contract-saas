"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutSelector from "../LayoutSelector";
type HomeComponentProps = {
  handleSelect: () => void;
};

const HomeComponent = () => {
  const [showSelectLayouts, setShowSelectLayouts] = useState(false);
  const handleSelect = () => {
    setShowSelectLayouts(!showSelectLayouts);
  };

  const router = useRouter();
  function onSelectService({
    service,
    layout,
  }: {
    service: string;
    layout: string;
  }) {
    const id = Date.now();
    router.push(
      `/contract/${id}?service=${encodeURIComponent(
        service
      )}&layout=${encodeURIComponent(layout)}`
    );
  }
  return (
    <>
      {showSelectLayouts ? (
         <main className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-white">
          <LayoutSelector onSelectService={onSelectService} />
        </main>
      ) : (
        <main className="min-h-screen lg:max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 text-white">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4">
            ReadyType: Essays and Contracts Generated in Minutes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
            Your smart document generator. Create contracts like NDA, IP, and
            Service Agreement or structured essays effortlessly.
          </p>

          <section className="bg-[#1b263b] rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl w-full">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Generate documents in simple steps:
            </h2>
            <ol className="text-left text-gray-200 list-decimal list-inside space-y-2">
              <li>
                Select the document type:{" "}
                <strong>NDA, IP, Service Agreement</strong> or{" "}
                <strong>Essay</strong>.
              </li>
              <li>
                Fill in the fields: Title, Subtitle, or paste your full content.
              </li>
              <li>
                Review and download your ready-to-use, professionally formatted
                PDF.
              </li>
            </ol>
          </section>

          <button
            onClick={handleSelect}
            className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </main>
      )}
    </>
  );
};

export default HomeComponent;
