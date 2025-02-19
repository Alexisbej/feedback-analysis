"use client";

import React from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type BusinessRegisterFormProps = {
  action: (formData: FormData) => Promise<void>;
  showReturnLink?: boolean;
};

export const BusinessRegisterForm: React.FC<BusinessRegisterFormProps> = ({
  action,
  showReturnLink = false,
}) => {
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
          <form action={action} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Business Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Acme Inc."
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="slug"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Business URL
                </label>
                <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                  <span className="text-sm text-muted-foreground">
                    feedbackpro.com/
                  </span>
                  <Input
                    id="slug"
                    name="slug"
                    required
                    placeholder="acme"
                    pattern="^[a-z0-9-]+$"
                    title="Only lowercase letters, numbers, and hyphens are allowed"
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  This will be your unique URL for collecting feedback
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <RainbowButton className="w-full" type="submit">
                Create Business
              </RainbowButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
