
// types.ts
export interface ContractData {
    today: string;
    clientName: string;
    freelancerName: string;
    companyName: string;
    projectType: string;
    projectDescription: string;
  }
  
export type FindAnswerFn = (question: string) => string;

export function generateClosingSections(findAnswer: FindAnswerFn, layout: string): string {
  const paymentIndex = layout === "Legal" ? 6 : 5;
  const signatureIndex = paymentIndex + 1;
  const generalIndex = signatureIndex + 1;

  return `
    <div class="section-title">${paymentIndex}. PAYMENT TERMS</div>
    <p class="paragrafy"><strong>Payment Method:</strong> ${findAnswer("payment method")}</p>
    <p class="paragrafy">Payment shall be made as follows: 50% upfront, 50% upon completion.</p>

    <div class="section-title">${signatureIndex}. SIGNATURES</div>
    <div class="signature-block">
      <div class="signature-line">
        <p class="paragrafy">__________________________</p>
        <p class="paragrafy">Service Provider Signature</p>
        <p class="paragrafy">Date: __________________</p>
      </div>
      <div class="signature-line">
        <p class="paragrafy">__________________________</p>
        <p class="paragrafy">Client Signature</p>
        <p class="paragrafy">Date: __________________</p>
      </div>
    </div>

    <div class="section-title">${generalIndex}. GENERAL PROVISIONS</div>
    <p class="paragrafy">This agreement constitutes the entire understanding between the parties.</p>
    <p class="paragrafy">Any amendments must be made in writing and signed by both parties.</p>
  `;
}

export function generateNDAContent(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <div class="section-title">1. PARTIES</div>
    <p class="paragrafy">
      This Non-Disclosure Agreement ("Agreement") is entered into as of ${data.today} between:
    </p>
    <p class="paragrafy"><strong>Disclosing Party:</strong> ${data.clientName}</p>
    <p class="paragrafy"><strong>Receiving Party:</strong> ${data.freelancerName}</p>

    <div class="section-title">2. CONFIDENTIAL INFORMATION</div>
    <p class="paragrafy">
      The parties agree to protect confidential information, including but not limited to trade secrets, business strategies, and proprietary data.
    </p>
  ` + generateClosingSections(findAnswer, "NDA");
}

// Outros layouts (IP, Business, etc) seguem o mesmo padrão:

export function generateIPContent(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <div class="section-title">1. OWNERSHIP</div>
    <p class="paragrafy">
      The intellectual property developed during the project remains with the creator unless otherwise agreed.
    </p>
  ` + generateClosingSections(findAnswer, "IP");
}

export function generateBusinessContent(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <div class="section-title">1. SCOPE OF WORK</div>
    <p class="paragrafy">
      ${data.projectDescription}
    </p>
  ` + generateClosingSections(findAnswer, "Business");
}
export function generateServiceContent(
  data: ContractData,
  findAnswer: FindAnswerFn,
  service: string
): string {
  return `
    <div class="section-title">1. PARTIES INVOLVED</div>
    <p class="paragrafy">
      This Service Agreement is made between the following parties:
    </p>
    <p class="paragrafy"><strong>Client:</strong> ${findAnswer("Full legal name of client") || '[Client Name]'}</p>
    <p class="paragrafy"><strong>Freelancer:</strong> ${findAnswer("Full legal name of freelancer") || '[Freelancer Name]'}</p>

    <div class="section-title">2. PROJECT OVERVIEW</div>
    <p class="paragrafy">
      The freelancer agrees to perform the following service: <strong>${service}</strong>, which falls under the category of <strong>${findAnswer("Project type") || '[Project Type]'}</strong>.
    </p>
    <p class="paragrafy">
      Project description: ${findAnswer("Brief project description") || '[Description Not Provided]'}
    </p>

    <div class="section-title">3. TIMELINE</div>
    <p class="paragrafy">
      The project will commence on <strong>${findAnswer("Start date") || '[Start Date]'}</strong> and is expected to end on <strong>${findAnswer("End date") || '[End Date]'}</strong>. 
      The estimated completion date is <strong>${findAnswer("Expected completion date") || '[Expected Date]'}</strong>.
    </p>

    <div class="section-title">4. COMMUNICATION & REVISIONS</div>
    <p class="paragrafy">
      Communication between the parties will be conducted primarily via <strong>${findAnswer("Communication method") || '[Method Not Specified]'}</strong>. 
      Response time is expected to be within <strong>${findAnswer("Response time (e.g., within 24 hours)") || '[Response Time]'}</strong>.
    </p>
    <p class="paragrafy">
      The freelancer offers the following revision policy: <strong>${findAnswer("Revision policy (e.g., 2 rounds included)") || '[Policy Not Specified]'}</strong>.
    </p>
  ` + generateClosingSections(findAnswer, "Service");
}


export function generateLegalContent(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <div class="section-title">1. LEGAL TERMS</div>
    <p class="paragrafy">
      Both parties agree to comply with local, state, and federal regulations.
    </p>
  ` + generateClosingSections(findAnswer, "Legal");
}

export function generateEssayContent(data: ContractData, findAnswer: FindAnswerFn, service: string, layout: string): string {
  const essayText = findAnswer("Essay text") || "No content provided.";

  const formattedParagraphs = essayText
    .split(/\n\s*\n/)
    .map(paragraph => `<p class="paragrafy">${paragraph.trim()}</p>`)
    .join("\n");

  return `
    ${formattedParagraphs}
  `;
}





// function getLayoutContent(layout: string, findAnswer: (question: string) => string, service: string): string {
//     const baseData: ContractData = {
//       today: new Date().toLocaleDateString(),
//       clientName: findAnswer("Full legal name of client") || "__________",
//       freelancerName: findAnswer("Full legal name of freelancer") || "__________",
//       companyName: findAnswer("company legal name") || "__________",
//       projectType: findAnswer("Project type") || "__________",
//       projectDescription: findAnswer("Brief project description") || "__________",
//     };
  
//     switch (layout) {
//       case "NDA":
//         return generateNDAContent(baseData, findAnswer);
//       case "IP":
//         return generateIPContent(baseData, findAnswer);
//       case "Business":
//         return generateBusinessContent(baseData, findAnswer);
//       case "Service":
//         return generateServiceContent(baseData, findAnswer, service);
//       case "Legal":
//         return generateLegalContent(baseData, findAnswer);
//       default:
//         return generateEssayContent(baseData, findAnswer,service,layout);
//     }
//   }
  