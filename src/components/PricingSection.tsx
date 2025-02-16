import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/20"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Choose Your Plan
          </h2>
          <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400 pb-8">
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </p>
        </div>
        <div className="grid gap-6 mt-12 md:grid-cols-3 lg:gap-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
                plan.name === "Pro"
                  ? "border-2 border-red-500 scale-110 relative"
                  : ""
              }`}
            >
              {plan.name === "Pro" && (
                <p className="uppercase bg-red-500 text-white absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md transform -rotate-2">
                  Most popular
                </p>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mt-2 text-4xl font-bold">{plan.price}</div>
                <ul className="mt-6 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.name === "Pro" ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingPlans = [
  {
    name: "Free",
    description: "Perfect for small businesses starting out",
    price: "$0",
    features: [
      "100 feedback responses/month",
      "Basic QR code generation",
      "Simple analytics dashboard",
      "Email support",
      "1 feedback template",
    ],
  },
  {
    name: "Pro",
    description: "For growing businesses seeking deeper insights",
    price: "$49",
    features: [
      "5,000 feedback responses/month",
      "Custom QR codes & branded links",
      "Advanced analytics & reporting",
      "Sentiment analysis",
      "Real-time notifications",
      "10 custom feedback templates",
      "Priority support",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations requiring full-scale solutions",
    price: "Custom",
    features: [
      "Unlimited feedback responses",
      "White-label solution",
      "Advanced sentiment & trend analysis",
      "Custom integrations",
      "Dedicated success manager",
      "Custom AI model training",
      "SLA guarantee",
      "On-premise deployment option",
    ],
  },
];
