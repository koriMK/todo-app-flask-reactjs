import { createBrowserRouter } from "react-router-dom";
import { LandingRoot } from "./landing/root.jsx";
import { HomePage } from "./landing/home/page.jsx";
import { SignedInHomePage } from "./landing/home/signed-in-page.jsx";
import { AboutPage } from "./about/page.jsx";
import { DashboardRoot } from "./dashboard/root.jsx";
import { DashboardHomePage } from "./dashboard/page.jsx";
import { AdminPage } from "./admin/page.jsx";
import { AdminLoginPage } from "./admin/login/page.jsx";
import { CreateAdminPage } from "./admin/create/page.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingRoot />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: "/home",
    element: <DashboardRoot />,
    children: [{ index: true, element: <SignedInHomePage /> }],
  },
  {
    path: "/about",
    element: <LandingRoot />,
    children: [{ index: true, element: <AboutPage /> }],
  },
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    children: [{ index: true, element: <DashboardHomePage /> }],
  },
  {
    path: "/admin-login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/create-admin",
    element: <CreateAdminPage />,
  },

]);
