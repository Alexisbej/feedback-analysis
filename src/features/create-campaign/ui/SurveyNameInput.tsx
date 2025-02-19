import { Input } from "@/components/ui/input";
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormValues } from "../hooks/useCreateCampaignForm";

type SurveyNameInputProps = {
  register: UseFormRegister<FormValues>;
};

export const SurveyNameInput: FC<SurveyNameInputProps> = ({ register }) => {
  return (
    <div className="space-y-4">
      <Input {...register("name")} placeholder="Survey Name" className="w-full" />
    </div>
  );
};
