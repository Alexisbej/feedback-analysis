// app/dashboard/admin/layout.tsx
import { auth } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import SignoutButton from "@/components/SignoutButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getBusinessesForAdmin } from "@/features/dashboard/actions/get-businesses.action";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/register");

  const businesses = await getBusinessesForAdmin(session.user.id!);

  return (
    <SidebarProvider>
      <AppSidebar businesses={businesses} user={session.user}>
        <SignoutButton />
      </AppSidebar>
      <main className="ml-[var(--sidebar-width)]">{children}</main>
    </SidebarProvider>
  );
}
