import { Outlet } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Layout = () => {
  return (
    <ErrorBoundary>
      <main className="h-screen overflow-hidden p-3">
        <Outlet />
      </main>
    </ErrorBoundary>
  );
};

export default Layout;
