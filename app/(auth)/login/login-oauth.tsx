"use client";

import { account } from "@/appwrite/config";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { OAuthProvider } from "appwrite";

export default function LoginOauth() {
  const loginGithub = () => {
    account.createOAuth2Session(OAuthProvider.Github, "http://localhost:3000", "http://localhost:3000/login");
  };

  return (
    <div>
      <Button onClick={loginGithub}>
        <SiGithub className="size-4 mr-2" />
        Github
      </Button>
    </div>
  );
}
