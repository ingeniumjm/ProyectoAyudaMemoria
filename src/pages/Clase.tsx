import { Box, Button, Flex, Spacer, Stack } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import ViewCode from "../shared/components/layout/BloqueCodigo";
import BloqueCodigo from "../shared/components/layout/BloqueCodigo";

const Clase = () => {
  return (
    <Flex direction="column">
      <Box p={5}>
        <Flex>
          <p>titulo de clase</p>
          <Spacer />
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<MdOutlineFileDownload />}
              colorScheme="purple"
              variant="solid"
            >
              Descargar código de la clase
            </Button>
          </Stack>
        </Flex>
        <BloqueCodigo />
      </Box>
    </Flex>
  );
};

export default Clase;
