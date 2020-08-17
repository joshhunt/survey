import { Question } from "@/types";
import html from "@/html";

export default function question(title: string, questionData: Question) {
  return html`
    <div>
      <h2>${title}</h2>

      <div>
        <h3>${questionData.title}</h3>

        <ul>
          ${questionData.answers.map(
            (answer) => html`
              <li>
                ${answer.text}: ${answer.respondent_ids.length.toString()}
              </li>
            `
          )}
        </ul>
      </div>
    </div>
  `;
}
