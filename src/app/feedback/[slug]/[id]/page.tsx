import FeedbackForm from "@/features/feedback-collection/components/FeedbackForm";
import { getFeedbackQuestions } from "@/features/feedback-collection/services/feedback-service";

export default async function FeedbackPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;
  const questions = await getFeedbackQuestions(slug, id);
  const tenantId = questions.length > 0 ? questions[0].tenantId : "";

  return (
    <main className="w-2/3 mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <FeedbackForm questions={questions} tenantId={tenantId} />
      </div>
    </main>
  );
}
