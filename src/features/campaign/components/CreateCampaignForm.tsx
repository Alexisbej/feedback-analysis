"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCreateCampaignForm } from "../hooks/useCreateCampaignForm";
import { QuestionsList } from "./QuestionsList";
import { SurveyNameInput } from "./SurveyNameInput";
import { SurveyTypeSelector } from "./SurveyTypeSelector";

export const CreateCampaignForm = () => {
  const {
    form,
    templateType,
    questions,
    addQuestion,
    removeQuestion,
    onSubmit,
    handleTemplateTypeChange,
  } = useCreateCampaignForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SurveyTypeSelector
          value={templateType}
          onChange={handleTemplateTypeChange}
        />
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
