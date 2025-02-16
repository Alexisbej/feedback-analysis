import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") return redirect("/profile");

  return <div>Admin Dashboard Page</div>;
}
