import cheerio from "cheerio";
import answer from "./answer";
import { findText } from "@/testUtils";

const ANSWER = {
  text: "Facebook",
  respondent_ids: ["a", "b", "c", "d", "e"],
};

const ACTIVE_RESPONDENTS = ["a", "b", "c", "z"];
const TOTAL_ACTIVE_COUNT = ACTIVE_RESPONDENTS.length;
const TOTAL_COUNT = 9;

describe("answer component", () => {
  it("includes the name", () => {
    const result = answer(
      ANSWER,
      ACTIVE_RESPONDENTS,
      TOTAL_ACTIVE_COUNT,
      TOTAL_COUNT
    );

    const $ = cheerio.load(result);

    expect(findText($, "Facebook")).toBeTruthy();
  });

  it("includes the correct percentage", () => {
    const result = answer(
      ANSWER,
      ACTIVE_RESPONDENTS,
      TOTAL_ACTIVE_COUNT,
      TOTAL_COUNT
    );

    const $ = cheerio.load(result);

    expect(findText($, "75%")).toBeTruthy();
  });
});
