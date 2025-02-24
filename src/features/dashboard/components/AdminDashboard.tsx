import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import FeedbackList from "./FeedbackList";
import MetricsCard from "./MetricsCard";
import { SentimentChart } from "./SentimentChart";

interface DashboardMetrics {
  campaignsCount: number;
  overallFeedbackScore: number;
  participantsCount: number;
  unregisteredParticipantsCount: number;
}

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

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <MetricsCard title="Campaigns" value={campaignsCount} />
          <MetricsCard
            title="Overall Feedback Score"
            value={overallFeedbackScore.toFixed(2)}
          />
          <MetricsCard title="Participants" value={participantsCount} />
          <MetricsCard
            title="Unregistered Participants"
            value={unregisteredParticipantsCount}
          />
        </div>

        {campaignsCount > 1 ? (
          <section className="md:flex gap-6">
            <div className="bg-white p-6 md:w-1/2 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Feedback Responses
              </h2>
              <Suspense fallback={<FeedbackListSkeleton />}>
                <FeedbackList businessId={businessId} />
              </Suspense>
            </div>
            <div className="bg-white p-6 md:w-1/2 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Sentiment analysis
              </h2>
              <Suspense fallback={<SentimentChartSkeleton />}>
                <SentimentChart businessId={businessId} />
              </Suspense>
            </div>
          </section>
        ) : (
          <div className="text-gray-500">No feedback yet on your survey.</div>
        )}
      </div>
    </div>
  );
}

function FeedbackListSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}

function SentimentChartSkeleton() {
  return <Skeleton className="h-[200px] w-full" />;
}
