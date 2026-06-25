import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/expedientes" element={<div>Expedientes</div>} />
          <Route path="/personas" element={<div>Personas</div>} />
          <Route path="/organismos" element={<div>Organismos</div>} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
