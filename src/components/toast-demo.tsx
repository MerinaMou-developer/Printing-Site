"use client";

import { useToast } from "./toast-provider";

export default function ToastDemo() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Toast Notification Demo</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => showSuccess(
            "Success! 🎉",
            "Your action was completed successfully.",
            { duration: 4000 }
          )}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Show Success Toast
        </button>

        <button
          onClick={() => showError(
            "Error Occurred ❌",
            "Something went wrong. Please try again.",
            { duration: 5000 }
          )}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Show Error Toast
        </button>

        <button
          onClick={() => showWarning(
            "Warning ⚠️",
            "Please check your input before proceeding.",
            { duration: 4000 }
          )}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Show Warning Toast
        </button>

        <button
          onClick={() => showInfo(
            "Information ℹ️",
            "Here's some helpful information for you.",
            { 
              duration: 6000,
              action: {
                label: "Learn More",
                onClick: () => window.open("https://example.com", "_blank")
              }
            }
          )}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Show Info Toast
        </button>
      </div>
    </div>
  );
}
