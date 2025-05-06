import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Questionnaire from "../../../components/Questionnare";
import PdfPreview from "../../../components/PdfPreview";

export default function ContractPage() {
  const router = useRouter();
  const { id, service, layout } = router.query;
  const [answers, setAnswers] = useState<string[]>([]);

  function handleAnswer(answer: string) {
    setAnswers((prev) => [...prev, answer]);
  }

  useEffect(() => {
    // gerenciar progresso ou chamadas
  }, [answers]);

  return (
    <div className="p-6 flex">
      <div className="w-1/2">
        <Questionnaire onAnswer={handleAnswer} layout={""} />
      </div>
      <div className="w-1/2">
        <PdfPreview
          id={id as string}
          service={service as string}
          layout={layout as string}
          answers={answers}
        />
      </div>
    </div>
  );
}
