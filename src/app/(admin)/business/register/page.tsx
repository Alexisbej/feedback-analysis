// app/business/register/page.tsx
import { auth } from "@/auth";
import { createBusiness } from "@/features/business-register/actions/createBusiness.action";
import { BusinessRegisterForm } from "@/features/business-register/components/BusinessRegisterForm";
import { BusinessRegisterLayout } from "@/features/business-register/components/BusinessRegisterLayout";
import { redirect } from "next/navigation";

export default async function BusinessRegisterPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") return redirect("/profile");

  return (
    <BusinessRegisterLayout>
      <BusinessRegisterForm
        action={createBusiness}
        showReturnLink={session?.user?.onboardingCompleted}
      />
    </BusinessRegisterLayout>
  );
}
