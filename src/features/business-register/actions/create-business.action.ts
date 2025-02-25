"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBusinessInDatabase } from "../services/business-register-service";
import { BusinessRegisterFormValues, businessRegisterSchema } from "../types";

export async function createBusinessAction(data: BusinessRegisterFormValues) {
  const validatedData = businessRegisterSchema.parse(data);

  const session = await auth();
  if (!session?.user) return redirect("/register");

  try {
    await createBusinessInDatabase(validatedData, session.user.id!);
  } catch (error) {
    console.error("Error in createBusinessAction:", error);
    throw new Error("Failed to create business");
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
