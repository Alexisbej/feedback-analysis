import { auth } from "@/auth";
import FeedbackList from "@/components/dashboard/FeedbackList";
import MetricsCard from "@/components/dashboard/MetricsCard";
// import SentimentChart from "@/components/dashboard/SentimentChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../../../../prisma/prisma";

interface DashboardProps {
  searchParams: Promise<{ businessId?: string }>;
}

export default async function AdminDashboardPage({
  searchParams,
}: DashboardProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return redirect("/register");
  }

  const businessId = (await searchParams).businessId;
  if (!businessId) {
    return <p>Error: businessId is missing from the query.</p>;
  }

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

  const feedbackAggregate = await prisma.feedback.aggregate({
    _avg: { rating: true },
    where: { tenantId: businessId, rating: { not: null } },
  });
  const overallFeedbackScore = feedbackAggregate._avg.rating || 0;

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
