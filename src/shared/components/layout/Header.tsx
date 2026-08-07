import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCodeSlash } from "react-icons/io5";
import { FiMenu, FiSearch } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useCourseStore } from "../../store/useClasesStore";
import { useAuthStore } from "../../store/authStore";

interface HeaderProps {
  onOpenMenu: () => void;
}

const Header = ({ onOpenMenu }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const classes = useCourseStore((s) => s.classes);
  const { user, logout } = useAuthStore();

  const { colorMode, toggleColorMode } = useColorMode();

  const headerBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.900", "gray.100");
  const mutedTextColor = useColorModeValue("gray.600", "gray.300");
  const inputBg = useColorModeValue("white", "gray.700");
  const listBg = useColorModeValue("white", "gray.800");
  const hoverBg = useColorModeValue("purple.50", "whiteAlpha.100");

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
    <Flex
      as="header"
      width="100%"
      p="4"
      flexWrap="wrap"
      gap={2}
      bg={headerBg}
      color={textColor}
      borderBottom="1px solid"
      borderColor={borderColor}
    >
      <IconButton
        aria-label="Abrir menú"
        icon={<FiMenu />}
        display={{ base: "inline-flex", lg: "none" }}
        onClick={onOpenMenu}
        variant="ghost"
      />

      <Box>
        <Flex
          gap="5px"
          align="center"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          <Box
            bg="#6B46C1"
            h="32px"
            w="32px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="6px"
          >
            <IoCodeSlash color="#FFFFFF" size="18px" />
          </Box>

          <Flex direction="column">
            <Text fontSize="15px" fontWeight="bold">
              AyudaMemoria.dev
            </Text>
            <Text fontSize="11px" color={mutedTextColor}>
              Curso de Programación
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Spacer display={{ base: "none", md: "block" }} />

      <Box
        ref={boxRef}
        position="relative"
        w={{ base: "100%", md: "40%" }}
        order={{ base: 1, md: 0 }}
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Buscar por tema, clase,..."
            value={query}
            bg={inputBg}
            borderColor={borderColor}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          />

          <InputRightElement pointerEvents="none" color={mutedTextColor}>
            <FiSearch />
          </InputRightElement>
        </InputGroup>

        {open && resultados.length > 0 && (
          <List
            position="absolute"
            top="100%"
            left={0}
            right={0}
            zIndex={1000}
            bg={listBg}
            border="1px solid"
            borderColor={borderColor}
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
                px={3}
                py={2}
                _hover={{ bg: hoverBg }}
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

      <Spacer display={{ base: "none", md: "block" }} />

      <Flex align="center" gap="3" order={{ base: 0, md: 0 }}>
        <Text
          fontSize="sm"
          fontWeight="medium"
          display={{ base: "none", md: "block" }}
        >
          {user?.fullName}
        </Text>

        <IconButton
          aria-label="Cambiar modo oscuro"
          icon={colorMode === "light" ? <MdDarkMode /> : <MdLightMode />}
          onClick={toggleColorMode}
          size="sm"
          variant="ghost"
        />

        <Button size="sm" colorScheme="purple" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
