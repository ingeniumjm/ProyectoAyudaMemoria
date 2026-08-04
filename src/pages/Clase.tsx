import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useCourseStore } from "../shared/store/useClasesStore";

const Clase = () => {
  const { classId, subtopicId } = useParams();
  const getClassById = useCourseStore((s) => s.getClassById);

  const clase = getClassById(classId ?? "");
  const subtema = clase?.subtopics.find((s) => s.id === subtopicId);

  return (
    <Box p={5}>
      <Heading as="h1" size="lg" color="#6b46c1">
        {clase?.topicTitle ?? "Clase"}
      </Heading>
      {subtema && <Text mt={2}>{subtema.subtopicTitle}</Text>}
    </Box>
  );
};

export default Clase;
