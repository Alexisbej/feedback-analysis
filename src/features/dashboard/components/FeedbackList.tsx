// components/FeedbackList.tsx
"use client";
import React, { useEffect, useState } from "react";

interface Feedback {
  id: string;
  content: string;
  rating: number | null;
  sentiment: string | null;
  channel: string;
  createdAt: string;
}

interface FeedbackListProps {
  businessId: string;
}

export default function FeedbackList({ businessId }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [filters, setFilters] = useState({
    location: "",
    time: "",
    demographics: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const query = new URLSearchParams({ businessId, ...filters });
    const res = await fetch(`/api/feedback?${query.toString()}`);
    const data = await res.json();
    setFeedbacks(data.feedbacks);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          name="time"
          placeholder="Time"
          value={filters.time}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          name="demographics"
          placeholder="Demographics"
          value={filters.demographics}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <button
          onClick={fetchFeedbacks}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>
      {loading ? (
        <p>Loading feedback...</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb.id} className="border p-2 mb-2">
              <p>
                <strong>Content:</strong> {fb.content}
              </p>
              <p>
                <strong>Rating:</strong> {fb.rating}
              </p>
              <p>
                <strong>Sentiment:</strong> {fb.sentiment}
              </p>
              <p>
                <strong>Channel:</strong> {fb.channel}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(fb.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
