import { Question, SurveyResults } from "@/types";
import html from "@/html";
import answer from "./answer";

import s from "./question.css";
import { State } from "@/state";

function filterRespondents(
  respondentDemographics: SurveyResults["respondent_demographics"],
  filters: { [name: string]: string }
) {
  const active: string[] = [];
  const filtersArr = Object.entries(filters);

  Object.entries(respondentDemographics).forEach(([id, demographics]) => {
    const matches = filtersArr.every(
      ([key, value]) => demographics[key] === value
    );

    if (matches) {
      active.push(id);
    }
  });

  return active;
}

export default function question(
  questionData: Question,
  respondentDemographics: SurveyResults["respondent_demographics"],
  filters: State["activeFilters"]
) {
  const activeRespondents = filterRespondents(respondentDemographics, filters);

  // Assumes that respondentDemographics contains only and all the respondents for this question
  const totalActiveCount = activeRespondents.length;
  const totalCount = Object.values(respondentDemographics).length;

  return html`
    <div class="${s.question}">
      <h3 class="${s.questionTitle}">${questionData.title}</h3>

      <ul class="${s.answers}">
        ${questionData.answers.map((answerData) =>
          answer(answerData, activeRespondents, totalActiveCount, totalCount)
        )}
      </ul>
    </div>
  `;
}
