import { SurveyResults } from "@/types";
import html from "@/html";
import { State } from "@/state";

import question from "./question";

import s from "./survey.css";

export default function survey(
  surveyData: SurveyResults,
  filters: State["activeFilters"]
) {
  return html`
    <div class="${s.root}">
      <h2 class="${s.heading}">${surveyData.title}</h2>

      ${surveyData.questions.map((questionData) =>
        question(questionData, surveyData.respondent_demographics, filters)
      )}
    </div>
  `;
}
