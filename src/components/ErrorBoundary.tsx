import { onBack } from "@/utils/onBack";
import { Component, type ErrorInfo, type ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";
import { Button } from "./ui/button";

type Props = {
  children: ReactNode;
  navigate: NavigateFunction;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleGoBack = () => {
    if (this.props.navigate) {
      onBack(this.props.navigate);
    }
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const errorMessage =
        this.state.error?.message || "An unexpected error occurred";

      return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl animate-bounce">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-500">{errorMessage}</p>
            </div>
            <Button
              type="button"
              variant="secondary"
              aria-label="back"
              className="inline-flex h-10 items-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              onClick={this.handleGoBack}
            >
              Back
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
