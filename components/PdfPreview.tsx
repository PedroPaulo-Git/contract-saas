import React, { useEffect, useRef, useState } from "react";
// import { generatePdf } from "../lib/pdf";
// import html2pdf from "html2pdf.js";
import { PdfSettings } from "./PdfConfig";
import { AnswerData } from "../types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  generateNDAContent,
  generateIPContent,
  generateBusinessContent,
  generateServiceContent,
  generateLegalContent,
  generateEssayContent,
} from "./Layouts/generateLayoutContent";

interface Props {
  id: string;
  service: string;
  layout: string;
  answers: AnswerData[] | string[];
  config: PdfSettings;
}
export interface ContractData {
  today: string;
  clientName: string;
  freelancerName: string;
  companyName: string;
  projectType: string;
  projectDescription: string;
}
export type FindAnswerFn = (question: string) => string;

export default function PdfPreview({
  id,
  service,
  layout,
  answers,
  config,
}: Props) {
  // const [url, setUrl] = useState("");
  // const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const normalizedAnswers = answers.map((answer) =>
    typeof answer === "string" ? { question: "", answer } : answer
  );

  const findAnswer = (questionText: string, showIfEmpty = true): string => {
    const answer = normalizedAnswers.find(
      (a) => typeof a !== "string" && a.question.includes(questionText)
    )?.answer;

    if (!answer || answer.trim() === "") {
      return showIfEmpty ? "[Not specified]" : "";
    }

    return answer;
  };

  function getLayoutContent(
    layout: string,
    findAnswer: (question: string) => string,
    service: string
  ): string {
    const baseData: ContractData = {
      today: new Date().toLocaleDateString(),
      clientName: findAnswer("Full legal name of client") || "__________",
      freelancerName:
        findAnswer("Full legal name of freelancer") || "__________",
      companyName: findAnswer("company legal name") || "__________",
      projectType: findAnswer("Project type") || "__________",
      projectDescription:
        findAnswer("Brief project description") || "__________",
    };

    switch (layout) {
      case "NDA":
        return generateNDAContent(baseData, findAnswer);
      case "IP":
        return generateIPContent(baseData, findAnswer);
      case "Business":
        return generateBusinessContent(baseData, findAnswer);
      case "Service":
        return generateServiceContent(baseData, findAnswer, service);
      case "Legal":
        return generateLegalContent(baseData, findAnswer);
      default:
        return generateEssayContent(baseData, findAnswer);
    }
  }
  useEffect(() => {
    console.log("Atualizando preview com configurações:", config);
  }, [config]);

  const getContractContent = (isPDF = false) => {
    const title =
      layout === "Default"
        ? findAnswer("Title") || `${service} Contract`
        : `${service} Contract`;
    const subTitle = findAnswer("SubTitle", false);
    // console.log('h1Size:', config.h1Size);
    // console.log('receiveSize:', config.receiveSize);

    return `
    <html>
      <head>
        <style>
        
          body {
            line-height: 1.6;
            color: black;
            margin: 0;
         
            font-family: ${isPDF ? "'Times New Roman', serif" : "sans-serif"};
          }
               .pdf {color:black; padding:  ${isPDF ? "0.5cm" : "1.5cm"} }
          
       
          h1 {
            text-align: center;
            font-size: ${isPDF ? config.h1Size : "1.5rem"};
            margin-bottom: 10px;
          }
          h2 {
            text-align: center;
            font-size: ${isPDF ? config.h2Size : "1rem"};
            margin-bottom: 30px;
            color: black;
          }
          .section-title {
            
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 3px;
          }
          p, li {
            font-size: ${isPDF ? config.receiveSize : "0.9rem"};
            text-align: justify;
            margin-bottom: 8px;
          }
          .footer {
            margin-top: 50px;
            font-size: ${isPDF ? "10pt" : "0.8rem"};
            text-align: center;
          }




            @media (max-width: 640px) {
                 body { padding: 0cm; }
                .pdf { padding:  ${isPDF ? "0.5cm" : "1cm"} }
                 .pdf {  overflow-y: auto; }
                
                h1 { font-size: ${isPDF ? config.h1Size : "1rem"} }
                h2 { font-size: ${isPDF ? config.h2Size : "0.6rem"} }
                .receive{
                font-size: ${isPDF ? config.receiveSize : "0.6rem"}
                }
               
                .section-title {  font-size: ${isPDF ? "14pt" : "0.8rem"}}
              }
        </style>
      </head>
      <body>
        <div class="pdf">
          <div class="header">
            <h1>${title}</h1>
            <h2>${subTitle}</h2>
          </div>
          <div class="receive">
            ${getLayoutContent(layout, findAnswer, service)}
          </div>
          <div class="footer">
            <p class="paragrafy">Document ID: ${id} | Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    console.log(config);
    setIsGenerating(true);
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "210mm";
      tempDiv.style.padding = "20mm";
      tempDiv.style.fontFamily = "'Times New Roman', serif";
      tempDiv.innerHTML = getContractContent(true);
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, {
        // scale: 2,
        logging: false,
        useCORS: true,
      });

      document.body.removeChild(tempDiv);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Contract_${service}_${id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Preview container */}
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: "420px",
          aspectRatio: "210 / 297",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        <div
          ref={pdfRef}
          dangerouslySetInnerHTML={{ __html: getContractContent() }}
          style={{
            transform: "scale(1)",
            // // transformOrigin: "top left",
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`bg-blue-600 text-white font-bold py-2 px-4 rounded ${
          isGenerating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </button>
    </div>
  );
}
