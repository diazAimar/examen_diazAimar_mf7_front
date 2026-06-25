import { Outlet } from "react-router";
import { Navbar } from "../Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
