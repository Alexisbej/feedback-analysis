"use client";
import { FileSpreadsheet, Star, Users, UserSquare2 } from "lucide-react";
import FeedbackList from "./FeedbackList";
import { SentimentChart } from "./SentimentChart";

const sentimentData = [
  { date: "2024-03-01", sentiment: 9.2 },
  { date: "2024-03-02", sentiment: 9.9 },
  { date: "2024-03-03", sentiment: 6.8 },
  { date: "2024-03-04", sentiment: 9.8 },
  { date: "2024-03-05", sentiment: 5.3 },
  { date: "2024-03-06", sentiment: 6.6 },
  { date: "2024-03-07", sentiment: 8.4 },
];

function MetricCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: any;
  title: string;
  value: string | number;
  description?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard({ metrics, businessId }) {
  const {
    campaignsCount,
    overallFeedbackScore,
    participantsCount,
    unregisteredParticipantsCount,
  } = metrics;
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Monitor your feedback and survey performance
          </p>
        </div>

        {/* Metrics Grid */}
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

        <FeedbackList businessId={businessId} />
      </div>
    </div>
  );
}
