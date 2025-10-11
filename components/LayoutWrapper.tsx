"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarOn = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <div className="h-full flex flex-col">
      {!shouldHideNavbar && <Navbar />}
      {children}
    </div>
  );
}
