"use client";
import { ChevronRight, MessageSquare, Send, Star } from "lucide-react";
import React from "react";

interface Question {
  id: string;
  tenantId: string;
  question: string;
  type: "TEXT" | "RATING" | "MULTIPLE_CHOICE";
  options?: string[];
}

interface FeedbackFormProps {
  questions: Question[];
}

export default function FeedbackForm({ questions }: FeedbackFormProps) {
  const [responses, setResponses] = React.useState<
    Record<string, string | number>
  >({});

  const handleResponseChange = (questionId: string, value: string | number) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Feedback</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">Customer Survey</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Share Your Experience
          </h1>
          <p className="mt-2 text-gray-600">
            Your feedback helps us improve our services and better serve you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  {question.type === "RATING" && (
                    <Star className="w-5 h-5 text-yellow-400 mt-1" />
                  )}
                  {question.type === "TEXT" && (
                    <MessageSquare className="w-5 h-5 text-blue-400 mt-1" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      {question.question}
                    </h3>

                    {question.type === "RATING" && (
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() =>
                                  handleResponseChange(question.id, rating)
                                }
                                className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 transition-all ${
                                  responses[question.id] === rating
                                    ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                                    : "border-gray-200 hover:border-yellow-400 text-gray-700"
                                }`}
                              >
                                {rating}
                              </button>
                            ),
                          )}
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                          <span>Poor</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    )}

                    {question.type === "TEXT" && (
                      <div className="mt-4">
                        <textarea
                          value={responses[question.id] || ""}
                          onChange={(e) =>
                            handleResponseChange(question.id, e.target.value)
                          }
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Share your thoughts..."
                        />
                      </div>
                    )}

                    {question.type === "MULTIPLE_CHOICE" &&
                      question.options && (
                        <div className="mt-4 space-y-2">
                          {question.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() =>
                                handleResponseChange(question.id, option)
                              }
                              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                                responses[question.id] === option
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-blue-300 text-gray-700"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
