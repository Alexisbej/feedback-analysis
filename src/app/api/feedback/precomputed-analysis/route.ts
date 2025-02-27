import { Feedback, Improvement } from "@/features/dashboard/types";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

export async function POST(req: Request) {
  try {
    const { feedbackIds } = await req.json();

    if (!feedbackIds || !feedbackIds.length) {
      return NextResponse.json(
        { error: "feedbackIds are required" },
        { status: 400 },
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        id: { in: feedbackIds },
      },
      select: {
        id: true,
        sentiment: true,
        analysisThemes: true,
        analysisCompetitors: true,
        analysisImprovements: true,
      },
    });

    if (!feedbacks.length) {
      return NextResponse.json({ error: "No feedback found" }, { status: 404 });
    }

    const aggregatedAnalysis = {
      themes: aggregateThemes(feedbacks as Feedback[]),
      competitors: aggregateCompetitors(feedbacks as Feedback[]),
      improvements: aggregateImprovements(feedbacks as Feedback[]),
    };

    return NextResponse.json(aggregatedAnalysis);
  } catch (error) {
    console.error("Error retrieving precomputed analysis:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analysis" },
      { status: 500 },
    );
  }
}

function aggregateThemes(feedbacks: Feedback[]) {
  const themesMap = new Map();

  feedbacks.forEach((feedback) => {
    if (!feedback.analysisThemes) return;

    const themes = Array.isArray(feedback.analysisThemes)
      ? feedback.analysisThemes
      : [];

    themes.forEach((theme) => {
      if (!themesMap.has(theme.name)) {
        themesMap.set(theme.name, {
          ...theme,
          frequency: 1,
          sentiment: feedback.sentiment,
        });
      } else {
        const existing = themesMap.get(theme.name);
        existing.frequency += 1;
        theme.subthemes?.forEach((subtheme) => {
          if (!existing.subthemes.includes(subtheme)) {
            existing.subthemes.push(subtheme);
          }
        });
      }
    });
  });

  const total = feedbacks.length;
  const result = Array.from(themesMap.values()).map((theme) => ({
    ...theme,
    frequency: `${Math.round((theme.frequency / total) * 100)}%`,
  }));

  return result;
}

function aggregateCompetitors(feedbacks: Feedback[]) {
  const competitorsMap = new Map();

  feedbacks.forEach((feedback) => {
    if (!feedback.analysisCompetitors) return;

    const competitors = Array.isArray(feedback.analysisCompetitors)
      ? feedback.analysisCompetitors
      : [];

    competitors.forEach((competitor) => {
      if (!competitorsMap.has(competitor.name)) {
        competitorsMap.set(competitor.name, {
          ...competitor,
          frequency: 1,
          sentiment: feedback.sentiment,
        });
      } else {
        const existing = competitorsMap.get(competitor.name);
        existing.frequency += 1;
        competitor.comparisonPoints?.forEach((point) => {
          if (!existing.comparisonPoints.includes(point)) {
            existing.comparisonPoints.push(point);
          }
        });
      }
    });
  });

  const total = feedbacks.length;
  const result = Array.from(competitorsMap.values()).map((competitor) => ({
    ...competitor,
    frequency: `${Math.round((competitor.frequency / total) * 100)}%`,
  }));

  return result;
}

function aggregateImprovements(feedbacks: Feedback[]) {
  const improvementsMap = new Map();

  feedbacks.forEach((feedback) => {
    if (!feedback.analysisImprovements) return;

    const improvements = Array.isArray(feedback.analysisImprovements)
      ? feedback.analysisImprovements
      : [];

    improvements.forEach((improvement) => {
      if (!improvementsMap.has(improvement.name)) {
        improvementsMap.set(improvement.name, {
          ...improvement,
          count: 1,
        });
      } else {
        const existing: Improvement = improvementsMap.get(improvement.name);
        if (existing.count) {
          existing.count += 1;
        }
        improvement.suggestions?.forEach((suggestion) => {
          if (!existing.suggestions.includes(suggestion)) {
            existing.suggestions.push(suggestion);
          }
        });

        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        if (
          priorityOrder[improvement.priority] > priorityOrder[existing.priority]
        ) {
          existing.priority = improvement.priority;
        }
      }
    });
  });

  const result = Array.from(improvementsMap.values())
    .sort((a, b) => b.count - a.count)
    .map(({ ...rest }) => rest);

  return result;
}
