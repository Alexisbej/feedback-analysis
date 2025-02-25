import { Button } from "@/components/ui/button";
import Link from "next/link";

interface DashboardEmptyStateProps {
  businessId: string;
}

export function DashboardEmptyState({ businessId }: DashboardEmptyStateProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p>There is no active campaign yet.</p>
      <Button className="mt-4">
        <Link href={`/dashboard/create-campaign?tenantId=${businessId}`}>
          Create a campaign
        </Link>
      </Button>
    </div>
  );
}
