interface ThankYouPageProps {
  searchParams?: {
    tenantId?: string
  }
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const tenantId = searchParams?.tenantId || 'default'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-2">
          We appreciate your feedback and the time you took to complete the survey.
        </p>
        {tenantId && tenantId !== 'default' && (
          <p className="text-gray-500 text-sm">Tenant ID: {tenantId}</p>
        )}
      </div>
    </div>
  )
}
