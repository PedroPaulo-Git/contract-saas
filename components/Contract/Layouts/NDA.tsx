import {FindAnswerFn, generateClosingSections } from "../generateLayoutContent";
import { ContractData } from "../../../types";

export function NDALayout(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <p class="paragraph">
      This Non-Disclosure Agreement ("Agreement") is entered into as of ${data.today} between:
    </p>
<p class="paragraph">Disclosing Party: ${data.clientName}, located at ${data.clientAddress}</p>
<p class="paragraph">Receiving Party: ${data.freelancerName}, located at ${data.freelancerAddress}</p>
<p class="paragraph_br">Throughout the duration of this
Agreement, the Disclosing Party may deem it necessary to disclose or share
certain proprietary information with the Recipient. Therefore, in consideration
of the mutual promises and covenants contained within this Agreement, and other
good and valuable consideration, the receipt and sufficiency of which is hereby
acknowledged, both parties hereto agree as follows:</p>

<p class="paragraph_title">Confidential Information</p>

<p class="paragraph">For all intents and purposes of
this Agreement, "Confidential Information" shall mean and include any data or
information that is deemed proprietary to the Disclosing Party and that which
is not generally known to the public, whether in tangible or intangible form,
whenever and however disclosed, including, but not limited to, (i) any form of
marketing plan, strategies, financial information or projections, operations,
sales quotes or estimates, business plans, performance results which may be
related to the past, present and/or future business activities of said party,
its subsidiaries and affiliated companies; (ii) plans for products or services,
and customer or supplier lists; (iii) any scientific, technical or data
information, invention, design, process, procedure, formula, improvement,
technology or method; (iv) any concepts, reports, data, knowledge, works-in-progress,
designs, development tools, specifications, computer software, source code,
object code, flow charts, databases, inventions, information and trade secrets,
trademarks and copyrights; and (v) any other information that should reasonably
be recognized as confidential information of the Disclosing Party. Confidential
Information need not be novel, unique, patentable, copyrightable or constitute
a trade secret in order to be designated Confidential Information. The
Receiving Party acknowledges that the Confidential Information is proprietary
to the Disclosing Party, has been developed and obtained through great efforts
by the Disclosing Party and, as such, the Disclosing Party regards all of its
Confidential Information as trade secrets.</p>
<p class="sub_paragraph">
Notwithstanding anything in the foregoing statement to the contrary, Confidential Information shall not include any such information which: 
(i) was known by the Receiving Party prior to receiving the Confidential Information from the Disclosing Party; (ii) becomes rightfully known to the Receiving 
Party from a third party source not known, after diligent inquiry, by the Receiving Party to be under an obligation to the Disclosing Party to maintain confidentiality; 
(iii) is or shall become publicly available through no fault or failure to act by the Receiving Party in breach of this Agreement; 
(iv) is required to be disclosed in a judicial or administrative proceeding, or is otherwise requested or required to be disclosed by law or regulation, 
although the requirements of Compelled Disclosure shall apply prior to any disclosure being made; and (v) is or has been independently developed by employees,
consultants or agents of the Receiving Party without violation of the herein contained terms and conditions of this Agreement or reference or access to any Confidential
Information; (vi) information the disclosing party shares with others in a non-confidential setting no longer has to be kept by confidential by the receiving party under 
the NDA.
</p>

  `
  //  + generateClosingSections(findAnswer, "NDA");
}
