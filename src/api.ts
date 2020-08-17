import { SurveyResults } from "./types";

export function getSurveyResults(): Promise<SurveyResults> {
  return fetch("/api/survey").then((r) => r.json());
}
