import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TextInputBox({ value, onChange }: Props) {
  return (
    <textarea
      className="w-full h-32 bg-[#1b263b] p-2 rounded shadow-md border border-[#415a77] focus:ring-0  focus:outline-none" 
      placeholder="Digite seu texto aqui..."
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
    />
  );
}