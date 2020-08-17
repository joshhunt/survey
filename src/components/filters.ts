import { Filter, SurveyResults } from "@/types";
import html from "@/html";

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
  respondentDemographics: SurveyResults["respondent_demographics"]
) {
  console.log({ respondentDemographics });
  const demographicCounts = sumDemographics(respondentDemographics);

  return html`
    <div>
      <h2>Filters</h2>

      <div>
        ${filterData.map(
          (filter) => html`
            <div>
              <h3>${filter.display}</h3>

              ${filter.options.map(
                (option) =>
                  html`<div>
                    ${option.display}:
                    ${demographicCounts[filter.name][option.name].toString()}
                  </div>`
              )}
            </div>
          `
        )}
      </div>
    </div>
  `;
}
