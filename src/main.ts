import "styles/main.css";
import { getSurveyResults, getFilterDefinition } from "./api";
import question from "./components/question";
import filters from "./components/filters";
import { renderHTML, querySelectorAll } from "./dom";

async function main() {
  const activeFilters: { [name: string]: string } = {};

  function onOptionChange(ev: Event) {
    if (!ev.target) {
      throw new Error("missing target on event");
    }
    const target = <HTMLInputElement>ev.target;

    const name = target.getAttribute("name");
    const value = target.getAttribute("value");

    if (!name || !value) {
      throw new Error("Missing name or value");
    }

    if (target.checked && activeFilters[name] != value) {
      activeFilters[name] = value;
    } else {
      delete activeFilters[name];
    }

    renderResults();
    renderFilters();
  }

  function renderResults() {
    const questionEl = question(
      results.title,
      results.questions[0],
      results.respondent_demographics,
      activeFilters
    );
    renderHTML(questionEl, ".js-questions");
  }

  function renderFilters() {
    console.log("rendering with", activeFilters);
    const filtersEl = filters(
      filterData.demographics,
      results.respondent_demographics,
      activeFilters
    );
    renderHTML(filtersEl, ".js-filters");

    querySelectorAll(".js-option").forEach((el) => {
      el.addEventListener("click", onOptionChange);
    });
  }

  const [results, filterData] = await Promise.all([
    getSurveyResults(),
    getFilterDefinition(),
  ]);

  renderResults();
  renderFilters();
}

main().then(console.log).catch(console.error);
