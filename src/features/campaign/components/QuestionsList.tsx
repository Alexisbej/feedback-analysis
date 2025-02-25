import { MinusCircle, PlusCircle, Star } from "lucide-react";
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
  removeQuestion,
  addQuestion,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Survey Questions</h2>
        <span className="text-sm text-gray-500">
          {questions.length}/5 questions
        </span>
      </div>

      {questions.map((question, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              Question {index + 1}
              {templateType === "rating" && (
                <Star className="w-4 h-4 text-yellow-400" />
              )}
            </h3>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <MinusCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter your question"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />

          {templateType === "feedback" && (
            <div className="space-y-4">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={question.type}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].type = e.target.value as
                    | "TEXT"
                    | "MULTIPLE_CHOICE";
                }}
              >
                <option value="TEXT">Text Answer</option>
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
              </select>

              {question.type === "MULTIPLE_CHOICE" && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Options (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {questions.length < 5 && (
        <button
          type="button"
          onClick={addQuestion}
          className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Add Question
        </button>
      )}
    </div>
  );
};
