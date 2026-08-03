import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import InfoPanel from "./InfoPanel";
import Sidebar from "./Sidebar";
import { Box, Flex } from "@chakra-ui/react";

//Vamos a crear una columna horizontal
// dentro haremos tres filas
// la primera va el header
// las segunda fila el sidebar, outlet y el infopanel
// en la tercera ira el footer

const Layout = () => {
  return (
    <Flex direction="column" w="100%">
      <Box w="100%" h="64px" border="1px" borderColor="gray.200">
        <Header />
      </Box>

      <Flex h="500px">
        <Box w="20%" border="1px" borderColor="gray.200" overflowY="auto">
          <Sidebar />
        </Box>
        <Box w="60%" bg="gray.50" border="1px" borderColor="gray.200">
          {/* indico donde va cambiar y mostrar la rutas hijas */}
          <Outlet />
        </Box>
        <Box w="20%" border="1px" borderColor="gray.200" overflowY="auto">
          <InfoPanel />
        </Box>
      </Flex>

      <Box w="100%" h="auto" border="1px" borderColor="gray.200">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
