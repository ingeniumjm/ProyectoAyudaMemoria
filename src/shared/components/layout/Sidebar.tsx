import { Box } from "@chakra-ui/react";
import { useMatch } from "react-router-dom";
import { useCourseStore } from "../../store/useClasesStore";
import GrupoSemanas from "./GrupoSemanas";
import type { GrupoCertificado } from "./GrupoSemanas";
import type { CourseClass } from "../../../types";

const agruparPorCertificado = (classes: CourseClass[]): GrupoCertificado[] => {
  const grupos: GrupoCertificado[] = [];
  classes.forEach((clase) => {
    const grupo = grupos.find((g) => g.certificate === clase.certificate);
    if (grupo) {
      grupo.clases.push(clase);
    } else {
      grupos.push({ certificate: clase.certificate, clases: [clase] });
    }
  });
  return grupos;
};

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const classes = useCourseStore((s) => s.classes);
  const match = useMatch("/:classId/:subtopicId");
  const grupos = agruparPorCertificado(classes);

  return (
    <Box as="nav" aria-label="Clases del curso" p={2}>
      {grupos.map((grupo) => (
        <GrupoSemanas
          key={grupo.certificate}
          grupo={grupo}
          classIdActivo={match?.params.classId}
          subtopicIdActivo={match?.params.subtopicId}
          onNavigate={onNavigate}
        />
      ))}
    </Box>
  );
};

export default Sidebar;
