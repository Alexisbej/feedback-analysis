"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createTemplateAction } from "../actions/create-template.action";
import { CreateTemplateData, createTemplateSchema } from "../types";
import QuestionList from "./QuestionsList";
import { SurveyTypeSelector } from "./SurveyTypeSelector";

export const CreateCampaignForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateTemplateData>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      templateType: "feedback",
      name: "",
      questions: [
        {
          text: "",
          type: "TEXT",
          options: [],
        },
      ],
      tenantId,
    },
  });

  const templateType = form.watch("templateType");

  const handleTemplateTypeChange = (newType: "rating" | "feedback") => {
    form.reset({
      ...form.getValues(),
      templateType: newType,
      questions: [
        {
          text: "",
          type: newType === "rating" ? "RATING" : "TEXT",
          options: [],
        },
      ],
    });
  };

  async function onSubmit(data: CreateTemplateData) {
    try {
      setIsSubmitting(true);
      const result = await createTemplateAction(data);

      if (result.redirectUrl) {
        router.push(result.redirectUrl);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
          <SurveyTypeSelector
            value={templateType}
            onChange={handleTemplateTypeChange}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Survey Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter survey name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <QuestionList />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Survey"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
