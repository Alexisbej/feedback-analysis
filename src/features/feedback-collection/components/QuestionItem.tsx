import { Button } from "@/components/ui/button";

export type ResponseValue = string | number;

export interface Question {
  id: string;
  tenantId: string; 
  question: string;
  type: "TEXT" | "RATING" | "MULTIPLE_CHOICE";
  options?: string[];
}

interface QuestionItemProps {
  question: Question;
  response: ResponseValue | undefined;
  onChange: (value: ResponseValue) => void;
}

export default function QuestionItem({
  question,
  response,
  onChange,
}: QuestionItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <p className="mb-2 font-semibold">{question.question}</p>

      {question.type === "RATING" && (
        <div className="flex space-x-2 w-1/2 justify-between mx-auto">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
            <Button
              key={rating}
              className="w-12 h-12"
              type="button"
              variant={response === rating ? "default" : "outline"}
              onClick={() => onChange(rating)}
            >
              {rating}
            </Button>
          ))}
        </div>
      )}

      {question.type === "TEXT" && (
        <textarea
          className="w-full border rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          value={response ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {question.type === "MULTIPLE_CHOICE" && question.options && (
        <div className="flex space-x-2">
          {question.options.map((option) => (
            <Button
              key={option}
              type="button"
              variant={response === option ? "default" : "outline"}
              onClick={() => onChange(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
