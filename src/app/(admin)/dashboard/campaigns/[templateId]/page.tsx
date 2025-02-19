import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Download, QrCode } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "../../../../../../prisma/prisma";
import { generateQRAction } from "@/features/create-campaign/actions/generate-qr.action";


export default async function CampaignPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const templateId = (await params).templateId;
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: {
      tenant: true,
      feedbackLinks: true,
    },
  });

  if (!template) return <div>Template not found</div>;

  const qrLink = template.feedbackLinks?.[0];

  return (
    <div className="p-8  mx-auto">
      <Button asChild>
        <Link href={`/dashboard?businessId=${template.tenantId}`}>
          ← Back to Dashboard
        </Link>
      </Button>
      <div className="flex justify-between items-start my-8">
        <div>
          <h1 className="text-4xl font-bold">{template.name}</h1>
          <p className="text-muted-foreground">
            Feedback URL:{" "}
            <Link className="underline text-blue-500" href={qrLink?.url}>
              {qrLink?.url}
            </Link>
          </p>
        </div>
      </div>

      {qrLink ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {/* QR Code Display */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">QR Code</h2>
            <div className="border rounded-lg p-4 bg-white">
              {qrLink.qrCodeImage && (
                <Image
                  src={qrLink.qrCodeImage}
                  width={300}
                  height={300}
                  alt="QR Code"
                  className="mx-auto"
                />
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" asChild>
                  <Link
                    href={qrLink.qrCodeImage || ""}
                    download={`${template.name}-qrcode.png`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    PNG
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={qrLink.qrCodeImage?.replace(
                      "image/png",
                      "image/svg+xml",
                    )}
                    download={`${template.name}-qrcode.svg`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    SVG
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* QR Settings Form */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">QR Code Settings</h2>
            <form>
              <input type="hidden" name="linkId" value={qrLink.id} />

              <div className="space-y-4">
                <div className="space-y-2">
                  <label>Expiration Date</label>
                  <Input
                    type="datetime-local"
                    name="expiration"
                    defaultValue={
                      qrLink.expiration
                        ? qrLink.expiration.toISOString().slice(0, 16)
                        : ""
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label>Usage Limit</label>
                  <Input
                    type="number"
                    name="usageLimit"
                    defaultValue={
                      qrLink.usageLimit !== null &&
                      qrLink.usageLimit !== undefined
                        ? qrLink.usageLimit.toString()
                        : ""
                    }
                    min="1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={qrLink.isActive}
                    className="h-4 w-4"
                  />
                  <label>Active</label>
                </div>

                <Button type="submit">Save Settings</Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <form action={generateQRAction}>
            <input type="hidden" name="templateId" value={templateId} />
            <Button type="submit">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
