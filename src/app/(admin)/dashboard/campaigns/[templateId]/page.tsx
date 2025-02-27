import { generateQRAction } from "@/features/campaign/actions/generate-qr.action";
import { DeleteCampaignButton } from "@/features/campaign/components/DeleteCampaignButton";

import { QRDisplay } from "@/features/campaign/components/QRDisplay";
import { getCampaignTemplate } from "@/features/campaign/services/template-service";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Hash,
  QrCode,
  ToggleLeft as Toggle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface CampaignPageProps {
  params: Promise<{ templateId: string }>;
}

async function CampaignPage({ params }: CampaignPageProps) {
  const { templateId } = await params;
  const template = await getCampaignTemplate(templateId);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Template not found
          </h2>
          <p className="mt-2 text-gray-600">
            The requested template could not be found.
          </p>
        </div>
      </div>
    );
  }

  const qrLink = template.feedbackLinks && template.feedbackLinks[0];

  return (
    <div className="min-h-screen md:w-[85vw]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CampaignHeader
          templateName={template.name}
          tenantId={template.tenantId}
          feedbackUrl={qrLink?.url}
        />
        <DeleteCampaignButton
          templateId={template.id}
          templateName={template.name}
        />

        {qrLink ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <QRDisplay
              qrCodeImage={qrLink.qrCodeImage!}
              templateName={template.name}
            />
            <QRSettingsForm
              qrLinkId={qrLink.id}
              expiration={qrLink.expiration || null}
              usageLimit={qrLink.usageLimit || null}
              isActive={qrLink.isActive}
            />
          </div>
        ) : (
          <GenerateQRForm templateId={template.id} action={generateQRAction} />
        )}
      </div>
    </div>
  );
}

interface CampaignHeaderProps {
  templateName: string;
  tenantId: string;
  feedbackUrl?: string;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  templateName,
  tenantId,
  feedbackUrl,
}) => {
  return (
    <div className="space-y-6">
      <Link
        href={`/dashboard?businessId=${tenantId}`}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">{templateName}</h1>
        {feedbackUrl && (
          <div className="mt-2 flex items-center text-gray-600">
            <span className="mr-2">Feedback URL:</span>
            <Link
              href={feedbackUrl}
              className="text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              {feedbackUrl}
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

interface QRSettingsFormProps {
  qrLinkId: string;
  expiration?: Date | null;
  usageLimit?: number | null;
  isActive: boolean;
}

const QRSettingsForm: React.FC<QRSettingsFormProps> = ({
  qrLinkId,
  expiration,
  usageLimit,
  isActive,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">QR Code Settings</h2>

      <form className="space-y-6">
        <input type="hidden" name="linkId" value={qrLinkId} />

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
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
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
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
            <Toggle className="w-4 h-4 text-gray-500" />
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

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

interface GenerateQRFormProps {
  templateId: string;
  action: (formData: FormData) => Promise<void>;
}

const GenerateQRForm: React.FC<GenerateQRFormProps> = ({
  templateId,
  action,
}) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8">
        <QrCode className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Generate QR Code
        </h2>
        <p className="text-gray-600 mb-6">
          Create a QR code for easy access to your feedback form
        </p>

        <form action={action}>
          <input type="hidden" name="templateId" value={templateId} />
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Generate QR Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignPage;
