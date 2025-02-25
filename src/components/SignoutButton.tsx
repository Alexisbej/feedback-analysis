import { signOut } from "@/auth";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default async function SignoutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <DropdownMenuItem>
        <button className="cursor-pointer">Logout</button>
      </DropdownMenuItem>
    </form>
  );
}
