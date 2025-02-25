"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { BarChart3 } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { feedbackQueryOptions } from "../dashboardService";

interface Feedback {
  id: string;
  sentiment: string | null;
}

interface SentimentChartProps {
  businessId: string;
}

function computeSentimentData(feedbacks: Feedback[]) {
  // For demo purposes - replace this with actual date-based grouping
  const demoData = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(2024, 2, i + 1); // March 2024

    // Every 5th day will have more negative feedback
    const isNegativeDay = i % 5 === 0;

    let positive, negative, neutral;

    if (isNegativeDay) {
      positive = Math.floor(Math.random() * 10) + 2; // 2-12 positive
      negative = Math.floor(Math.random() * 20) + 15; // 15-35 negative
      neutral = Math.floor(Math.random() * 8) + 2; // 2-10 neutral
    } else {
      positive = Math.floor(Math.random() * 20) + 10; // 10-30 positive
      negative = Math.floor(Math.random() * 10) + 2; // 2-12 negative
      neutral = Math.floor(Math.random() * 8) + 2; // 2-10 neutral
    }

    const ratio =
      negative === 0 && neutral === 0
        ? positive > 0
          ? positive
          : 1
        : (positive + neutral * 0.5) / (negative + neutral * 0.5);

    return {
      date: date.toISOString().split("T")[0], // YYYY-MM-DD format
      ratio,
      positive,
      negative,
      neutral,
    };
  });

  return demoData;
}

export function SentimentChart({ businessId }: SentimentChartProps) {
  const { data } = useSuspenseQuery(feedbackQueryOptions(businessId, {}));

  const sentimentData = computeSentimentData(data.feedbacks);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        Sentiment Analysis
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sentimentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "dd/MM/yyyy")}
            />
            <YAxis
              domain={[0, "auto"]}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), "dd/MM/yyyy")}
              formatter={(value: any) => [
                `${value.toFixed(2)}`,
                "Positive/Negative Ratio",
              ]}
            />
            <Area
              type="monotone"
              dataKey="ratio"
              stroke="#2563eb"
              fill="#bfdbfe"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
