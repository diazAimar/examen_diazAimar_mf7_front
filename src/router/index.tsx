import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";
import PersonasPage from "../features/personas/pages";
import OrganismosPage from "../features/organismos/pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/expedientes" element={<div>Expedientes</div>} />
          <Route path="/personas" element={<PersonasPage />} />
          <Route path="/organismos" element={<OrganismosPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
