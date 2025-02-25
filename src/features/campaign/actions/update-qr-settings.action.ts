"use server";

import { updateQRCodeSettings } from "../services/qr-service";
import { qrSettingsSchema } from "../types";

export async function updateQRSettingsAction(formData: FormData) {
  const linkId = formData.get("linkId")?.toString() || "";
  const expiration = formData.get("expiration")?.toString();
  const usageLimit = formData.get("usageLimit")?.toString();
  const isActiveStr = formData.get("isActive");

  const settings = {
    linkId,
    expiration: expiration ? new Date(expiration) : null,
    usageLimit: usageLimit ? parseInt(usageLimit) : null,
    isActive: isActiveStr === "on" || isActiveStr === "true",
  };

  const validatedSettings = qrSettingsSchema.parse(settings);

  return updateQRCodeSettings(validatedSettings);
}
