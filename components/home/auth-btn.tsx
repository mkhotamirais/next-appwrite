import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/appwrite/config";
import { useState } from "react";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthBtn() {
  const { user } = useAuth();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setPending(true);
    await account
      .deleteSession("current")
      .then(() => {
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      })
      .catch(() => {
        toast.error("Logged out failed");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <div>
      {!user ? (
        <>
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LogIn className="size-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={"/login"}>Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={"/register"}>Register</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex gap-2">
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={"#"}>Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onLogout}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
