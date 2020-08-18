import { Filter, SurveyResults } from "@/types";
import html from "@/html";

import s from "./filters.css"; // ???
import option from "./option";

function sumDemographics(
  respondentDemographics: SurveyResults["respondent_demographics"]
) {
  const counts: { [key: string]: { [key: string]: number } } = {};
  Object.values(respondentDemographics).forEach((demographics) => {
    Object.entries(demographics).forEach(([key, value]) => {
      if (!counts[key]) {
        counts[key] = {};
      }

      if (!counts[key][value]) {
        counts[key][value] = 0;
      }

      counts[key][value] += 1;
    });
  });

  return counts;
}

export default function filters(
  filterData: Filter[],
  respondentDemographics: SurveyResults["respondent_demographics"],
  filters: { [name: string]: string }
) {
  const demographicCounts = sumDemographics(respondentDemographics);

  return html`
    <div class="${s.root}">
      <h2 class="${s.heading}">Filters</h2>

      <div class=${s.filters}>
        ${filterData.map(
          (filter) => html`
            <div>
              <h3 class="${s.title}">${filter.display}</h3>

              <div class=${s.options}>
                ${filter.options.map((data) =>
                  option(
                    filter.name,
                    data,
                    demographicCounts,
                    filters[filter.name] === data.name
                  )
                )}
              </div>
            </div>
          `
        )}
      </div>
    </div>
  `;
}
