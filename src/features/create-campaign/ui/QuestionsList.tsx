import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormValues } from "../hooks/useCreateCampaignForm";

type QuestionsListProps = {
  questions: FormValues["questions"];
  templateType: "rating" | "feedback";
  register: UseFormRegister<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  removeQuestion: (index: number) => void;
  addQuestion: () => void;
};

export const QuestionsList: FC<QuestionsListProps> = ({
  questions,
  templateType,
  register,
  setValue,
  removeQuestion,
  addQuestion,
}) => {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={index} className="space-y-4 border p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Question {index + 1}</h3>
            {questions.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <Input
            {...register(`questions.${index}.text` as const)}
            placeholder="Enter your question"
          />

          {templateType === "feedback" && (
            <Select
              value={question.type}
              onValueChange={(value) =>
                setValue(`questions.${index}.type` as const, value as "TEXT" | "MULTIPLE_CHOICE")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEXT">Text Answer</SelectItem>
                <SelectItem value="MULTIPLE_CHOICE">Multiple Choice</SelectItem>
              </SelectContent>
            </Select>
          )}

          {question.type === "MULTIPLE_CHOICE" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Options (comma separated)
              </label>
              <Input
                {...register(`questions.${index}.options` as const)}
                placeholder="Option 1, Option 2, Option 3"
                onChange={(e) => {
                  const options = e.target.value
                    .split(",")
                    .map((opt) => opt.trim())
                    .filter((opt) => opt.length > 0);
                  setValue(`questions.${index}.options` as const, options);
                }}
              />
            </div>
          )}
        </div>
      ))}

      {questions.length < 5 && (
        <Button type="button" variant="outline" onClick={addQuestion} className="w-full">
          Add Question
        </Button>
      )}
    </div>
  );
};
