"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/btia");
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-white text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-pulse">
          N
        </div>
        <p className="text-gray-400">Loading NOVA...</p>
      </div>
    </div>
  );
}
