"use client";

import React, { createContext, useContext } from 'react';
import { useToast, Toast } from '@/components/ui/use-toast';

const ToastContext = createContext<ReturnType<typeof useToast> | null>(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastHelpers = useToast();

  return (
    <ToastContext.Provider value={toastHelpers}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm"
        >
          <h3 className="font-semibold">{toast.title}</h3>
          {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}