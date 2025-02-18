// app/admin/dashboard/page.tsx
import { auth } from "@/auth";

import FeedbackList from "@/components/dashboard/FeedbackList";
import MetricsCard from "@/components/dashboard/MetricsCard";
// import SentimentChart from "@/components/dashboard/SentimentChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";

interface DashboardProps {
  searchParams: { businessId?: string };
}

export default async function AdminDashboardPage({
  searchParams,
}: DashboardProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return redirect("/login");
  }

  // In this example we expect a businessId to be provided as a query parameter.
  const businessId = searchParams.businessId;
  if (!businessId) {
    return <p>Error: businessId is missing from the query.</p>;
  }

  // 1. Fetch dashboard metrics

  // Number of campaigns (assumed to be Template records)
  const campaignsCount = await prisma.template.count({
    where: { tenantId: businessId },
  });

  if (campaignsCount === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <p>There is no active campaign yet.</p>
        <Button className="mt-4">
          <Link href={`/dashboard/create-campaign?tenantId=${businessId}`}>
            Create a campaign
          </Link>
        </Button>
      </div>
    );
  }

  // Overall feedback score: average of ratings for this tenant
  const feedbackAggregate = await prisma.feedback.aggregate({
    _avg: { rating: true },
    where: { tenantId: businessId, rating: { not: null } },
  });
  const overallFeedbackScore = feedbackAggregate._avg.rating || 0;

  // Number of participants: count distinct users who submitted feedback
  const participantsGroup = await prisma.feedback.groupBy({
    by: ["userId"],
    where: { tenantId: businessId, userId: { not: null } },
  });
  const participantsCount = participantsGroup.length;

  // Sentiment analysis: group feedback counts by sentiment
  // const sentimentData = await prisma.feedback.groupBy({
  //   by: ["sentiment"],
  //   _count: { sentiment: true },
  //   where: { tenantId: businessId, sentiment: { not: null } },
  // });

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
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Feedback Responses</h2>
            <FeedbackList businessId={businessId} />
          </div>

          {/* <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sentiment Analysis</h2>
            <SentimentChart data={sentimentData} />
          </div> */}
        </>
      ) : (
        <div>No feedback yet on your survey.</div>
      )}
    </div>
  );
}
