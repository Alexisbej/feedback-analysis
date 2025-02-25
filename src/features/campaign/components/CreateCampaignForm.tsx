"use client";

import { useCreateCampaignForm } from "../hooks/useCreateCampaignForm";
import { QuestionsList } from "./QuestionsList";
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
    <div className="bg-white rounded-xl shadow-sm">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <SurveyTypeSelector
          value={templateType}
          onChange={handleTemplateTypeChange}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Survey Name
          </label>
          <input
            type="text"
            placeholder="Enter survey name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <QuestionsList
          questions={questions}
          templateType={templateType}
          register={form.register}
          setValue={form.setValue}
          removeQuestion={removeQuestion}
          addQuestion={addQuestion}
        />
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Survey
        </button>
      </form>
    </div>
  );
};
