"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import { createTemplateAction } from "../actions/create-template.action";
import { createTemplateSchema } from "../types";

export type FormValues = {
  tenantId: string;
  templateType: "rating" | "feedback";
  name: string;
  questions: {
    text: string;
    type: "TEXT" | "MULTIPLE_CHOICE" | "RATING";
    options?: string[];
  }[];
};

export const useCreateCampaignForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  const form = useForm<FormValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      tenantId: tenantId || "",
      templateType: "rating",
      name: "",
      questions: [
        {
          text: "",
          type: "RATING",
          options: [],
        },
      ],
    },
  });

  const { watch, setValue, reset } = form;
  const templateType = watch("templateType");
  const questions = watch("questions");

  const addQuestion = () => {
    if (questions.length < 5) {
      setValue("questions", [
        ...questions,
        {
          text: "",
          type: templateType === "rating" ? "RATING" : "TEXT",
          options: [],
        },
      ]);
    }
  };

  const removeQuestion = (index: number) => {
    setValue(
      "questions",
      questions.filter((_, i) => i !== index),
    );
  };

  const handleTemplateTypeChange = (newType: "rating" | "feedback") => {
    reset();
    setValue("templateType", newType);
    setValue("questions", [
      {
        text: "",
        type: newType === "rating" ? "RATING" : "TEXT",
        options: [],
      },
    ]);
  };

  const onSubmit = async (data: FormValues) => {
    if (!tenantId) return;
    const formattedData = {
      ...data,
      questions: data.questions.map((question) => ({
        ...question,
        options:
          question.type === "MULTIPLE_CHOICE"
            ? question.options || ["Option 1", "Option 2", "Option 3"]
            : [],
      })),
      tenantId,
    };

    const { redirectUrl } = await createTemplateAction(formattedData);
    router.push(redirectUrl);
  };

  return {
    form,
    templateType,
    questions,
    addQuestion,
    removeQuestion,
    onSubmit,
    handleTemplateTypeChange,
  };
};
