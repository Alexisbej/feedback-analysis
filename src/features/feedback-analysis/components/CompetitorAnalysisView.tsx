import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CompetitorAnalysis, CompetitorMention } from "../types";

interface CompetitorAnalysisViewProps {
  data: CompetitorAnalysis;
}

export default function CompetitorAnalysisView({
  data,
}: CompetitorAnalysisViewProps) {
  if (!data || !data.competitors || data.competitors.length === 0) {
    return <div>No competitors detected in the analyzed feedback.</div>;
  }

  const sortedCompetitors = [...data.competitors].sort((a, b) => {
    const freqA = parseInt(a.frequency?.replace("%", "") || "0");
    const freqB = parseInt(b.frequency?.replace("%", "") || "0");
    return freqB - freqA;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedCompetitors.map((competitor, index) => (
          <CompetitorCard key={index} competitor={competitor} />
        ))}
      </div>
    </div>
  );
}

function CompetitorCard({ competitor }: { competitor: CompetitorMention }) {
  const frequencyValue = parseInt(
    competitor.frequency?.replace("%", "") || "0",
  );

  const sentimentColor =
    {
      POSITIVE: "bg-green-100 text-green-800",
      NEUTRAL: "bg-gray-100 text-gray-800",
      NEGATIVE: "bg-red-100 text-red-800",
    }[competitor.sentiment] || "bg-gray-100 text-gray-800";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{competitor.competitor}</h3>
          {competitor.sentiment && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${sentimentColor}`}
            >
              {competitor.sentiment.toLowerCase()}
            </span>
          )}
        </div>

        {competitor.frequency && (
          <div className="mt-4 mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-500">Frequency</span>
              <span className="text-sm font-medium">
                {competitor.frequency}
              </span>
            </div>
            <Progress value={frequencyValue} className="h-2" />
          </div>
        )}

        {competitor.comparisonPoints &&
          competitor.comparisonPoints.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Comparisons</h4>
              <div className="flex flex-wrap gap-2">
                {competitor.comparisonPoints.map((comparison, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                  >
                    {comparison}
                  </span>
                ))}
              </div>
            </div>
          )}

        {competitor.context && competitor.context.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Insights</h4>
            <div className="flex flex-wrap gap-2">
              {competitor.context.map((insight, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {insight}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
