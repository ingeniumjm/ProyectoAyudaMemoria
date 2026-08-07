import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { useCourseStore } from "./shared/store/useClasesStore";
import theme from "./theme";

const App = () => {
  const fetchClasses = useCourseStore((s) => s.fetchClasses);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AppRoutes />
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
