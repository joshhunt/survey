import cx from "classnames";
import { FilterOption } from "@/types";
import html from "@/html";

import s from "./option.css";

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
