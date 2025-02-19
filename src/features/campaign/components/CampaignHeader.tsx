import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface CampaignHeaderProps {
  templateName: string;
  tenantId: string;
  feedbackUrl?: string;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  templateName,
  tenantId,
  feedbackUrl,
}) => {
  return (
    <div>
      <Button asChild>
        <Link href={`/dashboard?businessId=${tenantId}`}>
          ← Back to Dashboard
        </Link>
      </Button>
      <div className="flex justify-between items-start my-8">
        <div>
          <h1 className="text-4xl font-bold">{templateName}</h1>
          {feedbackUrl && (
            <p className="text-muted-foreground">
              Feedback URL:{" "}
              <Link className="underline text-blue-500" href={feedbackUrl}>
                {feedbackUrl}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
