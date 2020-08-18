import { getSurveyResults, getFilterDefinition } from "./api";
import { renderHTML } from "./dom";
import { subscribe, setState, State } from "./state";
import survey from "./components/survey";
import filters from "./components/filters";
import { connectOnOptionChange } from "./components/option";

import "styles/main.css";

function renderSurvey(state: State) {
  if (!state.survey) {
    return;
  }

  const surveyEl = survey(state.survey, state.activeFilters);
  renderHTML(surveyEl, ".js-questions");
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
    renderSurvey(state);
    renderFilters(state);
  });
}

main().then(console.log).catch(console.error);
