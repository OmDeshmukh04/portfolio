"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / save as PDF" }: { label?: string }) {
  return <button type="button" className="button-link" onClick={() => window.print()}><Printer /> {label}</button>;
}
