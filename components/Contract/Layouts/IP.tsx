import { FindAnswerFn, generateClosingSections } from "../generateLayoutContent";
import { ContractData } from "../../../types";

export function IPLayout(data: ContractData, findAnswer: FindAnswerFn): string {
  return `
    <div class="section-title">1. OWNERSHIP</div>
    <p class="paragraph">
      The intellectual property developed during the project remains with the creator unless otherwise agreed.
    </p>
  ` + generateClosingSections(findAnswer, "IP");
}
