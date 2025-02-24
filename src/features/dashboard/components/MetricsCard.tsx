interface MetricsCardProps {
  title: string;
  value: string | number;
}

export default function MetricsCard({ title, value }: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition-shadow duration-200">
      <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
      <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}
