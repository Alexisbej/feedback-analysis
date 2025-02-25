"use client";
import { ChevronRight, MessageSquare, Send, Star } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { useFeedbackForm } from "../hooks/useFeedbackForm";
import { Question } from "../types";
import QuestionItem from "./QuestionItem";

interface FeedbackFormProps {
  questions: Question[];
  tenantId: string;
}

export default function FeedbackForm({
  questions,
  tenantId,
}: FeedbackFormProps) {
  const { form, responses, handleResponseChange, onSubmit } =
    useFeedbackForm(tenantId);

  return (
    <div>
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Feedback</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">Customer Survey</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Share Your Experience
          </h1>
          <p className="mt-2 text-gray-600">
            Your feedback helps us improve our services and better serve you.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    {question.type === "RATING" && (
                      <Star className="w-5 h-5 text-yellow-400 mt-1" />
                    )}
                    {question.type === "TEXT" && (
                      <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                    )}
                    <QuestionItem
                      question={question}
                      response={responses[question.id]}
                      onChange={(value) =>
                        handleResponseChange(question.id, value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
