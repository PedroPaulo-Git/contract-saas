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
        ? findAnswer("Title") || `${service} Contract`
        : `${service} Contract`;
    const subTitle = findAnswer("SubTitle", false);
    // console.log('h1Size:', config.h1Size);
    // console.log('receiveSize:', config.receiveSize);
    const layoutStyle = layoutStyles(layout, isPDF, config);

    console.log("layout atual:", layout);
    console.log("layoutStyles disponíveis:", Object.keys(layoutStyles));
    console.log("layoutStyle resultante:", layoutStyles(layout, isPDF, config));

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
            <p class="paragrafy layout-style">Document ID: ${id} | Generated on ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  };
  // import html2pdf from "html2pdf.js";

  const handleDownload = () => {
    if (!pdfRef.current) return;

    const opt = {
      margin: [15, 15, 15, 15], // top, left, bottom, right
      filename: `Contract_${service}_${id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
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
      });
  };

  // const handleDownload = async () => {
  //   if (!pdfRef.current) return;
  //   console.log(config);
  //   setIsGenerating(true);
  //   try {
  //     // Create a temporary div for PDF generation
  //     const tempDiv = document.createElement("div");
  //     tempDiv.style.position = "absolute";
  //     tempDiv.style.left = "-9999px";
  //     tempDiv.style.width = "210mm";
  //     tempDiv.style.padding = "20mm";
  //     tempDiv.style.fontFamily = "'Times New Roman', serif";
  //     tempDiv.innerHTML = getContractContent(true);
  //     document.body.appendChild(tempDiv);

  //     const canvas = await (html2canvas as any)(tempDiv, {
  //       scale: 2,
  //       logging: false,
  //       useCORS: true,
  //     });

  //     document.body.removeChild(tempDiv);

  //     const pdf = new jsPDF({
  //       orientation: "portrait",
  //       unit: "mm",
  //       format: "a4",
  //     });

  //     const imgData = canvas.toDataURL("image/png");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     const imgProps = {
  //       width: pdfWidth,
  //       height: pdfHeight,
  //     };
  //     let position = 0;
  //     if (imgProps.height <= pdfHeight) {
  //       pdf.addImage(
  //         imgData,
  //         "PNG",
  //         0,
  //         position,
  //         imgProps.width,
  //         imgProps.height
  //       );
  //     } else {
  //       let heightLeft = imgProps.height;
  //       while (heightLeft > 0) {
  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           0,
  //           position,
  //           imgProps.width,
  //           imgProps.height
  //         );
  //         heightLeft -= pdfHeight;
  //         if (heightLeft > 0) {
  //           pdf.addPage();
  //           position = -heightLeft;
  //         }
  //       }
  //     }
  //     pdf.save(`Contract_${service}_${id}.pdf`);
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   } finally {
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
