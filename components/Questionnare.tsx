import React, { useEffect, useState } from "react";
import { AnswerData } from "../types";
import TextInputBox from "./TextInputBox";
import PdfConfig, { PdfSettings } from "./PdfConfig";
import SignatureModal from "./SignaturePad";
import {questionSets} from '../src/data/questionData'

interface Props {
  onAnswer: (data: AnswerData) => void;
  layout: string;
  pdfSettings: PdfSettings;
  onPdfSettingsChange: (settings: PdfSettings) => void;
  onSignatureSave?: (dataUrl: string) => void;
}
export interface Question {
  text: string;
  type: "text" | "select" | "date" | "checkbox" | "textarea" | "signature";
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


// Auto-fill values for dates and common selections
export default function Questionnaire({
  onAnswer,
  layout,
  onPdfSettingsChange,
  onSignatureSave,
}: Props) {
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

  const currentQuestion = questions[step];
  let defaultValue =
    currentQuestion?.type === "date"
      ? autoFillValues.date
      : (autoFillValues.defaultSelections as Record<string, string>)[
          currentQuestion?.text
        ] || "";

  const [value, setValue] = useState(
    currentQuestion?.type === "date" ? autoFillValues.date : ""
  );

  useEffect(() => {
    defaultValue =
      currentQuestion?.type === "date"
        ? autoFillValues.date
        : (autoFillValues.defaultSelections as Record<string, string>)[
            currentQuestion?.text
          ] || "";

    setValue(defaultValue);
  }, [currentQuestion]);

  function next() {
    const answerValue = value || defaultValue;
    // Now passing just the answer string instead of an object
    //  console.log(answerValue)
    onAnswer({
      question: currentQuestion.text,
      answer: answerValue,
    });
    console.log("answer :", answerValue);
    console.log(questions.length);
    console.log(step);
    setValue("");
    setStep((prev) => Math.min(prev + 1, questions.length));
  }

  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  useEffect(() => {
    if (currentQuestion?.type === "signature") {
      setShowSignatureModal(true);
    }
  }, [currentQuestion]);

  const isLastQuestions =
    (layout === "IP" && step >= questions.length - 4) ||
    (layout === "NDA" && step >= questions.length - 6) ||
    step === questions.length - 1;

  const showSignature =
    isLastQuestions && (layout === "IP" || layout === "NDA");

  useEffect(() => {
    console.log(`Step ${step} of ${questions.length} in ${layout}`);

    if (layout === "IP" && step >= questions.length - 2) {
      console.log("Showing signature modal for IP agreement");
      setShowSignatureModal(true);
    }
  }, [step, layout, questions.length]);

  const handleSignatureSave = (dataUrl: string) => {
    console.log("Signature data received:", dataUrl ? "exists" : "empty");
    console.log("Saving signature for layout:", layout);

    setSignatureData(dataUrl);

    if (onSignatureSave) {
      console.log("Passing signature to parent");
      onSignatureSave(dataUrl);
    }

    onAnswer({
      question: `${layout} Signature`,
      answer: dataUrl,
    });
    console.log("Signature saved to answers");

    next();
  };
  return (
    <div className="questionnaire-container">
      {step < questions.length ? (
        <>
          <div className="flex justify-between">
            <h4 className="question-title">
              {currentQuestion.text}{" "}
              {!currentQuestion.required && (
                <span className="required">(Optional)</span>
              )}
              {currentQuestion.required && <span className="required">*</span>}
            </h4>
            <div className="progress-indicator">
              {step + 1} of {questions.length}
            </div>
          </div>

          {/* Special handling for signature type questions */}
          {currentQuestion.type === "signature" ? (
            <div className="signature-question-container">
              <p>Please sign in the box below:</p>

              {signatureData ? (
                <div className="signature-preview">
                  <img
                    src={signatureData}
                    alt="Signature preview"
                    className="signature-image"
                  />
                  <button
                    onClick={() => setShowSignatureModal(true)}
                    className="edit-signature-btn"
                  >
                    Edit Signature
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSignatureModal(true)}
                  className="add-signature-btn"
                >
                  {currentQuestion.placeholder || "Click to sign"}
                </button>
              )}
              <SignatureModal
                open={showSignatureModal}
                onClose={() => setShowSignatureModal(false)}
                onSave={handleSignatureSave}
              />
            </div>
          ) : (
            /* Regular question types */
            <>
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
            </>
          )}

          <div className="question-footer flex justify-between items-center mt-2">
            <button
              onClick={next}
              disabled={
                !value &&
                currentQuestion.required &&
                currentQuestion.type !== "signature"
              }
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
