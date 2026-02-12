import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import PageNotFound from "./components/PageNotFound.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import ContactDetail from "./pages/contact-detail/ContactDetail.tsx";
import Landing from "./pages/landing/Landing.tsx";
import { store } from "./redux/stores/store.ts";
import { ROUTER_ROUTES } from "./utils/constants/ROUTER_ROUTES.ts";

const router = createBrowserRouter([
  {
    path: ROUTER_ROUTES.LANDING,
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: ROUTER_ROUTES.CONTACT_DETAIL + "/:id",
        element: <ContactDetail />,
      },

      { path: ROUTER_ROUTES.PAGE_NOT_FOUND, element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
);
