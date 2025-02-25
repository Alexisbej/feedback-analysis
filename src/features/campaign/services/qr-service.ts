import { revalidatePath } from "next/cache";
import QRCode from "qrcode";
import { prisma } from "../../../../prisma/prisma";
import { QRSettings } from "../types";

export async function generateQRCode(templateId: string) {
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: { tenant: true },
  });

  if (!template) throw new Error("Template not found");

  const url = `${process.env.BASE_URL}/feedback/${template.tenant.slug}/${templateId}`;
  const qrCode = await QRCode.toDataURL(url);

  await prisma.feedbackLink.create({
    data: {
      templateId,
      url,
      qrCodeImage: qrCode,
      isActive: true,
    },
  });

  revalidatePath(`/dashboard/campaigns/${templateId}`);
}

export async function updateQRCodeSettings(settings: QRSettings) {
  const { linkId, ...updateData } = settings;

  return prisma.feedbackLink.update({
    where: { id: linkId },
    data: updateData,
  });
}
