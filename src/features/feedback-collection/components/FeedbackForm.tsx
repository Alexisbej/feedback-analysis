"use client";

import { Button } from "@/components/ui/button";
import { useFeedbackForm } from "../hooks/useFeedbackForm";
import QuestionItem, { Question } from "./QuestionItem";

export interface FeedbackFormProps {
  questions: Question[];
}

export default function FeedbackForm({ questions }: FeedbackFormProps) {
  const tenantId = questions[0].tenantId;
  const { form, responses, handleResponseChange, onSubmit } = useFeedbackForm(tenantId);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {questions.map((q) => (
        <QuestionItem
          key={q.id}
          question={q}
          response={responses[q.id]}
          onChange={(value) => handleResponseChange(q.id, value)}
        />
      ))}
      <Button className="w-full">Submit Feedback</Button>
    </form>
  );
}
