'use client'

import { useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';
import Questionnaire from '../../../../components/Questionnare';
import PdfPreview from '../../../../components/PdfPreview';

export default function ContractPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  
  const service = searchParams.get('service') || 'Freelance Agreement';
  const layoutParam = searchParams.get('layout');
  const id = params?.id as string;
  
  // Default to 'Legal' if no layout is provided or if it's invalid
  const validLayouts = ['Legal', 'Business', 'Custom'];
  const layout = layoutParam && validLayouts.includes(layoutParam) 
    ? layoutParam 
    : 'Legal';
  
  const [answers, setAnswers] = useState<string[]>([]);

  function handleAnswer(newAnswer: string) {
    setAnswers((prev) => [...prev, newAnswer]);
  }

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-slate-200 p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#1b263b] p-4 rounded shadow-md border border-[#415a77]">
        <h1 className="text-2xl font-bold text-white">Contract ID: {id}</h1>
        <p className="text-sm text-slate-300">Service: {service}</p>
        <p className="text-sm text-slate-300">Layout: {layout}</p>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Perguntas */}
        <div className="bg-[#1b263b] p-4 rounded shadow-md border border-[#415a77]">
          <Questionnaire onAnswer={handleAnswer} layout={layout} />
        </div>

        {/* Preview */}
        <div className="bg-[#1b263b] p-4 rounded shadow-md border border-[#415a77]">
          <PdfPreview id={id} service={service} layout={layout} answers={answers} />
        </div>
      </div>
    </div>
  );
}