import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCourseStore } from "../shared/store/useClasesStore";
import BloqueCodigo from "../shared/components/bodyComponents/BloqueCodigo";
import { MdOutlineFileDownload } from "react-icons/md";

const Clase = () => {
  const { classId, subtopicId } = useParams(); // gancho para traer los valores de la ruta asi poder saber que mostrar
  const classes = useCourseStore((s) => s.classes);

  const clase = classes.find((c) => c.id === classId);
  const subtema = clase?.subtopics.find((s) => s.id === subtopicId);
  return (
    <Box p={5}>
      <Flex>
      <Heading as="h1" size="lg" color="#000000">
        {clase?.topicTitle ?? "Clase"}
      </Heading>
           <Spacer />
      <Button colorScheme="purple" size="sm">
        <Flex >
        <MdOutlineFileDownload />
        Descargar el código de la clase
        </Flex>
      </Button>

      </Flex>
      {subtema && <Text mt={2}>{subtema.subtopicTitle}</Text>}
      {subtema?.codeBlocks.map((bloque) => (
         
        <BloqueCodigo key={bloque.id} bloqueCodigo={bloque}/>
      ))}
    </Box>
  );
};

export default Clase;
