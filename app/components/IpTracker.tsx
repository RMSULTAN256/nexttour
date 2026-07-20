"use client";

import { useEffect } from "react";

interface IpifyResponse {
  ip: string;
}

export default function IPTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData: IpifyResponse = await ipRes.json();

        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ip: ipData.ip }),
        });
      } catch (error) {
        console.error("Gagal melacak pengunjung:", error);
      }
    };

    trackVisitor();
  }, []);

  return null; 
}