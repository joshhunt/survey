import option from "./option";
import cheerio from "cheerio";
import { findText } from "@/testUtils";

const FILTER_NAME = "gender";
const FILTER = {
  name: "male",
  display: "Male",
};
const COUNTS = {
  [FILTER_NAME]: {
    [FILTER.name]: 13,
  },
};

describe("option component", () => {
  it("includes the display name", () => {
    const result = option(FILTER_NAME, FILTER, COUNTS, true);
    const $ = cheerio.load(result);

    expect(findText($, FILTER.display)).toBeTruthy();
  });

  it("adds checked attribute when its selected", () => {
    const result = option(FILTER_NAME, FILTER, COUNTS, true);
    const radio = cheerio.load(result)(`input[type="radio"]`);
    expect(radio.attr("checked")).toBeTruthy();
  });

  it("doesnt add checked attribute when its not selected", () => {
    const result = option(FILTER_NAME, FILTER, COUNTS, false);
    const radio = cheerio.load(result)(`input[type="radio"]`);
    expect(radio.attr("checked")).toBeFalsy();
  });
});
