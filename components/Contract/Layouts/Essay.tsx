import { ContractData, FindAnswerFn } from "../generateLayoutContent";

export function EssayLayout(data: ContractData, findAnswer: FindAnswerFn): string {
  const essayText = findAnswer("Essay text") || "No content provided.";

  const formattedParagraphs = essayText
    .split(/\n\s*\n/)
    .map(paragraph => `<p class="paragrafy">${paragraph.trim()}</p>`)
    .join("\n");

  return `
    ${formattedParagraphs}
  `;
}
