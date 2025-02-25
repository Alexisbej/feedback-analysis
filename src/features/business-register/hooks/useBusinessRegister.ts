"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createBusinessAction } from "../actions/create-business.action";
import { BusinessRegisterFormValues, businessRegisterSchema } from "../types";

export function useBusinessRegister() {
  const form = useForm<BusinessRegisterFormValues>({
    resolver: zodResolver(businessRegisterSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmit = async (data: BusinessRegisterFormValues) => {
    try {
      await createBusinessAction(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      form.setError("root", {
        type: "manual",
        message: "Failed to create business. Please try again.",
      });
    }
  };

  return {
    form,
    onSubmit,
  };
}
