"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { fetchFeedbacks } from "../dashboardService";

interface Answer {
  id: string;
  value: string | number | boolean | object | null;
  createdAt: string;
}

interface Feedback {
  id: string;
  content: string;
  rating: number | null;
  sentiment: string | null;
  createdAt: string;
  answers: Answer[];
  user?: {
    name: string;
    email: string;
  };
}

interface FeedbackListProps {
  businessId: string;
}

export default function FeedbackList({ businessId }: FeedbackListProps) {
  const [filters, setFilters] = useState({
    location: "",
    time: "",
    demographics: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedbacks", businessId, appliedFilters],
      queryFn: ({ pageParam = 0 }) =>
        fetchFeedbacks(businessId, {
          ...appliedFilters,
          skip: pageParam,
          take: 5,
        }),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.feedbacks.length < 5) return undefined;
        return pages.length * 5;
      },
      suspense: true,
    });

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
    setAppliedFilters(filters);
  };

  // Flatten pages of feedback into a single array
  const feedbacks: Feedback[] =
    data?.pages.flatMap((page) => page.feedbacks) || [];

  return (
    <div className="mx-auto px-4 py-6">
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <Input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <Input
          name="time"
          placeholder="Time"
          value={filters.time}
          onChange={handleFilterChange}
        />
        <Input
          name="demographics"
          placeholder="Demographics"
          value={filters.demographics}
          onChange={handleFilterChange}
        />
        <Button onClick={handleFilterSubmit}>Filter</Button>
      </div>

      {/* Feedback List with new UI */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Feedback</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {feedbacks.map((fb: Feedback) => (
            <div key={fb.id} className="p-6">
              <div className="flex items-center justify-between mb-2">
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
                {new Date(fb.createdAt).toISOString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
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
