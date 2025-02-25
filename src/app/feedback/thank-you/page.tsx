interface ThankYouPageProps {
  searchParams?: Promise<{
    tenantId?: string;
  }>;
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const tenantId = (await searchParams)?.tenantId || "default";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="bg-white shadow-xl rounded-lg px-8 pt-8 pb-10 mb-4 text-center max-w-md w-full transform transition-all duration-300 hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We appreciate your feedback and the time you took to complete the
          survey. Your input helps us improve our services.
        </p>
        {tenantId && tenantId !== "default" && (
          <p className="text-gray-500 text-sm mt-8 border-t pt-4 border-gray-100">
            Tenant ID: {tenantId}
          </p>
        )}
      </div>
    </div>
  );
}
