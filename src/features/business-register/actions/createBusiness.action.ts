import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";
import { revalidatePath } from "next/cache";


export async function createBusiness(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user) return redirect("/register");

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  try {
    await prisma.tenant.create({
      data: {
        name,
        slug,
        owner: {
          connect: { id: session.user.id },
        },
        settings: {
          create: {
            brandColor: "#2563eb",
            locale: "en",
          },
        },
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });

    revalidatePath("/dashboard")
    return redirect("/dashboard");
  } catch (error) {
    console.error("Error creating business:", error);
    throw new Error("Something went wrong while creating the business");
  }
}
