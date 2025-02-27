"use client";
import { FileSpreadsheet, Star, Users, UserSquare2 } from "lucide-react";
import { FeedbackList } from "./FeedbackList";
import { SentimentChart } from "./SentimentChart";

import FeedbackInsights from "@/features/feedback-analysis/components/FeedbackInsights";
import { useState } from "react";
import { DashboardMetrics } from "../types";
import { MetricCard } from "./MetricsCard";

interface AdminDashboardProps {
  metrics: DashboardMetrics;
  businessId: string;
}

export function AdminDashboard({ metrics, businessId }: AdminDashboardProps) {
  const {
    campaignsCount,
    overallFeedbackScore,
    participantsCount,
    unregisteredParticipantsCount,
  } = metrics;
  const [selectedFeedbackIds, setSelectedFeedbackIds] = useState<string[]>([]);
  
  // Auto-select the 5 most recent feedbacks by default
  const handleInitialFeedbacks = (initialFeedbacks: string[]) => {
    // Take up to 5 most recent feedbacks (they're already ordered by date in FeedbackList)
    const latestFeedbacks = initialFeedbacks.slice(0, 5);
    if (latestFeedbacks.length > 0) {
      setSelectedFeedbackIds(latestFeedbacks);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Monitor your feedback and survey performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={FileSpreadsheet}
            title="Total Campaigns"
            value={campaignsCount}
          />
          <MetricCard
            icon={Star}
            title="Overall Score"
            value={overallFeedbackScore.toFixed(1)}
            description="Average rating across all feedback"
          />
          <MetricCard
            icon={Users}
            title="Total Participants"
            value={participantsCount}
          />
          <MetricCard
            icon={UserSquare2}
            title="Unregistered Users"
            value={unregisteredParticipantsCount}
          />
        </div>

        <SentimentChart businessId={businessId} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <FeedbackList
              businessId={businessId}
              onSelectionChange={setSelectedFeedbackIds}
              selectedIds={selectedFeedbackIds}
              onInitialFeedbacks={handleInitialFeedbacks}
            />
          </div>
          <div className="sticky top-24">
            <FeedbackInsights
              businessId={businessId}
              selectedFeedbackIds={selectedFeedbackIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
