import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  const location = useLocation();
  const outletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outletRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <Flex direction="column" w="100%" h="100vh" overflow="hidden">
      <Box w="100%" h="64px" border="1px" borderColor="gray.200">
        <Header />
      </Box>

      <Flex flex="1" minH={0}>
        <Box w="20%" border="1px" borderColor="gray.200" overflowY="auto">
          <Sidebar />
        </Box>
        <Box w="60%" bg="gray.50" border="1px" borderColor="gray.200" overflowY="auto" ref={outletRef}>
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
