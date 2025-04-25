// /components/Nav.tsx
"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav>
      <Link href="/">Home</Link> |{" "}
      {user ? (
        <>
          {user.username} |
          <button onClick={logout} style={{ marginLeft: 8 }}>Logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  );
}
