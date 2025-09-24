import { Navigate, Outlet } from "react-router-dom";
import { DashboardNavbar } from "./_components/dashboard-navbar.jsx";
import { Footer } from "@/components/footer.jsx";
import { useSEO } from "@/hooks/useSEO";
import { Toaster } from "sonner";
import { useAuthStore } from "@/stores/auth-store";

export const DashboardRoot = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  useSEO("Dashboard | TodoApp");

  return (
    <>
      <DashboardNavbar />
      <main className="mt-16 bg-muted/50 min-h-[calc(100vh-8rem)]">
        <section className="cs-section">
          <div className="cs-container">
            <Outlet />
          </div>
        </section>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
};
