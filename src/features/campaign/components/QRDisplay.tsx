import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface QRDisplayProps {
  qrCodeImage: string;
  templateName: string;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({
  qrCodeImage,
  templateName,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">QR Code</h2>
      <div className="border rounded-lg p-4 bg-white">
        {qrCodeImage && (
          <Image
            src={qrCodeImage}
            width={300}
            height={300}
            alt="QR Code"
            className="mx-auto"
          />
        )}
        <div className="flex gap-2 mt-4">
          <Button variant="outline" asChild>
            <Link
              href={qrCodeImage || ""}
              download={`${templateName}-qrcode.png`}
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a
              href={qrCodeImage?.replace("image/png", "image/svg+xml")}
              download={`${templateName}-qrcode.svg`}
            >
              <Download className="w-4 h-4 mr-2" />
              SVG
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
