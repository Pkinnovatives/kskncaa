import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred.";
      let errorDetails = this.state.error?.message;

      // Try to parse Firestore error info
      try {
        if (errorDetails && errorDetails.startsWith('{')) {
          const parsedError = JSON.parse(errorDetails);
          if (parsedError.error && parsedError.error.includes('permission-denied')) {
            errorMessage = "You don't have permission to access this data.";
            errorDetails = "Please ensure you are logged in with the correct account.";
          } else if (parsedError.error) {
             errorMessage = "A database error occurred.";
             errorDetails = parsedError.error;
          }
        }
      } catch (e) {
        // Not a JSON error string, just use the raw message
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2 font-serif">Oops! Something went wrong</h1>
            <p className="text-slate-600 mb-4">{errorMessage}</p>
            {errorDetails && (
              <div className="bg-slate-50 p-4 rounded-lg text-left mb-6 overflow-auto max-h-40 text-sm text-slate-500 font-mono">
                {errorDetails}
              </div>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.href = '/';
              }}
              className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
