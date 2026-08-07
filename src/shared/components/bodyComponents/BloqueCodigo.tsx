import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ViewCode from "./ViewCode";
import type { CodeBlock } from "../../../types";
import { useCourseStore } from "../../store/useClasesStore";
import { GoClock, GoFileCode, GoLink, GoVideo } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import { RxVideo } from "react-icons/rx";

import { PopoverFormResumen } from "../Formularios/FormResumen";
import { PopoverFormIdeas } from "../Formularios/FormIdeas";

const coloresIdeas = ["#6b46c1", "#1F76F0", "#3DB87C"];

const parseTimestamp = (t: string): number => {
  const parts = t.split(":").map((n) => parseInt(n, 10));
  if (parts.some((n) => Number.isNaN(n))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] ?? 0;
};

interface BloqueCodigoProps {
  bloqueCodigo: CodeBlock;
}

const BloqueCodigo = ({ bloqueCodigo }: BloqueCodigoProps) => {
  const setSeekTimestamp = useCourseStore((s) => s.setSeekTimestamp);
  return (
    <Box p={0}>
      <Divider p={5} />
      <Text mt={4} mb={4}>
        <strong>{bloqueCodigo.blockTitle}</strong>
      </Text>
      <ViewCode lenguaje={bloqueCodigo.language} codigo={bloqueCodigo.code} />

      <Flex flexWrap="wrap" gap={3} mt={5}>
        <p style={{ padding: 5 }}>
          <strong>¿Qué hace esta parte?</strong>
          <Spacer />
        </p>
        <Spacer />
        {/* <Button
          size="xs"
          variant="solid"
          colorScheme="blue"
          color="gray.300"
          _hover={{ bg: "#6b46c1" }}
          leftIcon={<MdEdit />}
        >
          Editar
        </Button> */}
        <PopoverFormResumen />
      </Flex>
              <Text marginBottom={5}>{bloqueCodigo.summary}</Text>
      <Flex flexWrap="wrap" gap={3} mt={5}>

        <p style={{ padding: 5 }}>
          <strong>Ideas clave para entender</strong>
        </p>
        <Spacer />
        <PopoverFormIdeas />
        {/* <Button
          size="xs"
          variant="solid"
          colorScheme="blue"
          color="gray.300"
          _hover={{ bg: "#6b46c1" }}
          leftIcon={<MdEdit />}
        >
          Editar
        </Button> */}
      </Flex>

      {/* se cambio flex por una grilla chakra 3 */}
      <SimpleGrid mt={3} spacing={4} columns={{ base: 1, sm: 2, md: 3 }}>
        {bloqueCodigo.keyIdeas.map((idea, i) => (
          <Box w="100%" key={i}>
            {/* se corrige todos los card mismo tamaño de altura */}
            <Card h="100%">
              <CardBody>
                <Heading size="sd">
                  <Flex align="center" gap={2}>
                    <BiCheck
                      size="2em"
                      color="#ffffff"
                      style={{
                        backgroundColor: coloresIdeas[i % coloresIdeas.length],
                        border: "3px solid",
                        borderRadius: "50px",
                        padding: "5px",
                      }}
                    />
                    {idea.title}
                  </Flex>
                </Heading>

                <Text pt="0" fontSize="sm">
                  {idea.description}
                </Text>
              </CardBody>
            </Card>
          </Box>
        ))}
      </SimpleGrid>
      <SimpleGrid mt={3} spacing={4} columns={{ base: 1, md: 2 }}>
        <Box w="100%">
          <Card h="100%">
            <CardBody>
              <Heading size="sd">
                {" "}
                <Flex align="center" gap={2}>
                  {<GoClock size="1em" />}
                  Ver en la clase (minuto exacto)
                </Flex>
              </Heading>
              <Text pt="0" fontSize="sm">
                Ir al minuto exacto en el video donde el profesor explica esta
                sección.
              </Text>

              <Button
                mt={2}
                size="xs"
                w={{ base: "100%", sm: "200px" }}
                border="1px"
                borderColor="gray.400"
                onClick={() =>
                  setSeekTimestamp(parseTimestamp(bloqueCodigo.videoTimestamp))
                }
              >
                <Flex align="center" gap={2}>
                  <RxVideo />
                  Ver en el video ---
                  {bloqueCodigo.videoTimestamp}
                </Flex>
              </Button>
            </CardBody>
          </Card>
        </Box>

        <Box w="100%">
          <Card h="100%">
            <CardBody>
              <Heading size="sd">
                <Flex align="center" gap={2}>
                  {<GoVideo size="1em" />}
                  Recursos para profundizar
                </Flex>
              </Heading>
              <List spacing={3} mt={4}>
                {bloqueCodigo.resources.map((recurso, i) => (
                  <ListItem key={i}>
                    <Flex align="center" gap={2}>
                      {recurso.type === "documentacion" && (
                        <GoFileCode size="1em" />
                      )}
                      {recurso.type === "video" && <GoVideo size="1em" />}
                      {recurso.type !== "documentacion" &&
                        recurso.type !== "video" && <GoLink size="1em" />}
                      {recurso.title}
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default BloqueCodigo;
