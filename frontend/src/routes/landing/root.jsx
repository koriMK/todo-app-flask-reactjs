import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./_components/navbar.jsx";
import { Footer } from "@/components/footer.jsx";
import { Toaster } from "sonner";
import { useSEO } from "@/hooks/useSEO";
import { useAuthStore } from "@/stores/auth-store";

export const LandingRoot = () => {
  const { isLoggedIn } = useAuthStore();
  useSEO("TodoApp");

  // If signed in, redirect to landing page with navbar/footer
  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  // If not signed in, show only sign-in forms
  return (
    <>
      <div className="min-h-screen flex items-center justify-center landing-bg">
        <div className="bg-background rounded-xl p-8 shadow-2xl border">
          <Outlet />
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
};
