"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  AnalysisType,
  getRecentAnalyses,
  requestFeedbackAnalysis,
  saveAnalysisResult,
} from "../services/analysis-service";
import { AnalysisResult } from "../types";

export function useFeedbackAnalysis(
  businessId: string,
  selectedFeedbackIds: string[],
) {
  const [activeTab, setActiveTab] = useState<AnalysisType>("themes");

  const { data: recentAnalyses } = useQuery({
    queryKey: ["analyses", businessId],
    queryFn: () => getRecentAnalyses(businessId),
  });

  const analysisMutation = useMutation({
    mutationFn: () =>
      requestFeedbackAnalysis(businessId, selectedFeedbackIds, activeTab),
    onSuccess: async (data) => {
      await saveAnalysisResult(businessId, activeTab, data);
    },
  });

  const handleRequestAnalysis = () => {
    analysisMutation.mutate();
  };

  return {
    activeTab,
    setActiveTab,
    recentAnalyses,
    analysisMutation,
    handleRequestAnalysis,
    analysisData: analysisMutation.data as AnalysisResult,
  };
}
