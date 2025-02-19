export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
