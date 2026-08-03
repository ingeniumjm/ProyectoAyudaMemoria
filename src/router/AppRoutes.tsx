//ACA DEFINIFMOS LAS RUTAS
import { Route, Routes } from "react-router-dom";
import Layout from "../shared/components/layout/Layout";
import Clase from "../pages/Clase";

const AppRoutes = () => {
  return (
    <Routes>
      {/*La ruta Padre el de Layout */}
      <Route element={<Layout />}>
        {/* path es la ruta - element para quien es la ruta */}
        <Route path="/" element={<Clase />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
