"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Hash, ToggleLeft } from "lucide-react";
import React from "react";

interface QRSettingsFormProps {
  qrLinkId: string;
  expiration?: Date | null;
  usageLimit?: number | null;
  isActive: boolean;
  action: (formData: FormData) => Promise<void>;
}

export const QRSettingsForm: React.FC<QRSettingsFormProps> = ({
  qrLinkId,
  expiration,
  usageLimit,
  isActive,
  action,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">QR Code Settings</h2>

      <form action={action} className="space-y-6">
        <input type="hidden" name="linkId" value={qrLinkId} />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Expiration Date
            </label>
            <input
              type="datetime-local"
              name="expiration"
              defaultValue={
                expiration ? expiration.toISOString().slice(0, 16) : ""
              }
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className=" text-sm font-medium text-gray-700 flex items-center gap-2">
              <Hash className="w-4 h-4 text-gray-500" />
              Usage Limit
            </label>
            <input
              type="number"
              name="usageLimit"
              defaultValue={
                usageLimit !== null && usageLimit !== undefined
                  ? usageLimit.toString()
                  : ""
              }
              min="1"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 py-2">
            <ToggleLeft className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Active Status
            </label>
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={isActive}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
