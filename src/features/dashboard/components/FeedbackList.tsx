"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useFeedbacks } from "../hooks/useFeedbacks";

import { Checkbox } from "@/components/ui/checkbox";
import { Answer, feedbackFiltersSchema, FeedbackResponse } from "../types";
import { FeedbackListSkeleton } from "./Skeletons";

interface FeedbackListProps {
  businessId: string;
  onSelectionChange?: (ids: string[]) => void;
  selectedIds?: string[];
}

export function FeedbackList({
  businessId,
  onSelectionChange,
  selectedIds,
}: FeedbackListProps) {
  const [filters, setFilters] = useState({
    location: "",
    time: "",
    demographics: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [selectedFeedbacks, setSelectedFeedbacks] = useState<Set<string>>(
    new Set(selectedIds || []),
  );

  const toggleFeedbackSelection = (id: string) => {
    const newSelection = new Set(selectedFeedbacks);

    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }

    setSelectedFeedbacks(newSelection);
    onSelectionChange?.(Array.from(newSelection));
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFeedbacks(businessId, appliedFilters);

  const computeAverageRating = (answers: Answer[]) => {
    const numericValues = answers
      .map((ans) => {
        const num = Number(ans.value);
        return isNaN(num) ? null : num;
      })
      .filter((num): num is number => num !== null);
    if (numericValues.length === 0) return "N/A";
    const avg =
      numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
    return avg.toFixed(2);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    try {
      const validatedFilters = feedbackFiltersSchema.parse(filters);
      setAppliedFilters({
        location: validatedFilters.location || "",
        time: validatedFilters.time || "",
        demographics: validatedFilters.demographics || "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Filter validation failed:", error.errors);
      }
    }
  };

  const feedbacks =
    data?.pages.flatMap((page: FeedbackResponse) => page.feedbacks) || [];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-4">
        <Input
          name="location"
          placeholder="Filter by location"
          value={filters.location}
          onChange={handleFilterChange}
          className="flex-1"
        />
        <Input
          name="time"
          type="date"
          placeholder="Filter by date"
          value={filters.time}
          onChange={handleFilterChange}
          className="flex-1"
        />
        <Input
          name="demographics"
          placeholder="Filter by demographics"
          value={filters.demographics}
          onChange={handleFilterChange}
          className="flex-1"
        />
        <Button onClick={handleFilterSubmit}>Filter</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Feedback</h2>
        </div>
        {isLoading ? (
          <div className="p-6 text-center">
            <FeedbackListSkeleton />
          </div>
        ) : feedbacks.length === 0 ? (
          <div className="p-6 text-center">
            <p>No feedback available with the current filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Checkbox
                    checked={selectedFeedbacks.has(fb.id)}
                    onCheckedChange={() => toggleFeedbackSelection(fb.id)}
                    id={`select-${fb.id}`}
                    className="mr-2"
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {fb.user?.name
                          ? fb.user.name.charAt(0)
                          : fb.content.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {fb.user?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {fb.user?.email || "No email provided"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">
                      {fb.rating !== null
                        ? fb.rating
                        : computeAverageRating(fb.answers)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{fb.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(fb.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
