//ACA DEFINIFMOS LAS RUTAS
import { Route, Routes } from "react-router-dom";
import Layout from "../shared/components/layout/Layout";

import Home from "../pages/Home";
import Clase from "../pages/Clase";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/*Ruta pública del login a pantalla completa */}
      <Route path="/login" element={<LoginPage />} />

      {/*La ruta Padre princial es la de Layout */}
      <Route element={<Layout />}>
        {/* path es la ruta - element para quien es la ruta */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:classId/:subtopicId"
          element={
            <ProtectedRoute>
              <Clase />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
