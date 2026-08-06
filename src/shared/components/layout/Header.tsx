import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCodeSlash } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useCourseStore } from "../../store/useClasesStore";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const classes = useCourseStore((s) => s.classes);
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const resultados = query.trim()
    ? classes.flatMap((clase) =>
        clase.subtopics
          .filter((s) =>
            s.subtopicTitle.toLowerCase().includes(query.trim().toLowerCase())
          )
          .map((s) => ({ clase, subtema: s }))
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Flex width="100%" p="4">
      <Box>
        <Flex
          gap="5px"
          align="center"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          <div
            style={{
              backgroundColor: "#6B46C1", // Color morado
              height: "32px",
              width: "32px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
            }}
          >
            <IoCodeSlash color="#FFFFFF" size="18px" />
          </div>
          <Flex direction="column">
            <p style={{ fontSize: "15px" }}>
              <strong>AyudaMemoria.dev</strong>
            </p>
            <p style={{ fontSize: "11px" }}>Curso de Programación</p>
          </Flex>
        </Flex>

        <Flex></Flex>
      </Box>
      <Spacer />
      <Box ref={boxRef} position="relative" w="40%">
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar por tema, clase,..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          />
          <InputRightElement pointerEvents="none">
            <FiSearch color="gray.200" />
          </InputRightElement>
        </InputGroup>
        {open && resultados.length > 0 && (
          <List
            position="absolute"
            top="100%"
            left={0}
            right={0}
            zIndex={1000}
            bg="white"
            border="1px"
            borderColor="gray.200"
            boxShadow="md"
            borderRadius="md"
            maxH="300px"
            overflowY="auto"
            mt={1}
          >
            {resultados.map(({ clase, subtema }) => (
              <ListItem
                key={subtema.id}
                cursor="pointer"
                _hover={{ bg: "purple.50" }}
                onClick={() => {
                  navigate(`/${clase.id}/${subtema.id}`);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {subtema.subtopicTitle}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Spacer />
      <Flex align="center" gap="3">
        <Text fontSize="sm" fontWeight="medium">
          {user?.fullName}
        </Text>
        <Button size="sm" colorScheme="purple" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
