import { CreateCampaignForm } from "@/features/campaign/components/CreateCampaignForm";

export default function CreateCampaignPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Survey</h1>
      <CreateCampaignForm />
    </div>
  );
}
