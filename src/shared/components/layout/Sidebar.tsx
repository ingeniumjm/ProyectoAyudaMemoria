import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCourseStore } from "../../store/useClasesStore";

const Sidebar = () => {
  const classes = useCourseStore((s) => s.classes);

  return (
    <Accordion allowMultiple p={2}>
      {classes.map((clase) => (
        <AccordionItem key={clase.id} border="none">
          <AccordionButton
            _hover={{ bg: "#6b46c1", color: "white" }}
            borderRadius="md"
            px={3}
          >
            <Text fontSize="sm" flex="1" textAlign="left">
              <strong>Semana {clase.weekNumber}</strong>
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel p={0}>
            <Stack spacing={1} pl={3} pt={1}>
              {clase.subtopics.map((subtema) => (
                <Button
                  key={subtema.id}
                  as={Link}
                  to={`/clase/${clase.id}/${subtema.id}`}// la ruta para cada clase se compone de su id y el subtema
                  variant="ghost"
                  size="sm"
                  justifyContent="flex-start"
                  w="100%"
                  _hover={{ bg: "#6b46c1", color: "white" }}
                >
                  <Text fontSize="xs">{subtema.subtopicTitle}</Text>
                </Button>
              ))}
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Sidebar;
