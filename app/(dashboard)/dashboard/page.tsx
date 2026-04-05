"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import React from "react";

export default function UserDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/");
  };

  return (
    <div>
      UserDashboard <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
