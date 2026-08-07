import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Footer from "./Footer";
import Header from "./Header";
import InfoPanel from "./InfoPanel";
import Sidebar from "./Sidebar2";
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

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

const {isOpen, onOpen, onClose}=useDisclosure();
const rutaHome=location.pathname==="/"    // devuelve si esta home

  return (
    <Flex direction="column" w="100%" minH="100vh">
      <Box w="100%" minH="64px" position="relative" zIndex={1} border="1px" borderColor="gray.200">
        <Header onOpenMenu={onOpen} />
      </Box>

      <Flex flex="1" direction={{ base: "column", lg: "row" }}>
        <Box
          display={{ base: "none", lg: "block" }}
          w={{ base: "100%", lg: "20%" }}
          border="1px"
          borderColor="gray.200"
          overflowY="auto"
        >
          <Sidebar />
        </Box>
        <Box
          w={{ base: "100%", lg: "60%" }}
          order={{ base: 2, lg: "0" }}
          bg="gray.50"
          border="1px"
          borderColor="gray.200"
          overflowY="auto"
          ref={outletRef}
        >
          {/* indico donde va cambiar y mostrar la rutas hijas */}
          <Outlet />
        </Box>
        <Box
          w={{ base: "100%", lg: "20%" }}
          order={{ base: 1, lg: "0" }}
          border="1px"
          borderColor="gray.200"
          overflowY="auto"
          display={{base: rutaHome?"none": "block", lg:"block"}}
        >
          <InfoPanel/>
        </Box>
      </Flex>

      <Box w="100%" h="auto" border="1px" borderColor="gray.200">
        <Footer />
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody p={0}>
            <Sidebar onNavigate={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Layout;
