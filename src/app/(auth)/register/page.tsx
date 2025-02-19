import GoogleOAuthButton from "@/components/GoogleOAuthButton";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
        <p className="text-muted-foreground mt-2">
          Get started with our platform
        </p>
      </div>

      {/* <RegisterForm /> */}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">OR</span>
        </div>
      </div>

      <GoogleOAuthButton />
    </div>
  );
}
