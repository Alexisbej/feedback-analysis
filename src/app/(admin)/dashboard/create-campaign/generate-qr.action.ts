"use server";

import QRCode from "qrcode";
import { prisma } from "../../../../../prisma/prisma";

export async function generateQRAction(formData: FormData) {
  const templateId = formData.get("templateId")?.toString();
  if (!templateId) throw new Error("Missing templateId");

  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: { tenant: true },
  });

  if (!template) throw new Error("Template not found");

  const url = `${process.env.BASE_URL}/feedback/${template.tenant.slug}/${templateId}`;
  const qrCode = await QRCode.toDataURL(url);

  prisma.feedbackLink.create({
    data: {
      templateId,
      url,
      qrCodeImage: qrCode,
    },
  });
}
