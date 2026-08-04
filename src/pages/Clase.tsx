import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import courseDataJson from "../data/datos.json";
import {
  ClassHeader,
  CodeViewer,
  DownloadButton,
  SummaryCard,
} from "../features/class-content/components";
import type { CourseClass, CourseData } from "../types";

const courseData = courseDataJson as CourseData;

const buildClassDownload = (courseClass: CourseClass) =>
  courseClass.subtopics
    .flatMap((subtopic) =>
      subtopic.codeBlocks.map(
        (block) =>
          `/* ${subtopic.subtopicTitle} — ${block.blockTitle} */\n${block.code}`,
      ),
    )
    .join("\n\n");

const Clase = () => {
  const courseClass =
    courseData.classes.find(({ weekNumber }) => weekNumber === 6) ??
    courseData.classes[0];
  const subtopic =
    courseClass?.subtopics.find(({ id }) => id === "arrays") ??
    courseClass?.subtopics[0];
  const codeBlock = subtopic?.codeBlocks[0];

  if (!courseClass || !subtopic || !codeBlock) {
    return (
      <Box p={6} color="red.300" bg="#0f1120">
        No se pudo cargar el contenido de la clase.
      </Box>
    );
  }

  const sectionNumber = courseClass.subtopics.findIndex(
    ({ id }) => id === subtopic.id,
  );
  const downloadContent = buildClassDownload(courseClass);

  return (
    <Box
      as="main"
      h="100%"
      overflowY="auto"
      bg="#0f1120"
      color="#f8fafc"
      p={{ base: 4, md: 6 }}
      textAlign="left"
    >
      <VStack align="stretch" spacing={5}>
        <ClassHeader
          classNumber={courseClass.weekNumber}
          title={courseClass.topicTitle}
          action={
            <DownloadButton
              content={downloadContent}
              fileName={`clase-${String(courseClass.weekNumber).padStart(2, "0")}-codigo-completo.js`}
            />
          }
        />

        <Box as="section" aria-labelledby="current-section-title">
          <Text color="#c084fc" fontSize="sm" fontWeight="700">
            Sección {sectionNumber + 1}
          </Text>
          <Heading
            id="current-section-title"
            as="h2"
            mt={1}
            mb={3}
            color="#e5e7eb"
            fontSize="md"
          >
            {subtopic.subtopicTitle} — {codeBlock.blockTitle}
          </Heading>

          <CodeViewer code={codeBlock.code} language={subtopic.language} />
        </Box>

        <SummaryCard summary={codeBlock.summary} />
      </VStack>
    </Box>
  );
};

export default Clase;
