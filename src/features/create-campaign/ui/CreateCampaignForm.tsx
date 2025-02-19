import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { SurveyTypeSelector } from "./SurveyTypeSelector";
import { SurveyNameInput } from "./SurveyNameInput";
import { QuestionsList } from "./QuestionsList";
import { FormValues, useCreateCampaignForm } from "../hooks/useCreateCampaignForm";

type CreateCampaignFormProps = {
  form: ReturnType<typeof useCreateCampaignForm>["form"];
  templateType: "rating" | "feedback";
  questions: FormValues["questions"];
  addQuestion: () => void;
  removeQuestion: (index: number) => void;
  onSubmit: (data: FormValues) => void;
  handleTemplateTypeChange: (value: "rating" | "feedback") => void;
};

export const CreateCampaignForm: FC<CreateCampaignFormProps> = ({
  form,
  templateType,
  questions,
  addQuestion,
  removeQuestion,
  onSubmit,
  handleTemplateTypeChange,
}) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SurveyTypeSelector value={templateType} onChange={handleTemplateTypeChange} />
        <SurveyNameInput register={form.register} />
        <QuestionsList
          questions={questions}
          templateType={templateType}
          register={form.register}
          setValue={form.setValue}
          removeQuestion={removeQuestion}
          addQuestion={addQuestion}
        />
        <Button type="submit" className="w-full">
          Create Survey
        </Button>
      </form>
    </Form>
  );
};
