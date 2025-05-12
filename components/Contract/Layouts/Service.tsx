import { ContractData, FindAnswerFn, generateClosingSections } from "../generateLayoutContent";

export function ServiceLayout(
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
