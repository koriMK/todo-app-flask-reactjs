import { Outlet } from "react-router-dom";
import { Navbar } from "../routes/landing/_components/navbar.jsx";
import { Footer } from "./footer.jsx";
import { Toaster } from "sonner";

export const SharedLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mt-16 bg-muted/50 min-h-[calc(100vh-8rem)]">
        {children || <Outlet />}
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </>
  );
};