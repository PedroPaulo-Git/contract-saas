import { ContractData, FindAnswerFn, generateClosingSections } from "../generateLayoutContent";

export function NDALayout(data: ContractData, findAnswer: FindAnswerFn): string {
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
