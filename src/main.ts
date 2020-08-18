import "styles/main.css";

import { getSurveyResults, getFilterDefinition } from "./api";
import question from "./components/question";
import filters from "./components/filters";
import { renderHTML } from "./dom";
import { subscribe, setState, State } from "./state";
import { connectOnOptionChange } from "./components/option";

function renderResults(state: State) {
  if (!state.survey) {
    return;
  }

  const questionEl = question(
    state.survey.title,
    state.survey.questions[0],
    state.survey.respondent_demographics,
    state.activeFilters
  );

  renderHTML(questionEl, ".js-questions");
}

function renderFilters(state: State) {
  if (!state.survey || !state.filterDefinition) {
    return;
  }

  const filtersEl = filters(
    state.filterDefinition.demographics,
    state.survey.respondent_demographics,
    state.activeFilters
  );
  renderHTML(filtersEl, ".js-filters");

  connectOnOptionChange(state);
}

async function main() {
  getSurveyResults().then((data) => setState({ survey: data }));
  getFilterDefinition().then((data) => setState({ filterDefinition: data }));

  subscribe((state) => {
    renderResults(state);
    renderFilters(state);
  });
}

main().then(console.log).catch(console.error);
