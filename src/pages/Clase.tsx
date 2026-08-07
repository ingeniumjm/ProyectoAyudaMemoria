import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { useCourseStore } from "../shared/store/useClasesStore";
import BloqueCodigo from "../shared/components/bodyComponents/BloqueCodigo";
import FormAgregarContenido from "../shared/components/FormAgregarContenido";

const Clase = () => {
  const { classId, subtopicId } = useParams();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const classes = useCourseStore((s) => s.classes);
  const fetchClasses = useCourseStore((s) => s.fetchClasses);

  useEffect(() => {
    if (classes.length === 0) {
      fetchClasses();
    }
  }, [classes.length, fetchClasses]);

  const clase = classes.find((c) => c.id === classId);
  const subtema = clase?.subtopics.find((s) => s.id === subtopicId);

  return (
    <Box p={{ base: 3, md: 5 }}>
      <Flex flexWrap="wrap" gap={3}>
        <Heading as="h1" size="lg" color="#000000">
          {clase?.topicTitle ?? "Clase"}
        </Heading>

        <Spacer />

        <Button colorScheme="purple" size="sm">
          <Flex align="center" gap={1}>
            <MdOutlineFileDownload />
            Descargar el código de la clase
          </Flex>
        </Button>
      </Flex>

      {subtema && <Text mt={2}>{subtema.subtopicTitle}</Text>}

      {classId && subtopicId && (
        <Box mt={5} mb={5}>
          <Button
            colorScheme="purple"
            variant={mostrarFormulario ? "outline" : "solid"}
            onClick={() => setMostrarFormulario((prev) => !prev)}
          >
            {mostrarFormulario ? "Cerrar formulario" : "Agregar contenido"}
          </Button>

          {mostrarFormulario && (
            <FormAgregarContenido
              classId={classId}
              subtopicId={subtopicId}
              onSaved={() => setMostrarFormulario(false)}
            />
          )}
        </Box>
      )}

      {subtema?.codeBlocks.map((bloque) => (
        <BloqueCodigo key={bloque.id} bloqueCodigo={bloque} />
      ))}
    </Box>
  );
};

export default Clase;
