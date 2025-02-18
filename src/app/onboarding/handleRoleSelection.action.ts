"use server";

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { prisma } from "../../../prisma/prisma";

export async function handleRoleSelection(role: "USER" | "ADMIN") {
  const session = await auth();

  if (!session?.user) return redirect("/login");
  if (role === "USER") {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { onboardingCompleted: true },
      });
      redirect("/profile");
  }
   if (role === "ADMIN") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "ADMIN" },
    });
    redirect("/business/register");
  }
}
