import { Question, QuestionType } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface QuestionsFieldProps {
  questions: Question[];
  onChange: (questions: Omit<Question, "id" | "templateId">[]) => void;
}

export function QuestionFields({ questions, onChange }: QuestionsFieldProps) {
  const addQuestion = () => {
    onChange([...questions, { question: "", type: "TEXT", options: [] }]);
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: QuestionType,
  ) => {
    const newQuestions = [...questions];
    if (field === "type") {
      newQuestions[index].type = value;
      if (value !== "MULTIPLE_CHOICE") {
        newQuestions[index].options = [];
      }
    } else {
      newQuestions[index].question = value;
    }
    onChange(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    onChange(newQuestions);
  };

  const updateOption = (qIndex: number, aIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[aIndex] = value;
    onChange(newQuestions);
  };

  return (
    <div>
      <h3 className="text-lg font-medium">Questions</h3>
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 rounded mt-4">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Question
            </label>
            <Input
              value={q.question}
              onChange={(e) =>
                updateQuestion(
                  qIndex,
                  "question",
                  e.target.value as QuestionType,
                )
              }
              placeholder="Enter your question"
              className="mt-1 w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Type
            </label>
            <select
              value={q.type}
              onChange={(e) =>
                updateQuestion(
                  qIndex,
                  "type",
                  e.target.value as Question["type"],
                )
              }
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="TEXT">Text</option>
              <option value="RATING">Rating</option>
              <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            </select>
          </div>
          {q.type === "MULTIPLE_CHOICE" && (
            <div className="ml-4">
              <h4 className="text-md font-medium">Options</h4>
              {q.options.map((option, aIndex) => (
                <div key={aIndex} className="flex items-center mt-2">
                  <Input
                    value={option}
                    onChange={(e) =>
                      updateOption(qIndex, aIndex, e.target.value)
                    }
                    placeholder="Enter an option"
                    className="mr-2"
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addOption(qIndex)}
                className="mt-2"
              >
                Add Option
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={addQuestion} className="mt-4">
        Add a New Question
      </Button>
    </div>
  );
}
