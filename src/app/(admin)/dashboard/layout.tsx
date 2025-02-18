import { auth } from "@/auth";
import { AppSidebar, Business } from "@/components/AppSidebar";
import SignoutButton from "@/components/SignoutButton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";

async function getBusinessesForAdmin(userId: string): Promise<Business[]> {
  const tenants = await prisma.tenant.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      subscription: {
        select: {
          status: true,
        },
      },
    },
    where: {
      subscription: {
        status: {
          not: "CANCELED",
        },
      },
      ownerId: userId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return tenants.map(({ id, name }) => ({ id, name }));
}

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
