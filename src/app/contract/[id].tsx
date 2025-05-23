import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Questionnaire from "../../../components/Questionnare";
import PdfPreview from "../../../components/PdfPreview";
import { AnswerData } from "../../../types";
import { PdfSettings } from "../../../components/PdfConfig";

//At the top level or in a types file

interface ContractPageQuery {
  id?: string;
  service?: string;
  layout?: string;
}
export default function ContractPage() {
  const router = useRouter();
  const { id, service, layout } = router.query as ContractPageQuery;
  const [answers, setAnswers] = useState<AnswerData[]>([]);

  const handleAnswer = (answerData: AnswerData) => {
    setAnswers((prev) => [...prev, answerData]);
  };
  const [pdfSettings, setPdfSettings] = useState<PdfSettings>({
  h1Size: "22pt",
  h2Size: "14pt",
  receiveSize: "12pt",
  underlineH1:false
});

  const handlePdfSettingsChange = (settings: PdfSettings) => {
    setPdfSettings(settings);
  };
  useEffect(() => {
    // Manage progress or API calls here
    console.log("Answers updated:", answers);
  }, [answers]);
  const stringAnswers = answers.map((item) => item.answer);
  return (
    <div className="p-6 flex">
      <div className="w-1/2">
        <Questionnaire
          pdfSettings={pdfSettings}
          onPdfSettingsChange={handlePdfSettingsChange}
          onAnswer={handleAnswer}
          layout={typeof layout === "string" ? layout : "Default"}
        />
      </div>
      <div className="w-1/2">
        <PdfPreview
          id={id as string}
          service={service as string}
          layout={layout as string}
          answers={stringAnswers}
          config={{
            h1Size: "22pt",
            h2Size: "14pt",
            receiveSize: "12pt",
            underlineH1:false
          }}
        />
      </div>
    </div>
  );
}
