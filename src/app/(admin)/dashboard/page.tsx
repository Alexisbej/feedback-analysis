import { auth } from "@/auth";
import { getBusinessesForAdmin } from "@/features/dashboard/actions/get-businesses.action";
import AdminDashboard from "@/features/dashboard/components/AdminDashboard";

import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { getDashboardMetrics } from "@/features/dashboard/dashboardService";
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
    const businesses = await getBusinessesForAdmin(session.user.id!);
    businessId = businesses?.[0].id;
  }

  const metrics = await getDashboardMetrics(businessId);

  if (metrics.campaignsCount === 0) {
    return <DashboardEmptyState businessId={businessId} />;
  }

  return <AdminDashboard metrics={metrics} businessId={businessId} />;
}
