import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface QRSettingsFormProps {
  qrLinkId: string;
  expiration?: Date | null;
  usageLimit?: number | null;
  isActive: boolean;
}

export const QRSettingsForm: React.FC<QRSettingsFormProps> = ({
  qrLinkId,
  expiration,
  usageLimit,
  isActive,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">QR Code Settings</h2>
      <form>
        <input type="hidden" name="linkId" value={qrLinkId} />

        <div className="space-y-4">
          <div className="space-y-2">
            <label>Expiration Date</label>
            <Input
              type="datetime-local"
              name="expiration"
              defaultValue={
                expiration ? expiration.toISOString().slice(0, 16) : ""
              }
            />
          </div>

          <div className="space-y-2">
            <label>Usage Limit</label>
            <Input
              type="number"
              name="usageLimit"
              defaultValue={
                usageLimit !== null && usageLimit !== undefined
                  ? usageLimit.toString()
                  : ""
              }
              min="1"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={isActive}
              className="h-4 w-4"
            />
            <label>Active</label>
          </div>

          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    </div>
  );
};
