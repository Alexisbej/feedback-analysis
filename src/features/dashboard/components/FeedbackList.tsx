"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { feedbackQueryOptions } from "../dashboardService";

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

  const { data } = useSuspenseQuery(
    feedbackQueryOptions(businessId, appliedFilters),
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    setAppliedFilters(filters);
  };

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

  return (
    <div className="mx-auto px-4 py-6">
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
      <ul className="space-y-6">
        {data?.feedbacks.map((fb: Feedback) => (
          <li key={fb.id} className="bg-white p-6 rounded-lg shadow-lg">
            {fb.content && (
              <p className="text-lg font-semibold mb-2">{fb.content}</p>
            )}
            <div className="mb-2">
              <span className="font-medium">Rating: </span>
              {fb.rating !== null ? (
                <span className="text-blue-600 font-bold">{fb.rating}</span>
              ) : (
                <span className="text-green-600 font-bold">
                  {computeAverageRating(fb.answers)}
                </span>
              )}
            </div>
            <p className="mb-2">
              <span className="font-medium">Sentiment:</span>{" "}
              {fb.sentiment || "N/A"}
            </p>
            <p className="mb-4 text-sm text-gray-500">
              <span className="font-medium">Submitted:</span>{" "}
              {new Date(fb.createdAt).toLocaleString()}
            </p>
            {fb.answers && fb.answers.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <p className="font-bold mb-2">Answers:</p>
                <ul className="space-y-2">
                  {fb.answers.map((ans: Answer) => (
                    <li
                      key={ans.id}
                      className="pl-4 border-l-2 border-gray-300"
                    >
                      <p className="text-gray-800">
                        <span className="font-medium">Value:</span>{" "}
                        {typeof ans.value === "object"
                          ? JSON.stringify(ans.value)
                          : ans.value}
                      </p>
                      <p className="text-xs text-gray-500">
                        Submitted: {new Date(ans.createdAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
