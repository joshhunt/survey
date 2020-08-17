export enum QuestionType {
  MultipleChoice = "question_type",
}

export interface Answer {
  text: string;
  respondent_ids: string[];
}

export interface Question {
  title: string;
  question_type: QuestionType;
  answers: Answer[];
}

// Maybe this should just be a kv lookup?
export interface Demographics {
  gender: string;
  home_region: string;
  relationship_status: string;
}

export interface SurveyResults {
  title: string;
  questions: Question[];
  respondent_demographics: { [respondentId: string]: Demographics };
}
