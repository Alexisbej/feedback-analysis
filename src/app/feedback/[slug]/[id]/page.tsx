import FeedbackForm from "@/features/feedback-collection/components/FeedbackForm";
import { getFeedbackQuestions } from "@/features/feedback-collection/feedbackCollectionService";

export default async function FeedbackPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = await params;
  const questions = await getFeedbackQuestions(slug, id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Leave your feedback
          </h1>
        </div>
      </header>
      <main className="w-2/3 mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <FeedbackForm questions={questions} />
        </div>
      </main>
    </div>
  );
}
