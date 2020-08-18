import survey from "./survey";
import { SurveyResults, QuestionType } from "@/types";
import cheerio from "cheerio";
import { findText } from "@/testUtils";

const SURVEY: SurveyResults = {
  title: "Survey Title",
  questions: [
    {
      title: "Question A",
      question_type: QuestionType.MultipleChoice,
      answers: [],
    },
    {
      title: "Question B",
      question_type: QuestionType.MultipleChoice,
      answers: [],
    },
  ],
  respondent_demographics: {},
};

describe("survey component", () => {
  it("includes the survey title", () => {
    const result = survey(SURVEY, {});
    const $ = cheerio.load(result);

    expect(findText($, "Survey Title")).toBeTruthy();
  });

  it("renders multiple questions", () => {
    const result = survey(SURVEY, {});
    const $ = cheerio.load(result);

    expect(findText($, "Question A")).toBeTruthy();
    expect(findText($, "Question B")).toBeTruthy();
  });
});
