import React, { useEffect, useRef, useState } from "react";
// import { generatePdf } from "../lib/pdf";
import html2pdf from "html2pdf.js";
import { AnswerData } from "../types";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  generateNDAContent,
  generateIPContent,
  generateBusinessContent,
  generateServiceContent,
  generateLegalContent,
  generateDefaultContent,
} from "./Layouts/generateLayoutContent";

interface Props {
  id: string;
  service: string;
  layout: string;
  answers: AnswerData[] | string[];
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


export default function PdfPreview({ id, service, layout, answers }: Props) {
  const [url, setUrl] = useState("");
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const normalizedAnswers = answers.map((answer) =>
    typeof answer === "string" ? { question: "", answer } : answer
  );

  const findAnswer = (questionText: string): string => {
    return (
      normalizedAnswers.find(
        (a) => typeof a !== "string" && a.question.includes(questionText)
      )?.answer || "[Not specified]"
    );
  };


  function getLayoutContent(layout: string, findAnswer: (question: string) => string, service: string): string {
    const baseData: ContractData = {
      today: new Date().toLocaleDateString(),
      clientName: findAnswer("Full legal name of client") || "__________",
      freelancerName: findAnswer("Full legal name of freelancer") || "__________",
      companyName: findAnswer("company legal name") || "__________",
      projectType: findAnswer("Project type") || "__________",
      projectDescription: findAnswer("Brief project description") || "__________",
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
        return generateDefaultContent(baseData, findAnswer);
    }
  }
  
  const getContractContent = () => {
    
  // const clientName = findAnswer("Full legal name of client") || "__________";
  // const freelancerName = findAnswer("Full legal name of freelancer") || "__________";
  // const companyName = findAnswer("company legal name") || "__________";
  // const projectType = findAnswer("Project type") || "__________";
  // const projectDescription = findAnswer("Brief project description") || "__________";

  // let commonSections = "";

  //   const today = new Date().toLocaleDateString();

  //   if (["Default", "Service"].includes(layout)) {
  //     commonSections = `
  //       <div class="section-title">1. PARTIES</div>
  //       <p class="paragrafy">
  //         This Freelance Agreement ("Agreement") is entered into as of ${today} by and between:
  //       </p>
  //       <p class="paragrafy"><strong>Client Name:</strong> ${clientName}</p>
  //       ${
  //         layout === "Business"
  //           ? `<p class="paragrafy"><strong>Company Name:</strong> ${companyName}</p>`
  //           : ""
  //       }
  //       <p class="paragrafy"><strong>Freelancer Name:</strong> ${freelancerName}</p>
  
  //       <div class="section-title">2. SCOPE OF WORK</div>
  //       <p class="paragrafy">
  //         The Freelancer agrees to perform the following services as outlined below:
  //       </p>
  //       <p class="paragrafy"><strong>Project Type:</strong> ${projectType}</p>
  //       <p class="paragrafy"><strong>Project Description:</strong> ${projectDescription}</p>
  //       <ul></ul>
  //     `;
  //   }
  
  //   // NDA específico
  //   if (layout === "NDA") {
  //     commonSections = `
  //       <div class="section-title">1. PARTIES</div>
  //       <p class="paragrafy">
  //         This Non-Disclosure Agreement ("Agreement") is entered into as of ${today} between:
  //       </p>
  //       <p class="paragrafy"><strong>Disclosing Party:</strong> ${clientName}</p>
  //       <p class="paragrafy"><strong>Receiving Party:</strong> ${freelancerName}</p>
  
  //       <div class="section-title">2. CONFIDENTIAL INFORMATION</div>
  //       <p class="paragrafy">
  //         The parties agree to protect confidential information, including but not limited to trade secrets,
  //         business strategies, and proprietary data.
  //       </p>
  //     `;
  //   }
  
  //   // IP específico
  //   if (layout === "IP") {
  //     commonSections = `
  //       <div class="section-title">1. PARTIES</div>
  //       <p class="paragrafy">
  //         This Intellectual Property License Agreement ("Agreement") is made as of ${today} by and between:
  //       </p>
  //       <p class="paragrafy"><strong>Licensor:</strong> ${freelancerName}</p>
  //       <p class="paragrafy"><strong>Licensee:</strong> ${clientName}</p>
  
  //       <div class="section-title">2. LICENSE GRANT</div>
  //       <p class="paragrafy">
  //         The Licensor hereby grants the Licensee a non-exclusive, non-transferable license to use the following intellectual property:
  //       </p>
  //       <p class="paragrafy">${findAnswer("IP description") || "__________"}</p>
  //     `;
  //   }
  //   let specificSections = "";

  //   switch (layout) {
  //     case "Legal":
  //       specificSections = `
  //         <div class="section-title">3. TERM AND TERMINATION</div>
  //         <p class="paragrafy"><strong>Contract Duration:</strong> ${findAnswer(
  //           "Contract duration"
  //         )}</p>
  //         <p class="paragrafy">This agreement shall commence on [Start Date] and continue until [End Date].</p>

  //         <div class="section-title">4. CONFIDENTIALITY</div>
  //         <p class="paragrafy">${
  //           findAnswer("include confidentiality") === "Yes"
  //             ? "Both parties agree to maintain strict confidentiality."
  //             : "No specific confidentiality clauses apply."
  //         }</p>

  //         <div class="section-title">5. GOVERNING LAW</div>
  //         <p class="paragrafy">${
  //           findAnswer("international validity") === "Yes"
  //             ? "This agreement shall be governed by international law."
  //             : "This agreement shall be governed by the laws of [Jurisdiction]."
  //         }</p>
  //       `;
  //       break;
  //     case "Business":
  //       specificSections = `
  //         <div class="section-title">3. BUSINESS DETAILS</div>
  //         <p class="paragrafy"><strong>Business Objective:</strong> ${findAnswer(
  //           "business objective"
  //         )}</p>
  //         <p class="paragrafy"><strong>Target Audience:</strong> ${findAnswer(
  //           "target audience"
  //         )}</p>
  //         <p class="paragrafy"><strong>Products/Services:</strong> ${findAnswer(
  //           "products/services"
  //         )}</p>

  //         <div class="section-title">4. COMMERCIAL TERMS</div>
  //         <p class="paragrafy"><strong>Sales Channels:</strong> ${findAnswer(
  //           "sales channels"
  //         )}</p>
  //         <p class="paragrafy"><strong>Success Metrics:</strong> ${findAnswer(
  //           "success metrics"
  //         )}</p>
  //         <p class="paragrafy"><strong>Short-term Goals:</strong> ${findAnswer(
  //           "short-term goals"
  //         )}</p>
  //       `;
  //       break;
  //       case "Service":
  //         if (service === "Freelance Agreement") {
  //           specificSections = `
  //             <div class="section-title">3. TIMELINE & DEADLINES</div>
  //             <p class="paragrafy"><strong>Start Date:</strong> ${findAnswer("start date")}</p>
  //             <p class="paragrafy"><strong>End Date:</strong> ${findAnswer("end date")}</p>
  //             <p class="paragrafy">The Freelancer agrees to deliver the services described in this Agreement according to the milestones and deadlines mutually agreed upon. Delays caused by unforeseen circumstances will be communicated promptly.</p>
          
  //             <div class="section-title">4. COMMUNICATION</div>
  //             <p class="paragrafy"><strong>Preferred Channel:</strong> ${findAnswer("communication method")}</p>
  //             <p class="paragrafy"><strong>Response Time:</strong> ${findAnswer("response time")}</p>
  //             <p class="paragrafy">Both parties agree to maintain clear, respectful, and timely communication. Regular updates should be provided, especially during critical phases of the project. Any change in availability must be communicated in advance.</p>
          
  //             <div class="section-title">5. REVISIONS & FEEDBACK</div>
  //             <p class="paragrafy"><strong>Revision Policy:</strong> ${findAnswer("revision policy")}</p>
  //             <p class="paragrafy">All feedback should be constructive and provided within 3 business days of each delivery. The number of revisions included is as specified above, and additional revisions may incur extra fees. Major changes not included in the original scope may require a new agreement.</p>
          
  //             <div class="section-title">6. INTELLECTUAL PROPERTY</div>
  //             <p class="paragrafy">${findAnswer("IP ownership clause")}</p>
  //             <p class="paragrafy">Upon full payment, all intellectual property rights related to the final deliverables will be transferred to the Client, unless otherwise agreed. The Freelancer retains the right to showcase the project in portfolios and promotional materials, unless the Client requests confidentiality in writing.</p>
  //           `;
  //         }
          
  //         break;
  //     default:
  //       specificSections = `
  //         <div class="section-title">3. PROJECT DETAILS</div>
  //         <p class="paragrafy"><strong>Project Description:</strong> ${findAnswer(
  //           "project description"
  //         )}</p>
  //         <p class="paragrafy"><strong>Timeline:</strong> ${findAnswer("timeline")}</p>
  //         <p class="paragrafy"><strong>Budget:</strong> ${findAnswer("budget")}</p>

  //         <div class="section-title">4. REQUIREMENTS</div>
  //         <p class="paragrafy"><strong>Technical Limitations:</strong> ${findAnswer(
  //           "technical limitations"
  //         )}</p>
  //         <p class="paragrafy"><strong>Purpose:</strong> ${findAnswer("purpose")}</p>
  //       `;
  //   }

  //   const paymentIndex = layout === "Legal" ? 6 : 5;
  //   const signatureIndex = paymentIndex + 1;
  //   const generalIndex = signatureIndex + 1;

  //   const closingSections = `
  //     <div class="section-title">${paymentIndex}. PAYMENT TERMS</div>
  //     <p class="paragrafy"><strong>Payment Method:</strong> ${findAnswer("payment method")}</p>
  //     <p class="paragrafy">Payment shall be made as follows: 50% upfront, 50% upon completion.</p>

  //     <div class="section-title">${signatureIndex}. SIGNATURES</div>
  //     <div class="signature-block">
  //       <div class="signature-line">
  //         <p class="paragrafy">__________________________</p>
  //         <p class="paragrafy">Service Provider Signature</p>
  //         <p class="paragrafy">Date: __________________</p>
  //       </div>
  //       <div class="signature-line">
  //         <p class="paragrafy">__________________________</p>
  //         <p class="paragrafy">Client Signature</p>
  //         <p class="paragrafy">Date: __________________</p>
  //       </div>
  //     </div>

  //     <div class="section-title">${generalIndex}. GENERAL PROVISIONS</div>
  //     <p class="paragrafy">This agreement constitutes the entire understanding between the parties.</p>
  //     <p class="paragrafy">Any amendments must be made in writing and signed by both parties.</p>
  //   `;
  
    // return commonSections + specificSections + closingSections;
    return `
     <html>
          <head>
            <style>
            // .specificdiv{
            // margin-left:20px}
             .pdf { padding: 1cm; }
            .receive{
            color:black
            }
              body {
               
                line-height: 1.6;
                color: black;
             
                margin: 0;
              }
              h1 {
                text-align: center;
                font-size: 22pt;
                margin-bottom: 10px;
            
              }
              h2 {
                text-align: center;
                font-size: 14pt;
                margin-bottom: 30px;
                  color: black;
              }
              .section-title {
                font-size: 14pt;
                font-weight: bold;
                margin-top: 20px;
                margin-bottom: 10px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 3px;
              }
              p, li {
                font-size: 11pt;
                text-align: justify;
                margin-bottom: 8px;
              }
              ul {
                padding-left: 20px;
              }
              strong {
                //color: #2c3e50;
              }
              .header {
                margin-bottom: 30px;
                color:black;
              }
              .footer {
                margin-top: 50px;
                font-size: 10pt;
                //color: #7f8c8d;
                text-align: center;
              }
              @media print {
                body { padding: 0; }
              }
              @media (max-width: 640px) {
                 body { padding: 0cm; }
                .pdf { padding: 1cm; }
                 .pdf {  overflow-y: auto; }
                
                h1 { font-size: 1rem; }
                h2 { font-size: 0.6rem; }
                .paragrafy { font-size: 0.6rem; }
                .section-title { font-size: 0.8rem; }
              }
            </style>
          </head>

          <body>
          <div class="pdf">  
            <div class="header">
              <h1>${service} Contract </h1>
              <h2>(${layout} Version)</h2>
            </div>
           <div class="receive">
         
            ${getLayoutContent(layout, findAnswer, service)}
             <div class="specificdiv">
             
            </div>
        
    </div> 
            <div class="footer">
              <p class="paragrafy">Document ID: ${id} | Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            </div> 
          </body>
        </html>
  `
  };

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    setIsGenerating(true);
    try {
      // Create a temporary div for PDF generation
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.width = "210mm";
      tempDiv.style.padding = "20mm";
      tempDiv.style.fontFamily = "'Times New Roman', serif";
      tempDiv.innerHTML = getContractContent();
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
            transform: "scale(0.5)",
            transformOrigin: "top left",
            width: "200%",
            height: "200%",
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
