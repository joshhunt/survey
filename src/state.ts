import { SurveyResults, Filters } from "./types";

export interface State {
  survey?: SurveyResults;
  filterDefinition?: Filters;
  activeFilters: { [name: string]: string };
}

type Subscriber = (state: State) => void;

let state: State = {
  activeFilters: {},
};

const subscribers: Subscriber[] = [];

export function setState(obj: Partial<State>) {
  state = { ...state, ...obj };

  notifySubscribers();
}

export function subscribe(fn: Subscriber) {
  subscribers.push(fn);
}

function notifySubscribers() {
  subscribers.forEach((fn) => fn(state));
}

export function getState() {
  return state;
}
