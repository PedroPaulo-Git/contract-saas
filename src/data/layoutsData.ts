import pdf1 from "../assets/pdf1.webp";
import pdf2 from "../assets/pdf2.webp";
import pdf3 from "../assets/pdf3.png";

export const layouts = [
  {
    name: "Essay (Free Writing)",
    service: "Default",
    preview:
      "Write a personalized document without predefined structure or legal format.",
    pdf: pdf1,
  },
  {
    name: "Freelance Agreement",
    service: "Service",
    preview:
      "For freelance projects, covering scope, deadlines, and payment terms.",
    pdf: pdf1,
  },
  {
    name: "Non-Disclosure Agreement (NDA)",
    service: "NDA",
    preview:
      "This agreement is made for the sale of goods. The seller agrees to deliver the goods as described...",
    pdf: pdf2,
  },
  {
    name: "Intellectual Property License Agreement",
    service: "IP",
    preview: "Preview of contract C...",
    pdf: pdf3,
  },
];
