import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "../auth.config";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await auth();

  // Preserve invite tokens
  if (req.nextUrl.searchParams.has("inviteToken")) {
    const response = NextResponse.next();
    response.cookies.set(
      "inviteToken",
      req.nextUrl.searchParams.get("inviteToken")!,
    );
    return response;
  }

  // Redirect logic
  if (!session?.user?.onboardingCompleted && !path.startsWith("/onboarding")) {
    const url = new URL("/onboarding", req.url);
    url.searchParams.set("callbackUrl", path);
    return Response.redirect(url);
  }
});
