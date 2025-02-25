import { auth } from "@/auth";
import { RoleSelectionForm } from "@/components/RoleSelectionForm";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth();

  if (session?.user?.onboardingCompleted) {
    redirect(session.user.role === "ADMIN" ? "/dashboard" : "/profile");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full px-6">
        <RoleSelectionForm />
      </div>
    </div>
  );
}
