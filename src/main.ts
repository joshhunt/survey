import "styles/main.css";
import { getSurveyResults, getFilterDefinition } from "./api";
import question from "./components/question";
import filters from "./components/filters";

const questionsContainer = document.querySelector(".js-questions");
const filtersContainer = document.querySelector(".js-filters");

async function main() {
  if (!questionsContainer || !filtersContainer) {
    throw new Error("elements are not defined");
  }

  const results = await getSurveyResults();
  const filterData = await getFilterDefinition();

  const questionEl = question(results.title, results.questions[0]);
  questionsContainer.innerHTML = questionEl;

  const filtersEl = filters(
    filterData.demographics,
    results.respondent_demographics
  );
  filtersContainer.innerHTML = filtersEl;
}

main().then(console.log).catch(console.error);
