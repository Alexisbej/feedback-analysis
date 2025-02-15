import { Prisma } from "@prisma/client";

export function tenantMiddleware(tenantId: string) {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<unknown>,
  ) => {
    if (params.model === "Feedback") {
      params.args.where = { ...params.args.where, tenantId };
    }
    return next(params);
  };
}
