import React, { useEffect, useState } from "react";
import { AnswerData } from "../types";
import TextInputBox from "./TextInputBox";
import PdfConfig, { PdfSettings } from "./PdfConfig";
import SignatureModal from "./SignaturePad";

interface Props {
  onAnswer: (data: AnswerData) => void;
  layout: string;
  pdfSettings: PdfSettings;
  onPdfSettingsChange: (settings: PdfSettings) => void;
  onSignatureSave?: (dataUrl: string) => void;
}
interface Question {
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
  NDA: [
    {
      text: "Agreement Date",
      type: "date",
      required: true,
    },
    {
      text: "Disclosing Party Name",
      type: "text",
      required: true,
    },
    {
      text: "Disclosing Party Address",
      type: "text",
      required: true,
    },
    {
      text: "Receiving Party Name",
      type: "text",
      required: true,
    },
    {
      text: "Receiving Party Address",
      type: "textarea",
      required: true,
    },
    {
      text: "Agreement Duration",
      type: "select",
      options: ["1 year", "2 years", "3 years", "5 years", "Indefinite"],
      required: true,
    },
    {
      text: "Governing Law State",
      type: "select",
      options: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      required: true,
    },
    {
      text: "Jurisdiction Location",
      type: "text",
      placeholder: "e.g., New York County, NY",
      required: true,
    },
    {
      text: "Disclosing Party Representative Name",
      type: "text",
      required: true,
    },
    {
      text: "Disclosing Party Representative Title",
      type: "text",
      required: true,
    },
    {
      text: "Disclosing Party Signature Date",
      type: "date",
      required: true,
    },
    {
      text: "Receiving Party Representative Name",
      type: "text",
      required: true,
    },
    {
      text: "Receiving Party Representative Title",
      type: "text",
      required: true,
    },
    {
      text: "Receiving Party Signature Date",
      type: "date",
      required: true,
    },
  ],
  IP: [
     
    {
      text: "Agreement Date",
      type: "date",
      required: true,
    },
      {
    text: "IP Signature",
    type: "signature",
    required: true,
    placeholder: "Click to sign your agreement"
  },
    {
      text: "Licensor Name",
      type: "text",
      required: true,
    },
    {
      text: "Licensee Name",
      type: "text",
      required: true,
    },
    {
      text: "Description of Intellectual Property",
      type: "textarea",
      placeholder: "e.g., Software codebase for mobile app, UI design, etc.",
      required: true,
    },
    {
      text: "Type of Intellectual Property",
      type: "select",
      options: ["Software", "Design", "Artwork", "Invention", "Other"],
      required: true,
    },
    {
      text: "Scope of License",
      type: "textarea",
      placeholder: "e.g., Non-exclusive use for commercial purposes",
      required: true,
    },
    {
      text: "Territory",
      type: "text",
      placeholder: "e.g., United States, Worldwide, EU only",
      required: true,
    },
    {
      text: "License Duration",
      type: "text",
      placeholder: "e.g., 2 years, Perpetual, Until revoked",
      required: true,
    },
    {
      text: "Transfer of Ownership",
      type: "select",
      options: ["Yes", "No", "Partial"],
      required: true,
    },
    {
      text: "Usage Restrictions",
      type: "textarea",
      placeholder: "e.g., Cannot sublicense, internal use only",
      required: false,
    },
    {
      text: "Compensation Terms",
      type: "textarea",
      placeholder: "e.g., $1,000 upfront, 5% royalties, or N/A",
      required: false,
    },
    {
      text: "Confidentiality Terms",
      type: "textarea",
      placeholder: "e.g., NDA terms apply, or leave blank if none",
      required: false,
    },
 
    {
      text: "Jurisdiction State",
      type: "select",
      options: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      required: true,
    },
    {
      text: "Jurisdiction Location",
      type: "text",
      placeholder: "e.g., Santa Clara County, CA",
      required: true,
    },
  ],
};

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
  <div className="questionnaire-container relative">
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

        <div className="question-footer relative flex justify-between items-center mt-2">
          <button
            onClick={next}
            disabled={!value && currentQuestion.required && currentQuestion.type !== "signature"}
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
