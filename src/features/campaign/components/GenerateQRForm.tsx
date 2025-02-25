"use client";

import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import React from "react";

interface GenerateQRFormProps {
  templateId: string;
  action: (formData: FormData) => Promise<void>;
}

export const GenerateQRForm: React.FC<GenerateQRFormProps> = ({
  templateId,
  action,
}) => {
  return (
    <div className="text-center py-12">
      <form action={action}>
        <input type="hidden" name="templateId" value={templateId} />
        <Button type="submit">
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </form>
    </div>
  );
};
