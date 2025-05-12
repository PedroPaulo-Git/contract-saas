import {FindAnswerFn } from "../generateLayoutContent";
import { ContractData } from "../../../types";

export function NDALayout(data: ContractData): string {
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

<p class="paragraph_title">Confidential Information Disclosure</p>
<p class="paragraph">The Disclosing Party may deem it
necessary, from time to time, to disclose or make available to the Receiving
Party Confidential Information. It shall then become the responsibility of the
Receiving Party to: (i) limit the disclosure of any Confidential Information
belonging to the Disclosing Party to the Receiving Party's directors, officers,
employees, agents or representatives (collectively herein referred to as
"Representatives") who have a need to know such Confidential Information in
connection with the current or contemplated business relationship between the
parties to which this Agreement relates, and only for that purpose; (ii) advise
its Representatives of the proprietary nature of the Confidential Information
and of the obligations set forth herein this Agreement and require such
Representatives to keep the Confidential Information confidential; (iii) shall
keep all Confidential Information strictly confidential by way of exercising a
reasonable degree of care, but not less than the degree of care that the
Receiving Party would exercise in safeguarding their own confidential
information; and (iv) not disclose any Confidential Information received to any
third parties, unless otherwise provided for herein this Agreement.</p>

<p class="sub_paragraph">Therefore, each party shall be
responsible for any breach of this Agreement by any of their respective
Representatives.</p>

<p class="paragraph_title">Confidential Information Usage</p>
<p class="paragraph">The Receiving Party herein agrees
to make use of the Confidential Information solely for the purpose and in
connection with the current or contemplated business relationship between both
parties and not for any purpose other than that which has been stipulated and
contained herein this Agreement, unless otherwise authorized by prior written
consent by an authorized representative of the Disclosing Party. There shall be
no other right or license, whether expressed or implied, in the Confidential
Information granted to the Receiving Party hereunder. Ownership and title to
the Confidential Information shall remain solely with the Disclosing Party, any
and all use of the Confidential Information by the Receiving Party shall be
solely for the benefit of the Disclosing Party, and any type or manner of
improvements or modifications thereof by the Receiving Party shall remain the
sole property of the Disclosing Party. There shall be nothing herein contained that
would be intended to modify the parties' existing agreement that the parties'
discussions in furtherance of a potential business relationship shall herein be
governed by Federal Rule of Evidence 408 – Compromise Offers and Negotiations.</p>

<p class="paragraph_title">Induced Disclosure of Confidential Information</p>
<p class="paragraph">Notwithstanding anything in the foregoing clauses to the contrary, the Receiving Party may be compelled to disclose Confidential 
Information pursuant to any governmental, judicial, or administrative order, subpoena, discovery request, regulatory request or similar method, provided that the Receiving Party 
promptly notifies, to the extent feasible, the Disclosing Party in writing of any such demand for disclosure so that the Disclosing Party, at its sole expense, may seek to make 
such disclosure subject to a protective order or other appropriate remedy to preserve the confidentiality of the Confidential Information; provided in the case of a broad 
regulatory request with respect to the Receiving Party's business (not targeted at Disclosing Party), the Receiving Party may promptly 
comply with such request provided the Receiving Party provides (if permitted by such regulator) the Disclosing Party prompt notice of such disclosure. 
The Receiving Party agrees that it shall not oppose and shall cooperate with efforts by, to the extent feasible, the Disclosing Party with any such request for a 
protective order or other relief. Notwithstanding the foregoing, if the Disclosing Party is unable to obtain or does not seek a protective order and the Receiving Party is 
legally requested or required to disclose such Confidential Information, disclosure of such Confidential Information may be made without liability.</p>

<p class="paragraph_title">Independent Development</p>
<p class="paragraph">Receiving Party may currently or in the future be developing information internally, or receiving information internally, 
or receiving information from other parties that may be similar to the Disclosing Party's Confidential Information. Accordingly, 
nothing in this Agreement will be construed as a representation or inference that Receiving Party will not develop or have developed products or services, 
that, without violation of this Agreement, might compete with the products or systems contemplated by the Disclosing Party's Confidential Information..</p>

<p class="paragraph_title">Term</p>
<p class="paragraph">The herein contained Agreement shall remain in effect . Notwithstanding the foregoing, the parties' duties to maintain in confidence any and all Confidential Information that may have been disclosed during the term shall thus remain in effect indefinitely.</p>

<p class="paragraph_title">No Warranty</p>
<p class="paragraph">All Confidential Information is provided by Disclosing Party "AS IS" and without any warranty, express, implied or otherwise, regarding the Confidential Information's completeness, accuracy or performance.
</p>

<p class="paragraph_title">Remedies</p>
<p class="paragraph">Both parties to this Agreement acknowledge and agree that the Confidential Information hereunder this Agreement is of a unique and valuable nature, and that the unauthorized distribution or broadcasting of the Confidential Information could have the potential to destroy and, at the very least, diminish the value of such information. The damages that the Disclosing Party could sustain as a direct result of the unauthorized dissemination of the Confidential Information would be impossible to calculate. Therefore, both parties hereby agree that the Disclosing Party shall be entitled to claim injunctive relief that would prevent the dissemination of any Confidential Information that would be in violation of the terms set forth herein this Agreement. Any such injunctive relief provided shall be in addition to any other available remedies hereunder, whether at law or in equity. The Disclosing Party shall be entitled to recover any sustained costs and/or fees, including, but not limited to, any reasonable attorney's fees which may be incurred while attempting to obtain any such relief. Furthermore, in the event of any litigation which may be related to this Agreement, the prevailing party shall be entitled to recover any such reasonable attorney's fees and expenses incurred.</p>

<p class="paragraph_title">Return of Confidential Information</p>
<p class="paragraph">Upon completion/expiration or termination of this Agreement, the Receiving Party shall immediately return and deliver to the Disclosing Party all tangible material and/or information representing or exemplifying the Confidential Information provided hereunder and all notes, summaries, memoranda, drawings, manuals, records, excerpts or derivative information deriving therefrom and all other documents, materials, notes or copies ("Notes") which may have been converted to any computerized media in the form of any image, data or word processing files either manually or by image capture or any other form of work product that may be based on or include any Confidential Information, in whatever form of storage or retrieval, upon the earlier of (i) the completion or termination of this Agreement or (ii) at such time as the Disclosing Party may so request; provided however that the Receiving Party may retain such of its documents as is necessary to enable it to comply with its document retention policies. Alternatively, with the prior written consent of the Disclosing Party, the Receiving Party may immediately destroy (in the case of Notes, at the Receiving Party's sole discretion) any of the foregoing embodying Confidential Information (or the reasonably non-recoverable data erasure of computerized data) and, upon request, certify in writing such destruction by an authorized officer of the Receiving Party supervising the destruction of the material and or information.</p>

<p class="paragraph_title">Notice of Breach</p>
<p class="paragraph">The Receiving Party shall immediately notify the Disclosing Party upon discovering any unauthorized use or disclosure of Confidential Information by the Receiving Party or its Representatives, or any other breach of this Agreement by the Receiving Party or its Representatives, and will cooperate with any efforts by the Disclosing Party to assist the Disclosing Party to regain the possession of its Confidential Information and thus prevent its further unauthorized use.</p>

<p class="paragraph_title">No Legally Binding Agreement for Transaction</p>
<p class="paragraph">Both parties hereby agree that neither party shall be under any legal obligation of any kind whatsoever with respect to a Transaction by virtue of this Agreement, except for the matters specifically agreed to herein. The parties further acknowledge and agree that each party herein reserves the right, in their sole and absolute discretion, to reject any and/or all proposals and to terminate discussions and negotiations with respect to any Transaction at any time. This Agreement does not create or constitute a joint venture or partnership between the parties. In the event that a Transaction should go forward, the non-disclosure provisions of any applicable transaction documents entered into between the parties (or their respective affiliates) for the Transaction shall supersede this Agreement. Should and such provision not be provided or stipulated in said transaction documents, then this Agreement shall be the controlling instrument.</p>

<p class="paragraph_title">Warranty</p>
<p class="paragraph">Each party herein warrants that it has the right and authorization to make such disclosures under this Agreement. NO WARRANTIES ARE MADE BY EITHER PARTY UNDER THIS AGREEMENT WHATSOEVER. The parties acknowledge that although they shall each endeavor to include in the Confidential Information any and all information that they each believe relevant for the purpose of the evaluation of a Transaction, the parties understand that no representation or warranty as to the accuracy or completeness of the Confidential Information is being made by either party as the Disclosing Party. Furthermore, neither party is under any obligation contained within this Agreement to disclose any Confidential Information it chooses not to disclose. Neither party hereto shall have any liability to the other party, or to the other party's Representatives, resulting from any use of the Confidential Information except with respect to the disclosure of such Confidential Information in violation of this Agreement.</p>

<p class="paragraph_title">Entire Agreement</p>
<p class="paragraph">This Agreement constitutes the entire understanding between the parties and supersedes any and all prior or contemporaneous understandings and agreements, whether oral or written, between the parties, with respect to the subject matter hereof. This Agreement can only be modified by written amendment signed by the party against whom such enforcement is sought.

 </p>

<p class="paragraph_title">Governing Laws</p>
<p class="paragraph">The validity, construction and performance of this Agreement shall be governed and construed in accordance with the laws of or any applicable federal laws or statutes applicable to contracts made and to be wholly performed within such state, without giving effect to any form of conflict of law provisions thereof. The Federal and State courts located in shall have sole and exclusive jurisdiction over any disputes arising under the terms of this Agreement.

</p>

<p class="paragraph_title">Waiver of Contractual Right</p>
<p class="paragraph">Any such failure by either party to enforce the other party's strict performance of any provision of this Agreement shall not constitute a waiver of its right to subsequently enforce such provision or any other provision of this Agreement.

</p>

<p class="paragraph_title">Severability</p>
<p class="paragraph">Although the restrictions herein contained in this Agreement are considered by the parties to be reasonable for the purpose of protecting the Confidential Information, if any such restriction is found by a court of competent jurisdiction to be unenforceable, such provision will be modified, rewritten or interpreted to include as much of its nature and scope as will render it enforceable. In the event it cannot be so modified, rewritten or interpreted to be enforceable in any respect, it will not be given effect, and the remainder of the Agreement shall be enforced as if such provision was not included.
</p>

<p class="paragraph_title">Notices</p>
<p class="paragraph">Any notices or communications required or permitted to be given hereunder may be delivered by hand, deposited with a nationally recognized overnight carrier, emailed, or mailed by certified mail, return receipt requested, postage prepaid, in each case, to the aforementioned address of the other party, or any such other address or addressee as may be furnished by a party in accordance with this paragraph. All such notices or communication shall be deemed to have been given and received (i) in the case of personal delivery or email, on the date of said delivery, (ii) in the case of delivery by a nationally recognized overnight carrier, on the third business day following dispatch, and (iii) in the case of mailing, on the seventh business day following such mailing.
</p>

<p class="paragraph_title">Transfer or Assign</p>
<p class="paragraph">This Agreement is personal in nature, and neither party may directly or indirectly assign or transfer it by operation of law or otherwise without the prior written consent of the other party, which consent shall not be unreasonably withheld. All obligations contained in this Agreement shall extend to and be binding upon the parties to this Agreement and their respective successors, assigns and designees.
</p>

<p class="paragraph_title">Miscellaneous</p>
<p class="paragraph">The receipt of Confidential Information pursuant to this Agreement shall not prevent or in any way limit either party from: (i) developing, making or marketing products or services that are or may be competitive with the products or services of the other, or (ii) providing products or services to other who compete with the other.
</p>

<p class="paragraph">Paragraph headings used in this Agreement are for reference only and shall not be used or relied upon in the interpretation of this Agreement.
</p>

<p class="paragraph"><strong>IN WITNESS WHEREOF</strong>, the parties hereto have executed this Agreement as of the aforementioned effective date.
</p>

  `
  //  + generateClosingSections(findAnswer, "NDA");
}
