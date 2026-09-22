"use client";

import { useEffect } from "react";

export default function DashboardRedirect() {
  useEffect(() => {
    // Automatically redirect /dashboard to clean home url /
    window.location.replace("/");
  }, []);

  return null;
}
