"use client";
import useLogout from "@/hooks/useLogout";

export default function UserDashboard() {
  const { handleLogout } = useLogout();

  return (
    <div>
      UserDashboard <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
