"use client";
import { useEffect, useState } from "react";

type ToastData = { message: string; type?: 'success' | 'error' | 'info' };

export default function Toast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  useEffect(() => {
    const t = setInterval(() => {
      const m = localStorage.getItem("mt_toast");
      if (m) {
        try {
          const parsed = JSON.parse(m);
          if (typeof parsed === 'string') {
            setToast({ message: parsed });
          } else {
            setToast(parsed);
          }
        } catch {
          setToast({ message: m });
        }
        localStorage.removeItem("mt_toast");
        setTimeout(() => setToast(null), 2500);
      }
    }, 500);
    return () => clearInterval(t);
  }, []);
  if (!toast) return null;
  const bgColor = toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-black/80';
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded text-white shadow z-50 ${bgColor}`}>{toast.message}</div>
  );
}
