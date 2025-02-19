import React from "react";
import MetricsCard from "./MetricsCard";
import FeedbackList from "./FeedbackList";

interface DashboardMetrics {
  campaignsCount: number;
  overallFeedbackScore: number;
  participantsCount: number;
}

interface AdminDashboardProps {
  metrics: DashboardMetrics;
  businessId: string;
}

export function AdminDashboard({ metrics, businessId }: AdminDashboardProps) {
  const { campaignsCount, overallFeedbackScore, participantsCount } = metrics;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricsCard title="Campaigns" value={campaignsCount} />
        <MetricsCard
          title="Overall Feedback Score"
          value={overallFeedbackScore.toFixed(2)}
        />
        <MetricsCard title="Participants" value={participantsCount} />
      </div>

      {campaignsCount > 1 ? (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Feedback Responses</h2>
          <FeedbackList businessId={businessId} />
        </div>
      ) : (
        <div>No feedback yet on your survey.</div>
      )}
    </div>
  );
}
