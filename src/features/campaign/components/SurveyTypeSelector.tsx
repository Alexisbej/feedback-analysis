import { MessageSquare, Star } from "lucide-react";
import { FC } from "react";

type SurveyTypeSelectorProps = {
  value: "rating" | "feedback";
  onChange: (value: "rating" | "feedback") => void;
};

export const SurveyTypeSelector: FC<SurveyTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Survey Type
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange("rating")}
          className={`p-4 border rounded-lg flex items-center ${
            value === "rating"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Star
            className={`w-5 h-5 ${
              value === "rating" ? "text-blue-500" : "text-gray-400"
            } mr-3`}
          />
          <div className="text-left">
            <div className="font-medium">Rating Survey</div>
            <div className="text-sm text-gray-500">
              Collect star ratings (1-5)
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("feedback")}
          className={`p-4 border rounded-lg flex items-center ${
            value === "feedback"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <MessageSquare
            className={`w-5 h-5 ${
              value === "feedback" ? "text-blue-500" : "text-gray-400"
            } mr-3`}
          />
          <div className="text-left">
            <div className="font-medium">Feedback Survey</div>
            <div className="text-sm text-gray-500">
              Collect detailed feedback
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
