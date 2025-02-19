import { Business } from "@/components/AppSidebar";
import { prisma } from "../../../../prisma/prisma";

export async function getBusinessesForAdmin(userId: string): Promise<Business[]> {
    const tenants = await prisma.tenant.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        subscription: {
          select: { status: true },
        },
      },
      where: {
        subscription: { status: { not: "CANCELED" } },
        ownerId: userId,
      },
      orderBy: { name: "asc" },
    });
  
    return tenants.map(({ id, name }) => ({ id, name }));
  }