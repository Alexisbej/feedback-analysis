import { getCampaignTemplate } from "@/features/campaign/campaignService";
import { CampaignHeader } from "@/features/campaign/components/CampaignHeader";
import { GenerateQRForm } from "@/features/campaign/components/GenerateQRForm";
import { QRDisplay } from "@/features/campaign/components/QRDisplay";
import { QRSettingsForm } from "@/features/campaign/components/QRSettingsForm";

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const { templateId } = await params;
  const template = await getCampaignTemplate(templateId);

  if (!template) return <div>Template not found</div>;

  const qrLink = template.feedbackLinks && template.feedbackLinks[0];

  return (
    <div className="p-8 mx-auto">
      <CampaignHeader
        templateName={template.name}
        tenantId={template.tenantId}
        feedbackUrl={qrLink?.url}
      />

      {qrLink ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
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
        <GenerateQRForm templateId={template.id} />
      )}
    </div>
  );
}
