import type { DefaultSession, NextAuthConfig } from "next-auth";
/* eslint-disable */
import { JWT } from "next-auth/jwt";
/* eslint-enable */

import Google from "next-auth/providers/google";
import { prisma } from "../prisma/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      role: "USER" | "ADMIN";
      onboardingCompleted: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: "USER" | "ADMIN";
    onboardingCompleted: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "USER" | "ADMIN";
    onboardingCompleted: boolean;
  }
}

export default {
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.onboardingCompleted = user.onboardingCompleted;
      }
      return token;
    },
    async session({ session, token }) {
      const prismaUser = await prisma.user.findFirst({
        where: { id: token.id as string },
      });

      session.user.role = prismaUser.role;
      session.user.id = prismaUser.id;
      session.user.onboardingCompleted = prismaUser.onboardingCompleted;
      return session;
    },
  },
} satisfies NextAuthConfig;
