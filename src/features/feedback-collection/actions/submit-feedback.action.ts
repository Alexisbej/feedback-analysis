"use server"

import { auth } from "@/auth";
import { prisma } from "../../../../prisma/prisma";
import type { FeedbackFormValues } from "../hooks/useFeedbackForm";

export async function submitFeedbackAction(
  data: FeedbackFormValues,
  tenantId: string,
) {
  const { responses } = data;

  const session = await auth();
  const userId = session?.user?.id;

  const feedback = await prisma.feedback.create({
    data: {
      tenantId,
      userId,
      content: "",
      answers: {
        create: Object.entries(responses).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      },
    },
  });

  return feedback;
}
