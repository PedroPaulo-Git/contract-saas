import React, { useState } from 'react';

interface Props { onAnswer: (a: string) => void; }
const questions = Array.from({ length: 10 }, (_, i) => `Pergunta ${i + 1}`);

export default function Questionnaire({ onAnswer }: Props) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');

  function next() {
    onAnswer(value);
    setValue('');
    setStep(prev => Math.min(prev + 1, questions.length - 1));
  }

  return (
    <div>
      <h4 className="mb-2">{questions[step]}</h4>
      <input
        className="w-full p-1 bg-primary border border-accent rounded"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={next} className="mt-2 px-3 py-1 bg-accent rounded">
        {step < questions.length - 1 ? 'Próximo' : 'Concluir'}
      </button>
    </div>
  );
}