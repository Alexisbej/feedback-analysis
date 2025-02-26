"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Brain, CheckCircle, Zap } from "lucide-react";
import { useState } from "react";
import CompetitorAnalysisView from "./CompetitorAnalysisView";
import ImprovementAnalysisView from "./ImprovementAnalysisView";
import ThemeAnalysisView from "./ThemeAnalysisView";

interface FeedbackInsightsProps {
  businessId: string;
  selectedFeedbackIds: string[];
}

export async function fetchPrecomputedAnalysis(feedbackIds: string[]) {
  if (!feedbackIds.length) return null;

  const res = await fetch(`/api/feedback/precomputed-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ feedbackIds }),
  });

  if (!res.ok) throw new Error("Failed to fetch analysis");
  return res.json();
}

export default function FeedbackInsights({
  selectedFeedbackIds,
}: FeedbackInsightsProps) {
  const [activeTab, setActiveTab] = useState("themes");

  const { data: analysisData, isLoading } = useQuery({
    queryKey: ["feedback-analysis", selectedFeedbackIds],
    queryFn: () => fetchPrecomputedAnalysis(selectedFeedbackIds),
    enabled: selectedFeedbackIds.length > 0,
  });

  const renderAnalysisContent = () => {
    if (selectedFeedbackIds.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <Brain className="h-16 w-16 text-blue-200" />
          <p className="mt-4 text-lg">Select feedback to view insights</p>
          <p className="text-sm text-gray-500 mb-6">
            Select one or more feedback items to view their pre-computed
            analysis.
          </p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="animate-pulse flex space-x-4">
            <Brain className="h-12 w-12 text-blue-500" />
          </div>
          <p className="mt-4 text-lg">Loading analysis...</p>
        </div>
      );
    }

    if (!analysisData) {
      return (
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-lg">No analysis available</p>
        </div>
      );
    }

    switch (activeTab) {
      case "themes":
        return <ThemeAnalysisView data={{ themes: analysisData.themes }} />;
      case "competitors":
        return (
          <CompetitorAnalysisView
            data={{ competitors: analysisData.competitors }}
          />
        );
      case "improvements":
        return (
          <ImprovementAnalysisView
            data={{ improvements: analysisData.improvements }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Feedback Analysis</CardTitle>
        <CardDescription>
          View insights automatically extracted from your customer feedback
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Themes
            </TabsTrigger>
            <TabsTrigger
              value="competitors"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Competitors
            </TabsTrigger>
            <TabsTrigger
              value="improvements"
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Improvements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="themes">
            <p className="text-sm text-gray-600 mb-4">
              Common themes identified in the selected feedback.
            </p>
            {renderAnalysisContent()}
          </TabsContent>

          <TabsContent value="competitors">
            <p className="text-sm text-gray-600 mb-4">
              Competitor mentions detected in the selected feedback.
            </p>
            {renderAnalysisContent()}
          </TabsContent>

          <TabsContent value="improvements">
            <p className="text-sm text-gray-600 mb-4">
              Suggested improvements based on the selected feedback.
            </p>
            {renderAnalysisContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
