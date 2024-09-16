import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Register Page",
  description: "This project uses nextjs and appwrite",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto my-16 border rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4">Register Page</h1>
      <RegisterForm />
      <Button asChild variant={"link"} className="mt-4 mx-auto w-full">
        <Link href="/login">Already have an account?</Link>
      </Button>
    </div>
  );
}
