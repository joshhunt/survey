import { FilterOption } from "@/types";
import html from "@/html";

import s from "./option.css";

export default function option(
  parentName: string,
  data: FilterOption,
  counts: { [key: string]: { [key: string]: number } }
) {
  return html`<div class=${s.root}>
    <input class=${s.checkbox} type="checkbox" id=${parentName + data.name} />

    <label class=${s.option} for=${parentName + data.name}>
      ${data.display}: ${counts[parentName][data.name].toString()}
    </label>
  </div>`;
}
