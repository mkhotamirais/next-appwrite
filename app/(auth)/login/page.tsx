import { Metadata } from "next";
import { LoginForm } from "./login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login Page",
  description: "This project uses nextjs and appwrite",
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto my-16 border rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <LoginForm />
      <Button asChild variant={"link"} className="mt-4 mx-auto w-full">
        <Link href="/register">Do not have an account?</Link>
      </Button>
    </div>
  );
}
