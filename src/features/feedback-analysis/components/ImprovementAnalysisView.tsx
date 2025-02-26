import { Card, CardContent } from "@/components/ui/card";
import { Improvement, ImprovementAnalysis } from "../types";

interface ImprovementAnalysisViewProps {
  data: ImprovementAnalysis;
}

export default function ImprovementAnalysisView({
  data,
}: ImprovementAnalysisViewProps) {
  if (!data || !data.improvements || data.improvements.length === 0) {
    return (
      <div>No improvement suggestions detected in the analyzed feedback.</div>
    );
  }

  const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const sortedImprovements = [...data.improvements].sort(
    (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {sortedImprovements.map((improvement, index) => (
          <ImprovementCard key={index} improvement={improvement} />
        ))}
      </div>
    </div>
  );
}

function ImprovementCard({ improvement }: { improvement: Improvement }) {
  const priorityColor = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    LOW: "bg-blue-100 text-blue-800",
  }[improvement.impact];

  const sentimentColor =
    improvement.sentiment &&
    {
      POSITIVE: "bg-green-100 text-green-800",
      NEUTRAL: "bg-gray-100 text-gray-800",
      NEGATIVE: "bg-red-100 text-red-800",
    }[improvement.sentiment];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
          <h3 className="text-lg font-semibold">{improvement.area}</h3>
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${priorityColor}`}>
              {improvement.impact.toLowerCase()} impact
            </span>
            {improvement.sentiment && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${sentimentColor}`}
              >
                {improvement.sentiment.toLowerCase()}
              </span>
            )}
          </div>
        </div>

        {/* Update these property names to match your schema */}
        {improvement.supportingFeedback &&
          improvement.supportingFeedback.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Supporting feedback</h4>
              <ul className="list-disc pl-5 space-y-1">
                {improvement.supportingFeedback.map((point, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {improvement.potentialBenefit && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Potential benefit</h4>
            <p className="text-sm text-gray-700">
              {improvement.potentialBenefit}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
