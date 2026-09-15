"use client";

/**
 * Error Boundary Component
 *
 * Features:
 * - Catches React errors gracefully
 * - Shows friendly error message
 * - Retry button to reset error state
 * - Interview point: "Proper error handling for better UX"
 */

import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-md w-full mx-auto p-8 rounded-xl border border-red-700 bg-red-950/30 text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-300 mb-2">Something went wrong</h2>
            <p className="text-slate-400 text-sm mb-6">
              We encountered an error. Please try refreshing the page.
            </p>
            {this.state.error && (
              <p className="text-xs text-slate-500 mb-4 font-mono bg-slate-900 p-3 rounded overflow-auto max-h-32">
                {this.state.error.toString()}
              </p>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
