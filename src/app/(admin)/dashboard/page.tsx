import { auth } from "@/auth";
import { getBusinessesAction } from "@/features/dashboard/actions/get-businesses.action";
import { AdminDashboard } from "@/features/dashboard/components/AdminDashboard";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { getDashboardMetrics } from "@/features/dashboard/services/metrics-service";
import { redirect } from "next/navigation";

interface DashboardProps {
  searchParams: Promise<{ businessId?: string }>;
}

export default async function AdminDashboardPage({
  searchParams,
}: DashboardProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return redirect("/register");
  }

  let { businessId } = await searchParams;
  if (!businessId) {
    const businesses = await getBusinessesAction(session.user.id!);
    businessId = businesses?.[0]?.id;

    if (!businessId) {
      // Handle case where admin has no businesses
      return (
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <p>You don&apos;t have any businesses configured.</p>
        </div>
      );
    }
  }

  const metrics = await getDashboardMetrics(businessId);

  if (metrics.campaignsCount === 0) {
    return <DashboardEmptyState businessId={businessId} />;
  }

  return <AdminDashboard metrics={metrics} businessId={businessId} />;
}
