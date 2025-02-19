"use client";

import { Button } from "@/components/ui/button";
import { generateQRAction } from "@/features/campaign/actions/generate-qr.action";
import { QrCode } from "lucide-react";
import React from "react";

interface GenerateQRFormProps {
  templateId: string;
}

export const GenerateQRForm: React.FC<GenerateQRFormProps> = ({
  templateId,
}) => {
  return (
    <div className="text-center py-12">
      <form action={generateQRAction}>
        <input type="hidden" name="templateId" value={templateId} />
        <Button type="submit">
          <QrCode className="w-4 h-4 mr-2" />
          Generate QR Code
        </Button>
      </form>
    </div>
  );
};
