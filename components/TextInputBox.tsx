import React from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TextInputBox({ value, onChange }: Props) {
  return (
    <textarea
      className="w-full h-32 p-2 bg-primary border border-accent rounded"
      placeholder="Digite seu texto aqui..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}