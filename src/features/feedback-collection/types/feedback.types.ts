export interface Branding {
  color: string;
  logo?: string | null;
}

export type QuestionType = "TEXT" | "RATING" | "MULTIPLE_CHOICE";

export interface FeedbackQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options: string[] | null;
  templateName: string;
  tenantName: string;
  branding: Branding;
}
