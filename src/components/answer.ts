import html from "@/html";
import { Answer } from "@/types";

import s from "./answer.css";

function countRespondents(
  allRespondents: string[],
  activeRespondents: string[]
) {
  return allRespondents.filter((id) => activeRespondents.includes(id)).length;
}

export default function answer(
  answerData: Answer,
  activeRespondents: string[],
  totalActiveCount: number,
  totalCount: number
) {
  const activeCount = countRespondents(
    answerData.respondent_ids,
    activeRespondents
  );

  const activePercentage = (activeCount / totalActiveCount) * 100 || 0;

  const totalPercentage =
    (answerData.respondent_ids.length / totalCount) * 100 || 0;

  return html`
    <li class="${s.answer}">
      <div class=${s.track} style="width: ${activePercentage}%"></div>

      <div class=${s.marker} style="width: ${totalPercentage}%"></div>

      <div class="${s.label}">
        ${answerData.text}
      </div>

      <div class="${s.value}">
        ${Math.round(activePercentage)}%
      </div>
    </li>
  `;
}
