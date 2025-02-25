import FeedbackForm from "@/features/feedback-collection/components/FeedbackForm";
import { getFeedbackQuestions } from "@/features/feedback-collection/feedbackCollectionService";

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const questions = await getFeedbackQuestions(slug, id);

  return (
    <main className="w-2/3 mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <FeedbackForm questions={questions} />
      </div>
    </main>
  );
}
