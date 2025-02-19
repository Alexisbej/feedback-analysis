"use client";

import { useCreateCampaignForm } from "@/features/create-campaign/hooks/useCreateCampaignForm";
import { CreateCampaignForm } from "@/features/create-campaign/ui/CreateCampaignForm";

export default function CreateCampaignPage() {
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
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Survey</h1>
      <CreateCampaignForm
        form={form}
        templateType={templateType}
        questions={questions}
        addQuestion={addQuestion}
        removeQuestion={removeQuestion}
        onSubmit={onSubmit}
        handleTemplateTypeChange={handleTemplateTypeChange}
      />
    </div>
  );
}
