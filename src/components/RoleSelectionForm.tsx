"use client";

import { handleRoleSelection } from "@/app/onboarding/actions/handleRoleSelection.action";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";

// ... existing code ...

type RoleCardProps = {
  role: "USER" | "ADMIN";
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  disabled: boolean;
  onSelect: (role: "USER" | "ADMIN") => void;
};

function RoleCard({
  role,
  title,
  description,
  icon,
  isSelected,
  disabled,
  onSelect,
}: RoleCardProps) {
  return (
    <Button
      variant="outline"
      className={`relative group h-auto p-6 border-2 transition-all duration-200 hover:shadow-lg w-full
        ${
          isSelected
            ? "border-primary/80 bg-primary/5 shadow-primary/20"
            : "border-gray-200 hover:border-primary/30 hover:bg-gray-50/50"
        }`}
      disabled={disabled}
      onClick={() => onSelect(role)}
    >
      <div className="flex items-start gap-6 w-full">
        <div className="shrink-0 w-[60px] h-[60px] flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <div className="flex-1 text-left min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        {isSelected && (
          <div className="shrink-0 ml-4">
            <svg
              className="w-6 h-6 text-primary animate-in fade-in"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </div>
    </Button>
  );
}

export function RoleSelectionForm() {
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = (role: "USER" | "ADMIN") => {
    setSelectedRole(role);
    startTransition(async () => {
      await handleRoleSelection(role);
    });
  };

  const userIcon = (
    <svg
      className="w-8 h-8 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const adminIcon = (
    <svg
      className="w-8 h-8 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="space-y-8 p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Choose Your Journey
        </h2>

        <div className="grid gap-6">
          <RoleCard
            role="USER"
            title="Regular User"
            description="Access personal profile and basic features"
            icon={userIcon}
            isSelected={selectedRole === "USER"}
            disabled={isPending}
            onSelect={handleSubmit}
          />

          <RoleCard
            role="ADMIN"
            title="Business Owner"
            description="Create and manage surveys, access admin dashboard"
            icon={adminIcon}
            isSelected={selectedRole === "ADMIN"}
            disabled={isPending}
            onSelect={handleSubmit}
          />
        </div>

        {isPending && (
          <div className="mt-6 text-center text-primary animate-pulse">
            Processing your selection...
          </div>
        )}
      </div>
    </div>
  );
}
