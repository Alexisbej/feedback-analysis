"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { submitFeedbackAction } from "../actions/submit-feedback.action";
import { feedbackSubmitSchema } from "../schemas/feedback-submit.schema";
import { ResponseValue } from "../components/QuestionItem"; 

export type FeedbackFormValues = {
  responses: Record<string, ResponseValue>;
};

export function useFeedbackForm(tenantId: string) {
  const router = useRouter();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSubmitSchema),
    defaultValues: {
      responses: {},
    },
  });

  const { watch, setValue } = form;
  const responses = watch("responses");

  const handleResponseChange = (id: string, value: ResponseValue) => {
    setValue(`responses.${id}`, value);
  };

  const onSubmit = async (data: FeedbackFormValues) => {
    if (!tenantId) return;
    await submitFeedbackAction(data, tenantId);
    router.push(`/feedback/thank-you?tenantId=${tenantId}`);
  };

  return {
    form,
    responses,
    handleResponseChange,
    onSubmit,
  };
}
