import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { withNavigate } from "./withNavigate";

const ErrorBoundaryWithNavigate = withNavigate(ErrorBoundary);

const Layout = () => {
  return (
    <ErrorBoundaryWithNavigate>
      <main className="h-screen overflow-hidden p-3">
        <Outlet />
      </main>
    </ErrorBoundaryWithNavigate>
  );
};

export default Layout;
