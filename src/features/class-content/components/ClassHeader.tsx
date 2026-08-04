import type { ReactNode } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoCodeSlash } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

interface ClassHeaderProps {
  classNumber: number;
  title: string;
  action?: ReactNode;
}

const ClassHeader = ({ classNumber, title, action }: ClassHeaderProps) => {
  const formattedClassNumber = String(classNumber).padStart(2, "0");

  return (
    <Box as="header">
      <Link
        as={RouterLink}
        to="/"
        display="inline-flex"
        alignItems="center"
        gap={1}
        mb={3}
        color="#9ca3b7"
        fontSize="sm"
        _hover={{ color: "#d8b4fe", textDecoration: "none" }}
      >
        <Icon as={MdArrowBack} aria-hidden="true" />
        Volver a clases
      </Link>

      <Stack
        direction={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        gap={4}
      >
        <Flex align="center" gap={3} minW={0}>
          <Flex
            aria-hidden="true"
            flexShrink={0}
            align="center"
            justify="center"
            w="42px"
            h="42px"
            borderRadius="12px"
            color="#c084fc"
            bg="rgba(126, 34, 206, 0.2)"
            border="1px solid rgba(192, 132, 252, 0.18)"
          >
            <Icon as={IoCodeSlash} boxSize={6} />
          </Flex>

          <Box minW={0}>
            <Text color="#a78bfa" fontSize="xs" fontWeight="700">
              CONTENIDO DE LA CLASE
            </Text>
            <Heading
              as="h1"
              mt={1}
              color="#f8fafc"
              fontSize={{ base: "lg", md: "xl" }}
              lineHeight="1.3"
            >
              Clase {formattedClassNumber}: {title}
            </Heading>
          </Box>
        </Flex>

        {action && <Box flexShrink={0}>{action}</Box>}
      </Stack>
    </Box>
  );
};

export default ClassHeader;
