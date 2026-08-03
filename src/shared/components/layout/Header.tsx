import {
  Flex,
  Box,
  Spacer,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { IoCodeSlash } from "react-icons/io5";
import { Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <Flex width="100%" p="4">
      <Box>
        <Flex gap="5px" align="center">
          <div
            style={{
              backgroundColor: "#6B46C1", // Color morado
              height: "32px",
              width: "32px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            <IoCodeSlash color="#FFFFFF" size="18px" />
          </div>
          <Flex direction="column">
            <p style={{ fontSize: "15px" }}>
              <strong>AyudaMemoria.dev</strong>
            </p>
            <p style={{ fontSize: "11px" }}>Curso de Programación</p>
          </Flex>
        </Flex>

        <Flex></Flex>
      </Box>
      <Spacer />
      <Box>
        <InputGroup>
          <Input type="tel" placeholder="Buscar por tema, clase,..." />
          <InputRightElement pointerEvents="none">
            <FiSearch color="gray.200" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <Spacer />
      <Box>Usuario/Login</Box>
    </Flex>
  );
};

export default Header;
