import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getDashboardMetrics } from "@/features/dashboard/dashboardService";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { AdminDashboard } from "@/features/dashboard/components/AdminDashboard";

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

  const { businessId } = await searchParams;
  if (!businessId) {
    return <p>Error: businessId is missing from the query.</p>;
  }

  const metrics = await getDashboardMetrics(businessId);

  if (metrics.campaignsCount === 0) {
    return <DashboardEmptyState businessId={businessId} />;
  }

  return <AdminDashboard metrics={metrics} businessId={businessId} />;
}
