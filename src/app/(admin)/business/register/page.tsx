import { auth } from "@/auth";
import { createBusiness } from "@/features/business-register/actions/createBusiness.action";
import { BusinessRegisterForm } from "@/features/business-register/components/BusinessRegisterForm";
import { redirect } from "next/navigation";

export default async function BusinessRegisterPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") return redirect("/profile");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <BusinessRegisterForm
        action={createBusiness}
        showReturnLink={session?.user?.onboardingCompleted}
      />
    </div>
  );
}
