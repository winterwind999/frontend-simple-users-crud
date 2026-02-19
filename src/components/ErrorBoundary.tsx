import { ROUTER_ROUTES } from "@/utils/constants/ROUTER_ROUTES";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  children: ReactNode;
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
    this.setState({ hasError: false, error: null });

    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = ROUTER_ROUTES.LANDING;
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const errorMessage =
        this.state.error?.message || "An unexpected error occurred";

      return (
        <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="w-full space-y-6 text-center">
            <div className="space-y-3">
              <h1 className="animate-bounce text-4xl font-bold tracking-tighter sm:text-5xl">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-500">{errorMessage}</p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="secondary"
                aria-label="go-back"
                onClick={this.handleGoBack}
              >
                Go Back
              </Button>

              <Button
                type="button"
                aria-label="reload"
                onClick={this.handleReload}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
