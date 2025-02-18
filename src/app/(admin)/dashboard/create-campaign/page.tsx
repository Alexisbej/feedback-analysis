// app/dashboard/create-campaign/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createTemplateAction } from "./create-template.action";
import { createTemplateSchema } from "./create-template.schema";

type FormValues = {
  templateType: "rating" | "feedback";
  name: string;
  questions: {
    text: string;
    type: "TEXT" | "MULTIPLE_CHOICE" | "RATING";
    options?: string[];
  }[];
};

export default function CreateCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get("tenantId");

  const form = useForm<FormValues>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
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

  const templateType = form.watch("templateType");
  const questions = form.watch("questions");

  const addQuestion = () => {
    if (questions.length < 5) {
      form.setValue("questions", [
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
    form.setValue(
      "questions",
      questions.filter((_, i) => i !== index),
    );
  };

  const handleSubmit = async (data: FormValues) => {
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
    };

    await createTemplateAction(formattedData, tenantId);
    router.push(`/dashboard?businessId=${tenantId}`);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Survey</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Template Type Selection */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">Survey Type</label>
            <RadioGroup
              value={templateType}
              onValueChange={(value) => {
                const newType = value as "rating" | "feedback";
                form.reset();
                form.setValue("templateType", newType);
                form.setValue("questions", [
                  {
                    text: "",
                    type: newType === "rating" ? "RATING" : "TEXT",
                    options: [],
                  },
                ]);
              }}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rating" id="rating" />
                <label htmlFor="rating">Rating Survey (1-5 stars)</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="feedback" id="feedback" />
                <label htmlFor="feedback">Feedback Survey</label>
              </div>
            </RadioGroup>
          </div>

          {/* Survey Name */}
          <div className="space-y-4">
            <Input
              {...form.register("name")}
              placeholder="Survey Name"
              className="w-full"
            />
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {questions.map((question, index) => (
              <div key={index} className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Question {index + 1}</h3>
                  {questions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>

                {/* Question Text */}
                <Input
                  {...form.register(`questions.${index}.text`)}
                  placeholder="Enter your question"
                />

                {/* Question Type (Only for feedback template) */}
                {templateType === "feedback" && (
                  <Select
                    value={question.type}
                    onValueChange={(value) =>
                      form.setValue(
                        `questions.${index}.type`,
                        value as "TEXT" | "MULTIPLE_CHOICE",
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TEXT">Text Answer</SelectItem>
                      <SelectItem value="MULTIPLE_CHOICE">
                        Multiple Choice
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {/* QCM Options */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Options (comma separated)
                    </label>
                    <Input
                      {...form.register(`questions.${index}.options`)}
                      placeholder="Option 1, Option 2, Option 3"
                      onChange={(e) => {
                        const options = e.target.value
                          .split(",")
                          .map((opt) => opt.trim())
                          .filter((opt) => opt.length > 0);
                        form.setValue(`questions.${index}.options`, options);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Add Question Button */}
            {questions.length < 5 && (
              <Button
                type="button"
                variant="outline"
                onClick={addQuestion}
                className="w-full"
              >
                Add Question
              </Button>
            )}
          </div>

          <Button type="submit" className="w-full">
            Create Survey
          </Button>
        </form>
      </Form>
    </div>
  );
}
