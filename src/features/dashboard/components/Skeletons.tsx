import { Skeleton } from "@/components/ui/skeleton";

export function FeedbackListSkeleton() {
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

export function SentimentChartSkeleton() {
  return <Skeleton className="h-[200px] w-full" />;
}
