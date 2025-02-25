import { CreateCampaignForm } from "@/features/campaign/components/CreateCampaignForm";

export default function CreateCampaignPage() {
  return (
    <div className="min-h-screen w-[85vw] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Survey
          </h1>
          <p className="mt-2 text-gray-600">
            Design your survey to collect valuable feedback from your customers.
          </p>
        </div>
        <CreateCampaignForm />
      </div>
    </div>
  );
}
