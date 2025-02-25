"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { FormProvider } from "react-hook-form";
import { useBusinessRegister } from "../hooks/useBusinessRegister";

type BusinessRegisterFormProps = {
  showReturnLink?: boolean;
};

export const BusinessRegisterForm: React.FC<BusinessRegisterFormProps> = ({
  showReturnLink = false,
}) => {
  const { form, onSubmit } = useBusinessRegister();

  return (
    <div className="w-full px-6 py-8 max-w-2xl">
      {showReturnLink && (
        <div className="text-center mb-4">
          <a
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            <span>←</span> Return to dashboard
          </a>
        </div>
      )}
      <div className="text-center mb-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
          Set Up Your Business
        </h1>
        <p className="text-muted-foreground text-lg">
          Create your business profile and start collecting valuable feedback
        </p>
      </div>

      <Card className="w-full backdrop-blur-xl bg-white/80 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Business Details</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Acme Inc."
                            className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel>Business URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                            <span className="text-sm text-muted-foreground">
                              feedbackpro.com/
                            </span>
                            <Input
                              {...field}
                              placeholder="acme"
                              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </FormControl>
                        <p className="text-sm text-muted-foreground mt-1">
                          This will be your unique URL for collecting feedback
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <RainbowButton
                    className="w-full"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Creating..."
                      : "Create Business"}
                  </RainbowButton>
                  {form.formState.errors.root && (
                    <p className="text-sm text-red-500 text-center">
                      {form.formState.errors.root.message}
                    </p>
                  )}
                </div>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};
