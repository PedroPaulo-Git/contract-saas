import React, { useEffect, useRef, useState } from "react";
// import { generatePdf } from "../lib/pdf";
// import html2pdf from "html2pdf.js";
import { PdfSettings } from "./PdfConfig";
import { AnswerData } from "../types";
// import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
// import { jsPDF } from "jspdf";
import { EssayLayout } from "./Contract/Layouts/Essay";
import { IPLayout } from "./Contract/Layouts/IP";
import { ServiceLayout } from "./Contract/Layouts/Service";
import { NDALayout } from "./Contract/Layouts/NDA";
import layoutStyles from "@/app/styles/layoutStyles";
import { ContractData } from "../types";
interface Props {
  id: string;
  service: string;
  layout: string;
  answers: AnswerData[] | string[];
  config: PdfSettings;
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
      freelancerName: findAnswer("Full legal name of freelancer") || "__________",
      companyName: findAnswer("company legal name") || "__________",
      projectType: findAnswer("Project type") || "__________",
      projectDescription: findAnswer("Brief project description") || "__________",
      clientAddress: findAnswer("Brief project description") || "__________",
      freelancerAddress: findAnswer("Brief project description") || "__________",
    };

    switch (layout) {
      case "NDA":
        return NDALayout(baseData, findAnswer);
      case "IP":
        return IPLayout(baseData, findAnswer);
      // case "Business":
      //   return generateBusinessContent(baseData, findAnswer);
      case "Service":
        return ServiceLayout(baseData, findAnswer, service);
      // case "Legal":
      //   return generateLegalContent(baseData, findAnswer);
      default:
        return EssayLayout(baseData, findAnswer);
    }
  }
  useEffect(() => {
    console.log("Atualizando preview com configurações:", config);
  }, [config]);

  const getContractContent = (isPDF = false) => {
    const title =
      layout === "Default"
        ? findAnswer("Title") || `${service}`
        : `${service} Contract`;
    const subTitle = findAnswer("SubTitle", false);
    // console.log('h1Size:', config.h1Size);
    // console.log('receiveSize:', config.receiveSize);
    const layoutStyle = layoutStyles(layout, isPDF, config);

    console.log("layout atual:", layout);
    console.log("layoutStyles disponíveis:", Object.keys(layoutStyles));
    // console.log("layoutStyle resultante:", layoutStyles(layout, isPDF, config));

    return `
    <html>
      <head>
        <style>
        ${layoutStyle}
        
        </style>
      </head>
      <body>
        <div class="pdf layout-style">
          <div class="header">
            <h1 class="layout-style">${title}</h1>
            <h2 class="layout-style">${subTitle}</h2>
          </div>
          <div class="receive layout-style">
            ${getLayoutContent(layout, findAnswer, service)}
          </div>
          <div class="footer layout-style">
            <p class="paragraph layout-style">Document ID: ${id} | Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  };
  // import html2pdf from "html2pdf.js";

  const handleDownload = () => {
    if (!pdfRef.current) return;
    setIsGenerating(true);
    const opt = {
      margin: [10, 10, 10, 10], // top, left, bottom, right
      filename: `Contract_${service}_${id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: [ "css", "legacy"]},
    };

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = getContractContent(true);

    // tempDiv.style.width = "210mm";
    // tempDiv.style.padding = "20mm";
    tempDiv.style.margin = "0 auto";
    // tempDiv.style.maxWidth = "210mm";

    tempDiv.style.fontFamily = "'Times New Roman', serif";
    document.body.appendChild(tempDiv);

    html2pdf()
      .from(tempDiv)
      .set(opt)
      .save()
      .finally(() => {
        document.body.removeChild(tempDiv);
        setIsGenerating(false)
      });
  };

// const handleDownload = async () => {
//   if (!pdfRef.current) return;
//   setIsGenerating(true);
  
//   // Create a temporary div with the content
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = getContractContent(true);
//   tempDiv.style.visibility = 'hidden';
//   document.body.appendChild(tempDiv);

//   // Wait for images to load
//   await new Promise(resolve => {
//     const images = tempDiv.querySelectorAll('img');
//     let loaded = 0;
    
//     if (images.length === 0) {
//       resolve(true);
//       return;
//     }

//     images.forEach(img => {
//       if (img.complete) {
//         loaded++;
//       } else {
//         img.onload = () => {
//           loaded++;
//           if (loaded === images.length) resolve(true);
//         };
//         img.onerror = () => {
//           loaded++;
//           if (loaded === images.length) resolve(true);
//         };
//       }
//     });
//   });

//   const opt = {
//     margin: [10, 10, 10, 10],
//     filename: `Contract_${service}_${id}.pdf`,
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { 
//       scale: 2,
//       logging: true,
//       useCORS: true,
//       allowTaint: true
//     },
//     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
//     pagebreak: { mode: ['css', 'legacy'] }
//   };

//   try {
//     await html2pdf()
//       .set(opt)
//       .from(tempDiv)
//       .save();
//   } catch (error) {
//     console.error('PDF generation error:', error);
//   } finally {
//     document.body.removeChild(tempDiv);
//     setIsGenerating(false);
//   }
// };

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
