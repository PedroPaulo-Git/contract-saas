
// types.ts
// import { ContractData } from "../../types";
  
export type FindAnswerFn = (question: string) => string;

export function generateClosingSections(findAnswer: FindAnswerFn, layout: string, options?: { clientSignature?: string, freelancerSignature?: string }): string {
  const paymentMethod = findAnswer("payment method") || "[Not specified]";

  return `
    <style>
      .section-title {
        font-weight: bold;
        margin-top: 30px;
        margin-bottom: 10px;
        font-size: 1.1em;
      }
      .paragraph {
        margin: 8px 0;
      }
      .signature-block {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
      }
      .signature-item {
        width: 45%;
      }
      .signature-image {
        height: 60px;
        display: block;
        margin-bottom: 5px;
      }
      .signature-line {
        display: inline-block;
        min-width: 200px;
        border-bottom: 1px solid #000;
        margin-bottom: 5px;
      }
    </style>

    <div class="section-title">PAYMENT TERMS</div>
    <p class="paragraph"><strong>Payment Method:</strong> ${paymentMethod}</p>
    <p class="paragraph">Payment shall be made as follows: 50% upfront, 50% upon completion.</p>

    <div class="section-title">SIGNATURES</div>
    <div class="signature-block">
      <div class="signature-item">
        ${options?.freelancerSignature
          ? `<img src="${options.freelancerSignature}" class="signature-image" />`
          : `<div class="signature-line"></div>`}
        <p class="paragraph">Service Provider Signature</p>
        <p class="paragraph">Date: __________________</p>
      </div>
      <div class="signature-item">
        ${options?.clientSignature
          ? `<img src="${options.clientSignature}" class="signature-image" />`
          : `<div class="signature-line"></div>`}
        <p class="paragraph">Client Signature</p>
        <p class="paragraph">Date: __________________</p>
      </div>
    </div>

    <div class="section-title">GENERAL PROVISIONS</div>
    <p class="paragraph">This agreement constitutes the entire understanding between the parties.</p>
    <p class="paragraph">Any amendments must be made in writing and signed by both parties.</p>
  `;
}