"use server";

import { prisma } from "../../../../../prisma/prisma";

export async function updateQRSettings(
  linkId: string,
  settings: {
    expiration?: Date;
    usageLimit?: number;
    isActive?: boolean;
  },
) {
  return prisma.feedbackLink.update({
    where: { id: linkId },
    data: {
      expiration: settings.expiration,
      usageLimit: settings.usageLimit,
      isActive: settings.isActive,
    },
  });
}
