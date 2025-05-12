import React, { useState } from "react";
import { AnswerData } from "../types";
import TextInputBox from "./TextInputBox";
import PdfConfig, { PdfSettings } from "./PdfConfig";

interface Props {
  onAnswer: (data: AnswerData) => void;
  layout: string;
  pdfSettings: PdfSettings;
  onPdfSettingsChange: (settings: PdfSettings) => void;
}
//   const [pdfSettings, setPdfSettings] = useState<PdfSettings>({
//   h1Size: '22pt',
//   h2Size: '14pt',
//   receiveSize: '12pt',
// });

interface Question {
  text: string;
  type: "text" | "select" | "date" | "checkbox" | "textarea";
  options?: string[];
  required?: boolean;
  placeholder?: string;
}
interface DefaultSelections {
  "Contract duration": string;
  "Include confidentiality?": string;
  "International validity needed?": string;
  [key: string]: string; // Add index signature
}
const questionSets: Record<string, Question[]> = {
  Legal: [
    {
      text: "Full legal name of client",
      type: "text",
      required: false,
    },
    {
      text: "Contract type",
      type: "select",
      options: [
        "Service Agreement",
        "Employment Contract",
        "NDA",
        "Partnership Agreement",
        "Licensing Agreement",
      ],
      required: false,
    },
    {
      text: "Parties involved are",
      type: "select",
      options: [
        "Individuals",
        "Legal Entities",
        "Mixed (Individuals and Entities)",
      ],
      required: false,
    },
    {
      text: "Contract duration",
      type: "select",
      options: [
        "1 month",
        "3 months",
        "6 months",
        "1 year",
        "2 years",
        "Indefinite",
      ],
    },
    {
      text: "Special clauses needed",
      type: "checkbox",
      options: [
        "Non-compete",
        "Penalty clauses",
        "Early termination",
        "Force majeure",
        "Dispute resolution",
      ],
    },
    {
      text: "Include confidentiality?",
      type: "select",
      options: ["Yes", "No"],
      required: false,
    },
    {
      text: "International validity needed?",
      type: "select",
      options: ["Yes", "No"],
      required: false,
    },
    {
      text: "Payment method",
      type: "select",
      options: [
        "Bank transfer",
        "Credit card",
        "PayPal",
        "Cryptocurrency",
        "Other (specify)",
      ],
    },
  ],
  Business: [
    {
      text: "Company legal name",
      type: "text",
      required: false,
    },
    {
      text: "Service objective",
      type: "select",
      options: [
        "Market expansion",
        "Product development",
        "Process optimization",
        "Revenue growth",
        "Customer acquisition",
      ],
      required: false,
    },
    {
      text: "Target audience",
      type: "text",
      placeholder: 'E.g., "Small business owners aged 30-50"',
    },
    {
      text: "Primary offering",
      type: "select",
      options: [
        "Software service",
        "Consulting",
        "Physical product",
        "Digital product",
        "Hybrid solution",
      ],
    },
  ],
  Default: [
     {
      text: "Title",
      type: "text",
      required: true,
    },
     {
      text: "SubTitle",
      type: "text",
      required: false,
    },
    {
      text: "Essay text",
      type: "textarea",
      required: true,
    },
  ],




  Service: [
    {
      text: "Full legal name of client",
      type: "text",
      required: false,
    },
    {
      text: "Full legal name of freelancer",
      type: "text",
      required: false,
    },
    {
      text: "Project type",
      type: "select",
      options: [
        "Web development",
        "Marketing campaign",
        "Research project",
        "Event planning",
        "Content production",
      ],
      required: false,
    },
    {
      text: "Brief project description",
      type: "text",
      required: false,
    },
    {
      text: "Start date",
      type: "date",
      required: false,
    },
    {
      text: "End date",
      type: "date",
      required: false,
    },
    {
      text: "Expected completion date",
      type: "date",
    },
    {
      text: "Communication method",
      type: "select",
      options: ["Email", "Phone", "Messaging App", "Video Calls"],
      required: false,
    },
    {
      text: "Response time (e.g., within 24 hours)",
      type: "text",
      required: false,
    },
    {
      text: "Revision policy (e.g., 2 rounds included)",
      type: "text",
      required: false,
    },
    {
      text: "IP ownership clause (e.g., Rights transferred upon full payment)",
      type: "text",
      required: false,
    },
    {
      text: "Payment method",
      type: "select",
      options: ["Bank Transfer", "PayPal", "Pix", "Stripe", "Other"],
      required: false,
    },
    {
      text: "Payment terms (optional)",
      type: "text",
    },
  ],
};

// Auto-fill values for dates and common selections
export default function Questionnaire({ onAnswer, layout,onPdfSettingsChange }: Props) {
  const autoFillValues = {
    date: new Date().toISOString().split("T")[0],
    defaultSelections: {
      "Contract duration": "1 year",
      "Include confidentiality?": "Yes",
      "International validity needed?": "No",
    } as DefaultSelections,
  };

  const questions = questionSets[layout] || [];
  const [step, setStep] = useState(0);
  const [value, setValue] = useState("");

  const currentQuestion = questions[step];
  const defaultValue =
    currentQuestion?.type === "date"
      ? autoFillValues.date
      : (autoFillValues.defaultSelections as Record<string, string>)[
          currentQuestion?.text
        ] || "";

  function next() {
    const answerValue = value || defaultValue;
    // Now passing just the answer string instead of an object
    onAnswer({
      question: currentQuestion.text,
      answer: answerValue,
    });
    console.log("answer :",answerValue)
    setValue("");
    setStep((prev) => Math.min(prev + 1, questions.length - 1));
  }

  return (
    <div className="questionnaire-container relative ">
      {step < questions.length ? (
        <>
          <div className="flex justify-between">
            <h4 className="question-title">
              {currentQuestion.text}{" "}
              {!currentQuestion.required && <span className="required">(Optional)</span>}
             {currentQuestion.required && <span className="required">*</span>}
            </h4>
            <div className="progress-indicator">
              {step + 1} of {questions.length}
            </div>
          </div>
          {/* Display the current question's input */}
          {currentQuestion.type === "text" && (
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={currentQuestion.placeholder || ""}
              required={currentQuestion.required}
              className="input-text border border-[#415a77] mt-2"
            />
          )}
          {currentQuestion.type === "textarea" && (
            <TextInputBox value={value} onChange={setValue} />
          )}
          {currentQuestion.type === "select" && (
            <select
              value={value || defaultValue}
              onChange={(e) => setValue(e.target.value)}
              required={currentQuestion.required}
              className="input-select"
            >
              <option value="">Select an option</option>
              {currentQuestion.options?.map((opt) => (
                <option className="text-black" key={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          <div className="question-footer relative flex justify-between items-center mt-2">
            <button
              onClick={next}
              disabled={!value && currentQuestion.required}
              className="next-button px-3 py-1 bg-[#415a77]"
            >
              {step < questions.length ? "Next" : "Finish"}
            </button>
             <PdfConfig onConfigChange={onPdfSettingsChange} />

          </div>
        </>
      ) : (
        <div className="completion-message">Questionnaire completed!</div>
      )}
    </div>
  );
}
