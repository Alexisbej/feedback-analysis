import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";

type SurveyTypeSelectorProps = {
  value: "rating" | "feedback";
  onChange: (value: "rating" | "feedback") => void;
};

export const SurveyTypeSelector: FC<SurveyTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">Survey Type</label>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as "rating" | "feedback")}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rating" id="rating" />
          <label htmlFor="rating">Rating Survey (1-5 stars)</label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="feedback" id="feedback" />
          <label htmlFor="feedback">Feedback Survey</label>
        </div>
      </RadioGroup>
    </div>
  );
};
