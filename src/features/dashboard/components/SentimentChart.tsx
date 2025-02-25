"use client";

import { useQuery } from "@tanstack/react-query";
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
import { computeSentimentData } from "../services/feedback-service";
import { FeedbackResponse } from "../types";
import { SentimentChartSkeleton } from "./Skeletons";

interface SentimentChartProps {
  businessId: string;
}

async function fetchFeedbackData(
  businessId: string,
): Promise<FeedbackResponse> {
  const res = await fetch(`/api/feedback?businessId=${businessId}&take=20`);

  if (!res.ok) {
    throw new Error("Failed to fetch feedbacks");
  }

  return res.json();
}

export function SentimentChart({ businessId }: SentimentChartProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["feedbacks", "chart", businessId],
    queryFn: () => fetchFeedbackData(businessId),
  });

  const sentimentData = computeSentimentData(data?.feedbacks || []);

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Sentiment Analysis
        </h2>
        <SentimentChartSkeleton />
      </div>
    );
  }

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
              tickFormatter={(date) => format(new Date(date), "dd/MM")}
            />
            <YAxis
              domain={[0, "auto"]}
              tickFormatter={(value) => value.toFixed(1)}
            />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), "MMM dd, yyyy")}
              formatter={(value: number) => [
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
