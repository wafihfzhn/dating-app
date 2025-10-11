"use client";

import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return(
    <nav className="relative z-50 border-b border-gray-200/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <h3 className="text-2xl font-bold uppercase">Dating App</h3>
          </Link>

          <div className="items-center space-x-8">
            <Link href="/matches">Discover</Link>
            <Link href="/matches/list">Matches</Link>
            <Link href="/chat">Messages</Link>
            <Link href="/profile">Profile</Link>
          </div>

          {user ? (
            <Button onClick={signOut} className="bg-[#d30000] hover:bg-[#7c0a02]">Sign Out</Button>
          ) : (
            <Link href="/login" className="bg-primary text-white px-6 py-2 rounded-md">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
