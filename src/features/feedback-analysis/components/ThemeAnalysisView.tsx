import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Theme, ThemeAnalysis } from "../types";

interface ThemeAnalysisViewProps {
  data: ThemeAnalysis;
}

export default function ThemeAnalysisView({ data }: ThemeAnalysisViewProps) {
  if (!data || !data.themes || data.themes.length === 0) {
    return <div>No themes detected in the analyzed feedback.</div>;
  }

  // Sort themes by frequency (descending)
  const sortedThemes = [...data.themes].sort((a, b) => {
    const freqA = parseInt(a.frequency.replace("%", ""));
    const freqB = parseInt(b.frequency.replace("%", ""));
    return freqB - freqA;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedThemes.map((theme, index) => (
          <ThemeCard key={index} theme={theme} />
        ))}
      </div>
    </div>
  );
}

function ThemeCard({ theme }: { theme: Theme }) {
  const frequencyValue = parseInt(theme.frequency.replace("%", ""));

  const sentimentColor = {
    POSITIVE: "bg-green-100 text-green-800",
    NEUTRAL: "bg-gray-100 text-gray-800",
    NEGATIVE: "bg-red-100 text-red-800",
  }[theme.sentiment];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{theme.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${sentimentColor}`}>
            {theme.sentiment.toLowerCase()}
          </span>
        </div>

        <div className="mt-4 mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Frequency</span>
            <span className="text-sm font-medium">{theme.frequency}</span>
          </div>
          <Progress value={frequencyValue} className="h-2" />
        </div>

        {theme.subthemes && theme.subthemes.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Key aspects</h4>
            <div className="flex flex-wrap gap-2">
              {theme.subthemes.map((subtheme, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                >
                  {subtheme}
                </span>
              ))}
            </div>
          </div>
        )}

        {theme.quotes && theme.quotes.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Representative quotes</h4>
            <div className="space-y-2">
              {theme.quotes.slice(0, 2).map((quote, i) => (
                <blockquote
                  key={i}
                  className="text-sm italic border-l-2 border-gray-200 pl-3 text-gray-600"
                >
                  &quot;{quote}&quot;
                </blockquote>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
