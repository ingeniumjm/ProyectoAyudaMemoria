import { useState } from "react";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCourseStore } from "../shared/store/useClasesStore";
import BloqueCodigo from "../shared/components/bodyComponents/BloqueCodigo";
import FormAgregarContenido from "../shared/components/FormAgregarContenido";
import { MdOutlineFileDownload, MdAdd } from "react-icons/md";

const Clase = () => {
  const { classId, subtopicId } = useParams(); // gancho para traer los valores de la ruta asi poder saber que mostrar
  const classes = useCourseStore((s) => s.classes);
  const [verFormulario, setVerFormulario] = useState(false);

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
          <Flex>
            <MdOutlineFileDownload />
            Descargar el código de la clase
          </Flex>
        </Button>
      </Flex>
      {subtema && <Text mt={2}>{subtema.subtopicTitle}</Text>}

      {!verFormulario ? (
        <>
          <Button
            mt={4}
            colorScheme="purple"
            size="sm"
            leftIcon={<MdAdd />}
            onClick={() => setVerFormulario(true)}
          >
            Agregar contenido
          </Button>
          {subtema?.codeBlocks.map((bloque) => (
            <BloqueCodigo key={bloque.id} bloqueCodigo={bloque} />
          ))}
        </>
      ) : (
        <FormAgregarContenido
          classId={classId ?? ""}
          subtopicId={subtopicId ?? ""}
          onSaved={() => setVerFormulario(false)}
          onCancel={() => setVerFormulario(false)}
        />
      )}
    </Box>
  );
};

export default Clase;
