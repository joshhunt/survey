import "styles/main.css";
import { getSurveyResults } from "./api";
import question from "./components/question";

const questionsContainer = document.querySelector(".js-questions");

async function main() {
  if (!questionsContainer) {
    throw new Error("questionsContainer is undefined");
  }

  const results = await getSurveyResults();

  const questionEl = question(results.title, results.questions[0]);
  questionsContainer.innerHTML = questionEl;
}

main().then(console.log).catch(console.error);
