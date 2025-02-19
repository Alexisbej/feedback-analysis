interface MetricsCardProps {
  title: string;
  value: string | number;
}

export default function MetricsCard({ title, value }: MetricsCardProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
