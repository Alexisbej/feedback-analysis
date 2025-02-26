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

    // Aggregate the analysis from all selected feedback
    const aggregatedAnalysis = {
      themes: aggregateThemes(feedbacks),
      competitors: aggregateCompetitors(feedbacks),
      improvements: aggregateImprovements(feedbacks),
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

function aggregateThemes(feedbacks) {
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
        // Merge subthemes
        theme.subthemes?.forEach((subtheme) => {
          if (!existing.subthemes.includes(subtheme)) {
            existing.subthemes.push(subtheme);
          }
        });
      }
    });
  });

  // Convert frequencies to percentages
  const total = feedbacks.length;
  const result = Array.from(themesMap.values()).map((theme) => ({
    ...theme,
    frequency: `${Math.round((theme.frequency / total) * 100)}%`,
  }));

  return result;
}

function aggregateCompetitors(feedbacks) {
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
        // Merge comparison points
        competitor.comparisonPoints?.forEach((point) => {
          if (!existing.comparisonPoints.includes(point)) {
            existing.comparisonPoints.push(point);
          }
        });
      }
    });
  });

  // Convert frequencies to percentages
  const total = feedbacks.length;
  const result = Array.from(competitorsMap.values()).map((competitor) => ({
    ...competitor,
    frequency: `${Math.round((competitor.frequency / total) * 100)}%`,
  }));

  return result;
}

function aggregateImprovements(feedbacks) {
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
        const existing = improvementsMap.get(improvement.name);
        existing.count += 1;
        // Merge suggestions
        improvement.suggestions?.forEach((suggestion) => {
          if (!existing.suggestions.includes(suggestion)) {
            existing.suggestions.push(suggestion);
          }
        });

        // Keep the highest priority
        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        if (
          priorityOrder[improvement.priority] > priorityOrder[existing.priority]
        ) {
          existing.priority = improvement.priority;
        }
      }
    });
  });

  // Sort by count (descending)
  const result = Array.from(improvementsMap.values())
    .sort((a, b) => b.count - a.count)
    .map(({ count, ...rest }) => rest);

  return result;
}
