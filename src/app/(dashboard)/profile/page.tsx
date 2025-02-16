import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              value={session?.user?.email || ""}
              className="w-full"
              disabled
            />
          </div>

          {/* Add name field and update button */}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Audit Logs</h3>
            <div className="rounded-lg border p-4">
              {/* Add audit logs table */}
            </div>
          </div>
        </CardContent>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button>Sign out</Button>
        </form>
      </Card>
    </div>
  );
}
