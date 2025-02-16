// app/page.tsx
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { MarqueeDemo } from "@/components/MarqueeDemo";
import PricingSection from "@/components/PricingSection";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
const features = [
  {
    Icon: FileTextIcon,
    name: "Feedback Collection",
    description:
      "Generate QR codes, links, and customizable templates for multi-channel feedback.",
    href: "/feedback",
    cta: "Learn More",
    background: (
      <img
        src="/images/feedback-bg.png"
        alt="Feedback Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: InputIcon,
    name: "Real-Time Analytics",
    description:
      "Monitor live responses with automated alerts and detailed data segmentation.",
    href: "/analytics",
    cta: "Learn More",
    background: (
      <div>
        <DotPattern
          width={16}
          height={16}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(white,transparent,transparent)] ",
          )}
        />
        <img
          src="/images/analytics-bg.png"
          alt="Analytics Background"
          className="absolute -right-20 -top-20 opacity-60"
        />
      </div>
    ),
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "AI Actionable Insights",
    description:
      "Access automated reports, sentiment analysis, and benchmarking to drive improvements.",
    href: "/insights",
    cta: "Learn More",
    background: (
      <img
        src="/images/insights-bg.png"
        alt="Insights Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/notifications",
    cta: "Learn More",
    background: (
      <img
        src="/images/notifications-bg.png"
        alt="Notifications Background"
        className="absolute -right-20 -top-20 opacity-60"
      />
    ),
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-3 lg:row-end-4",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="flex justify-between items-center py-4 mx-4 h-[65px]">
          <Link href="/">
            <h4 className="font-bold">FeedbackPro</h4>
          </Link>
          <nav className="space-x-6 flex">
            <Link href="#features">
              <p className="leading-7">Features</p>
            </Link>
            <Link href="#pricing">
              <p className="leading-7">Pricing</p>
            </Link>
            <Link href="#contact">
              <p className="leading-7">Contact</p>
            </Link>
          </nav>
          <div className="flex space-x-4 items-center ">
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>

            <Link href="/register">
              <RainbowButton>Start now for free</RainbowButton>
            </Link>
          </div>
        </div>
        <ScrollProgress className="top-[65px]" />
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-28">
          <div className="text-center w-2/3 mx-auto">
            <ShimmerButton className="shadow-2xl mx-auto mb-4">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                Announcing FeedbackPro
              </span>
            </ShimmerButton>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl">
              Real-Time Customer Feedback
            </h1>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">
              Gather immediate insights and elevate your service quality with AI
              insights.
            </h2>
            <Link href="/register">
              <RainbowButton className="mt-8">Start now for free</RainbowButton>
            </Link>
            <p className="py-8">
              Discover our services with the free plan. No credit card required.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="pt-8 mb-28">
          <div className="container mx-auto">
            <h2 className="uppercase text-center scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
              Features
            </h2>
            <h3 className="text-center mb-12 scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0">
              Enable the power of feedback driven development.
            </h3>
            <BentoGrid className="lg:grid-rows-3 gap-8">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </section>

        {/* Call-To-Action Section */}
        <section className="bg-gray-50 py-22">
          <div className="text-center mb-8">
            <h2 className="mb-4 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Trusted by Service Businesses Worldwide
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              From restaurants and retail to healthcare and events.
            </p>
          </div>
          <MarqueeDemo />
        </section>
      </main>

      <PricingSection />

      {/* Footer */}
      <footer className="w-full py-12 bg-background border-t">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">FeedbackPro</h3>
              <p className="text-sm text-muted-foreground">
                Empowering businesses to listen, analyze, and act on customer
                feedback.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} FeedbackPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
