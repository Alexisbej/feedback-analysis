"use server";

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";

export async function handleRoleSelection(role: "USER" | "ADMIN") {
  const session = await auth();

  if (!session?.user) return redirect("/login");
  if (role === "USER") {
    if (session.user.inviteToken) {
      redirect("/survey");
    } else {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { onboardingCompleted: true },
      });
      redirect("/profile");
    }
  } else if (role === "ADMIN") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "ADMIN", onboardingCompleted: true },
    });
    redirect("/business/register");
  }
}
