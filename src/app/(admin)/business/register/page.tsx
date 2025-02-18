import { auth } from "@/auth";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { prisma } from "../../../../../prisma/prisma";

async function createBusiness(formData: FormData) {
  "use server";

  const session = await auth();
  if (!session?.user) return redirect("/register");

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  try {
    // Create the tenant along with its settings and subscription
    await prisma.tenant.create({
      data: {
        name,
        slug,
        owner: {
          connect: { id: session.user.id },
        },
        settings: {
          create: {
            brandColor: "#2563eb",
            locale: "en",
          },
        },
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    });

    return redirect("/dashboard");
  } catch (error) {
    console.error("Error creating business:", error);
    throw new Error("Something went wrong while creating the business");
  }
}

export default async function BusinessRegisterPage() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") return redirect("/profile");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="w-full px-6 py-8 max-w-2xl">
        {session?.user?.onboardingCompleted && (
          <div className="text-center mb-4">
            <a
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
            >
              <span>←</span> Return to dashboard
            </a>
          </div>
        )}
        <div className="text-center mb-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3">
            Set Up Your Business
          </h1>
          <p className="text-muted-foreground text-lg">
            Create your business profile and start collecting valuable feedback
          </p>
        </div>

        <Card className="w-full backdrop-blur-xl bg-white/80 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createBusiness} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Business Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Acme Inc."
                    className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="slug"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Business URL
                  </label>
                  <div className="flex items-center gap-2 rounded-md border bg-muted/50 p-2">
                    <span className="text-sm text-muted-foreground">
                      feedbackpro.com/
                    </span>
                    <Input
                      id="slug"
                      name="slug"
                      required
                      placeholder="acme"
                      pattern="^[a-z0-9-]+$"
                      title="Only lowercase letters, numbers, and hyphens are allowed"
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This will be your unique URL for collecting feedback
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <RainbowButton className="w-full" type="submit">
                  Create Business
                </RainbowButton>

                {/* <p className="text-center text-sm text-muted-foreground">
                  By creating a business, you agree to our{" "}
                  <a
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </p> */}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
