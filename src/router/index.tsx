import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "../components/MainLayout/MainLayout";
import PersonasPage from "../features/personas/pages";
import OrganismosPage from "../features/organismos/pages";
import ExpedientesPage from "../features/expedientes/pages";
import HomePage from "../features/home/pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/expedientes" element={<ExpedientesPage />} />
          <Route path="/personas" element={<PersonasPage />} />
          <Route path="/organismos" element={<OrganismosPage />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
