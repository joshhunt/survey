import { SurveyResults, Filters } from "./types";

export function getSurveyResults(): Promise<SurveyResults> {
  return fetch("/api/survey").then((r) => r.json());
}

export function getFilterDefinition(): Promise<Filters> {
  return fetch("/api/filter-definition").then((r) => r.json());
}
