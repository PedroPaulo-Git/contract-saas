import React, { useState } from 'react';

interface Props {
  onAnswer: (a: string) => void;
  layout: string; // Pode ser 'Legal', 'Business', 'Custom'
}

const questionSets: Record<string, string[]> = {
  Legal: [
    'Qual é o seu nome completo?',
    'Qual é o tipo de contrato necessário?',
    'As partes envolvidas são físicas ou jurídicas?',
    'Existe algum prazo definido?',
    'Há cláusulas específicas que deseja incluir?',
    'Deseja que inclua cláusulas de confidencialidade?',
    'O contrato precisa ter validade internacional?',
    'Como será a forma de pagamento?',
    'Existe algum histórico de disputas?',
    'Deseja revisar algum modelo anterior?',
  ],
  Business: [
    'Qual é o nome da sua empresa?',
    'Qual o objetivo principal do serviço?',
    'Quem é o público-alvo?',
    'Qual é o produto ou serviço vendido?',
    'Quais canais de venda você utiliza?',
    'Você já usa alguma estratégia comercial?',
    'Tem alguma métrica de sucesso?',
    'Qual é a maior dor do seu cliente?',
    'Quais ferramentas você já usa?',
    'Tem alguma meta de curto prazo?',
  ],
  Custom: [
    'Descreva seu projeto ou necessidade',
    'Qual é o prazo estimado?',
    'Tem referências ou exemplos?',
    'Quem são os envolvidos?',
    'Qual orçamento disponível?',
    'Há limitações técnicas?',
    'Qual a finalidade do documento?',
    'Onde será utilizado?',
    'Deseja incluir anexos?',
    'Algum detalhe extra importante?',
  ],
};

export default function Questionnaire({ onAnswer, layout }: Props) {
  const questions = questionSets[layout] || [];
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');

  function next() {
    onAnswer(value);
    setValue('');
    setStep((prev) => Math.min(prev + 1, questions.length - 1));
  }
  console.log('Layout:', layout);
console.log('Questions for this layout:', questionSets[layout]);

  return (
    <div className=''>
      {step < questions.length ? (
        <>
          <h4 className="mb-2 p-5">{questions[step]}</h4>
          <input
            className="w-full p-1 bg-primary border border-accent rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={next} className="mt-2 px-3 py-1 bg-accent rounded">
            {step < questions.length - 1 ? 'Próximo' : 'Concluir'}
          </button>
        </>
      ) : (
        <h4 className="text-center p-5">Obrigado! Questionário concluído.</h4>
      )}
    </div>
  );
  
}
