"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { feedbackQueryOptions } from "../dashboardService";

interface Feedback {
  id: string;
  sentiment: string | null;
}

interface SentimentChartProps {
  businessId: string;
}

function computeSentimentData(feedbacks: Feedback[]) {
  const counts: Record<string, number> = {};
  feedbacks.forEach((feedback) => {
    const sentiment = feedback.sentiment
      ? feedback.sentiment.toLowerCase()
      : "unknown";
    counts[sentiment] = (counts[sentiment] || 0) + 1;
  });
  return Object.entries(counts).map(([sentiment, count]) => ({
    sentiment: sentiment.charAt(0).toUpperCase() + sentiment.slice(1),
    count,
  }));
}

export function SentimentChart({ businessId }: SentimentChartProps) {
  const { data } = useSuspenseQuery(feedbackQueryOptions(businessId, []));

  console.log(data);

  const sentimentData = computeSentimentData(data.feedbacks);

  const chartConfig = {
    sentiment: {
      label: "Feedback Count",
      color: "#10B981",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={sentimentData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="sentiment"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="count" fill="var(--color-sentiment)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
