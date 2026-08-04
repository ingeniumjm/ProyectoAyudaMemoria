import { Box, Flex, Spacer } from "@chakra-ui/react";
import ViewCode from "./ViewCode";

const BloqueCodigo = () => {
  return (
    <Box p={0}>
      <p style={{ color: "#6b46c1", padding: 5 }}>
        <strong>bloque 1 titulo</strong>
      </p>
      <ViewCode
        lenguaje="javascript"
        codigo={`const mensaje = 'Hola desde ViewCode';
            console.log(mensaje);`}
      />
      <p style={{ padding: 5 }}>
        <strong>¿Qué hace esta parte?</strong>
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed accusamus
        dolorum dolores quae. Alias adipisci eos a reprehenderit ullam molestiae
        temporibus sint excepturi, necessitatibus suscipit, numquam libero
        accusamus voluptate omnis?
      </p>
      <Flex>
        <Box>1</Box>
        <Spacer />
        <Box>2</Box>
        <Spacer />
        <Box>3</Box>
      </Flex>
    </Box>
  );
};

export default BloqueCodigo;
