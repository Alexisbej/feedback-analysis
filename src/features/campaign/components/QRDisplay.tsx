"use client";
import { Download, QrCode } from "lucide-react";
import Image from "next/image";

interface QRDisplayProps {
  qrCodeImage: string;
  templateName: string;
}

export const QRDisplay: React.FC<QRDisplayProps> = ({ qrCodeImage }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        <QrCode className="w-5 h-5 text-blue-600" />
        QR Code Preview
      </h2>

      <div className="flex flex-col items-center p-6 border border-gray-200 rounded-lg bg-gray-50">
        {qrCodeImage && (
          <Image
            src={qrCodeImage}
            width={300}
            height={300}
            alt="QR Code"
            className="rounded-lg shadow-sm"
          />
        )}
      </div>

      <div className="flex gap-3 justify-center pt-4">
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => window.open(qrCodeImage, "_blank")}
        >
          <Download className="w-4 h-4 mr-2" />
          Download PNG
        </button>
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() =>
            window.open(
              qrCodeImage?.replace("image/png", "image/svg+xml"),
              "_blank",
            )
          }
        >
          <Download className="w-4 h-4 mr-2" />
          Download SVG
        </button>
      </div>
    </div>
  );
};
