import { Card, CardContent } from "@/components/ui/card";
import { Improvement, ImprovementAnalysis } from "../types";

interface ImprovementAnalysisViewProps {
  data: ImprovementAnalysis;
}

export default function ImprovementAnalysisView({
  data,
}: ImprovementAnalysisViewProps) {
  console.log(data);
  if (!data || !data.improvements || data.improvements.length === 0) {
    return (
      <div>No improvement suggestions detected in the analyzed feedback.</div>
    );
  }

  const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  const sortedImprovements = [...data.improvements].sort((a, b) => {
    // Handle both priority and impact fields for sorting
    const aPriority = a.priority || "MEDIUM";
    const bPriority = b.priority || "MEDIUM";
    return priorityOrder[bPriority] - priorityOrder[aPriority];
  });

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
  }[improvement.priority || "MEDIUM"];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
          <h3 className="text-lg font-semibold">{improvement.area}</h3>
          <div className="flex gap-2">
            {improvement.priority && (
              <span
                className={`text-xs px-2 py-1 rounded-full ${priorityColor}`}
              >
                {improvement.priority} impact
              </span>
            )}
          </div>
        </div>

        {improvement.suggestions?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              Improvement suggestions:
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              {improvement.suggestions.map((point, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
