import { FindAnswerFn, generateClosingSections } from "../generateLayoutContent";
import { ContractData } from "../../../types";

export function IPLayout(data: ContractData, findAnswer: FindAnswerFn): string {
  const LicensorName = findAnswer("Licensor Name");
  const LicenseeName = findAnswer("Licensee Name");
  const IPDescription = findAnswer("Description of Intellectual Property");
  const LicenseScope = findAnswer("Scope of License");
  const Territory = findAnswer("Territory");
  const Duration = findAnswer("License Duration");
  const Compensation = findAnswer("Compensation Terms");
  const Restrictions = findAnswer("Usage Restrictions");
  const ConfidentialityTerms = findAnswer("Confidentiality Terms");
  const GoverningLaw = findAnswer("Governing Law State");
  const Jurisdiction = findAnswer("Jurisdiction Location");
  const clientSignature = findAnswer("IP Signature");
  if (!clientSignature) {
    console.warn("No signature found - using placeholder");
  }

  return `
  <p class="paragraph_title">Grant of License</p>
  <p class="paragraph">${LicensorName} ("Licensor") hereby grants to ${LicenseeName} ("Licensee") a license to use the intellectual property described as ${IPDescription} (the "Licensed Property"), subject to the terms and conditions set forth herein.</p>

  <p class="paragraph_title">Scope of License</p>
  <p class="paragraph">The license granted is ${LicenseScope}, limited to use within ${Territory}, and shall remain in effect for ${Duration}, unless otherwise terminated pursuant to the terms of this Agreement.</p>

  <p class="paragraph_title">Compensation</p>
  <p class="sub_paragraph">As consideration for the license granted herein, Licensee agrees to pay Licensor as follows: ${Compensation}.</p>

  <p class="paragraph_title">Restrictions on Use</p>
  <p class="sub_paragraph">Licensee shall use the Licensed Property only as expressly permitted under this Agreement. ${Restrictions} Licensee shall not sublicense, transfer, or assign any of its rights under this Agreement without the prior written consent of Licensor.</p>

  <p class="paragraph_title">Ownership</p>
  <p class="paragraph">All rights, title, and interest in and to the Licensed Property shall remain the exclusive property of Licensor. Nothing in this Agreement shall be construed to transfer any ownership rights to Licensee.</p>

  <p class="paragraph_title">Confidentiality</p>
  <p class="paragraph">Both parties agree to maintain in strict confidence all non-public, proprietary, or confidential information disclosed during the term of this Agreement. ${ConfidentialityTerms}</p>

  <p class="paragraph_title">Termination</p>
  <p class="paragraph">This Agreement may be terminated by either party upon written notice in the event of a material breach, which is not cured within thirty (30) days of such notice. Upon termination, Licensee shall immediately cease all use of the Licensed Property and destroy or return any materials containing the Licensed Property.</p>

  <p class="paragraph_title">Warranties and Disclaimers</p>
  <p class="paragraph">Licensor makes no representations or warranties, express or implied, including, but not limited to, any warranties of merchantability or fitness for a particular purpose. The Licensed Property is provided "as is."</p>
  <div style="height: 100px;"></div>
  <p class="paragraph_title">Limitation of Liability</p>
  <p class="paragraph">In no event shall either party be liable for any indirect, incidental, or consequential damages arising out of or in connection with this Agreement.</p>

  <p class="paragraph_title">Governing Law</p>
  <p class="paragraph">This Agreement shall be governed by and construed in accordance with the laws of ${GoverningLaw}, without regard to conflict of law principles. The courts located in ${Jurisdiction} shall have exclusive jurisdiction over any disputes arising out of this Agreement.</p>

  <p class="paragraph_title">Entire Agreement</p>
  <p class="paragraph">This Agreement contains the entire understanding between the parties and supersedes all prior negotiations and understandings with respect to the subject matter hereof. Any amendments must be made in writing and signed by both parties.</p>
<div class="contract-content">
      <!-- Add signature block at the end of content -->
      <div style="margin-top: 40px; page-break-before: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 60px;">
          <div">
            ${clientSignature 
              ? `<img src="${clientSignature}" style="height: 80px; display: block;" />` 
              : `<div style="border-bottom: 1px solid black; background-color:black;">!11111111111111</div>`}
            <p style="margin-top: 8px;">Client Signature</p>
            <p>Date: __________________</p>
          </div>
          
          <div">
            <div style="border-bottom: 1px solid black; "></div>
            <p style="margin-top: 8px;">Licensor Signature</p>
            <p>Date: __________________</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
