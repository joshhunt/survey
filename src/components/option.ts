import cx from "classnames";
import { FilterOption } from "@/types";
import html from "@/html";

import s from "./option.css";
import { State, setState } from "@/state";
import { querySelectorAll } from "@/dom";

export default function option(
  filterName: string,
  data: FilterOption,
  counts: { [key: string]: { [key: string]: number } },
  isSelected: boolean
) {
  return html`<div class=${s.root}>
    <input
      name="${filterName}"
      value="${data.name}"
      class="${cx(s.checkbox, "js-option")}"
      type="radio"
      id=${filterName + data.name}
      ${isSelected ? "checked" : ""}
    />

    <label class=${s.option} for=${filterName + data.name}>
      <div class=${s.label}>
        ${data.display}
      </div>

      <div class=${s.count}>
        ${counts[filterName][data.name].toString()}
      </div>
    </label>
  </div>`;
}

const onOptionChange = (state: State) => (ev: Event) => {
  if (!ev.target) {
    throw new Error("missing target on event");
  }

  const activeFilters = { ...state.activeFilters };
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

  setState({ activeFilters });
};

export const connectOnOptionChange = (state: State) => {
  querySelectorAll(".js-option").forEach((el) =>
    el.addEventListener("click", onOptionChange(state))
  );
};
