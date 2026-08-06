import { useEffect } from "react";
import { Badge, Box, Card, CardBody, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCourseStore } from "../shared/store/useClasesStore";

const usuario = "estudiante";

const certificadoColors: Record<string, string> = {
  "Frontend Foundations": "purple",
  "Frontend Interactive": "blue",
  "React Mastery": "green",
};

const Home = () => {
  const classes = useCourseStore((s) => s.classes);
  const fetchClasses = useCourseStore((s) => s.fetchClasses);

  useEffect(() => {
    if (classes.length === 0) fetchClasses();
  }, [classes.length, fetchClasses]);

  return (
    <Box p={5}>
      <Heading size="lg" mb={6}>
        Bienvenido/a @{usuario}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {classes.map((clase) => (
          <Card
            key={clase.id}
            _hover={{ boxShadow: "lg" }}
            transition="box-shadow 0.2s"
          >
            <CardBody
              as={Link}
              to={`/clase/${clase.id}/${clase.subtopics[0]?.id ?? ""}`}
              position="relative"
              pb={10}
            >
              <Text fontWeight="bold">Semana {clase.weekNumber}</Text>
              <Text>{clase.topicTitle}</Text>
              <Badge
                colorScheme={certificadoColors[clase.certificate] ?? "gray"}
                position="absolute"
                right={3}
                bottom={3}
              >
                {clase.certificate}
              </Badge>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home
