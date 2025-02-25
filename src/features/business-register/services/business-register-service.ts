import { prisma } from "../../../../prisma/prisma";
import { BusinessRegisterFormValues } from "../types";

export async function createBusinessInDatabase(
  data: BusinessRegisterFormValues,
  userId: string,
) {
  try {
    const { name, slug } = data;

    const tenant = await prisma.tenant.create({
      data: {
        name,
        slug,
        owner: {
          connect: { id: userId },
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
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    return tenant;
  } catch (error) {
    console.error("Error creating business:", error);
    throw new Error("Something went wrong while creating the business");
  }
}
