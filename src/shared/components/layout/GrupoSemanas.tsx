import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { CourseClass } from "../../../types";

// mismo mapa que usa Home.tsx; si los colores cambian allá hay que actualizarlos aquí
const colorTagCertificados: Record<string, string> = {
  "Frontend Foundations": "purple",
  "Frontend Interactive": "blue",
  "React Mastery": "green",
};

export interface GrupoCertificado {
  certificate: string;
  clases: CourseClass[];
}

interface GrupoSemanasProps {
  grupo: GrupoCertificado;
  classIdActivo?: string;
  subtopicIdActivo?: string;
  onNavigate?: () => void;
}

const GrupoSemanas = ({
  grupo,
  classIdActivo,
  subtopicIdActivo,
  onNavigate,
}: GrupoSemanasProps) => {
  const [abiertos, setAbiertos] = useState<number[]>([]);
  const [claseSincronizada, setClaseSincronizada] = useState<string | undefined>(
    undefined,
  );

  // al cambiar la clase activa se expande su semana, sin pisar lo que el usuario abrió o cerró
  if (classIdActivo !== claseSincronizada) {
    setClaseSincronizada(classIdActivo);
    const indiceActivo = grupo.clases.findIndex((c) => c.id === classIdActivo);
    if (indiceActivo >= 0 && !abiertos.includes(indiceActivo)) {
      setAbiertos([...abiertos, indiceActivo]);
    }
  }

  return (
    <Box mb={2}>
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wide"
        color={`${colorTagCertificados[grupo.certificate] ?? "gray"}.600`}
        px={3}
        pt={2}
        pb={1}
      >
        {grupo.certificate}
      </Text>
      <Accordion
        allowMultiple
        index={abiertos}
        onChange={(indices: number | number[]) =>
          setAbiertos(Array.isArray(indices) ? indices : [indices])
        }
      >
        {grupo.clases.map((clase) => {
          const esClaseActiva = clase.id === classIdActivo;
          return (
            <AccordionItem key={clase.id} border="none">
              <AccordionButton
                bg={esClaseActiva ? "purple.100" : undefined}
                _hover={{ bg: "#6b46c1", color: "white" }}
                borderRadius="md"
                px={3}
              >
                <Text fontSize="sm" flex="1" textAlign="left">
                  <strong>Semana {clase.weekNumber} </strong>
                  <br />
                  {clase.topicTitle}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0}>
                <Stack spacing={1} pl={3} pt={1}>
                  {clase.subtopics.map((subtema) => {
                    const esSubtemaActivo =
                      esClaseActiva && subtema.id === subtopicIdActivo;
                    return (
                      <Button
                        key={subtema.id}
                        as={Link}
                        to={`/${clase.id}/${subtema.id}`}// la ruta para cada clase se compone de su id y el subtema
                        variant="ghost"
                        size="sm"
                        justifyContent="flex-start"
                        w="100%"
                        onClick={onNavigate}
                        aria-current={esSubtemaActivo ? "page" : undefined}
                        bg={esSubtemaActivo ? "#6b46c1" : undefined}
                        color={esSubtemaActivo ? "white" : undefined}
                        _hover={{ bg: "#6b46c1", color: "white" }}
                      >
                        <Text fontSize="xs">{subtema.subtopicTitle}</Text>
                      </Button>
                    );
                  })}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default GrupoSemanas;
