import { Box, Flex, Spacer } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      p={5}
      direction={{ base: "column", md: "row" }}
      gap={2}
      alignItems="center"
      textAlign="center"
    >
      <Box>
        <p>Grupo6 @ 2026 </p>
      </Box>
      <Spacer display={{ base: "none", md: "block" }} />
      <Box>
        <p>Juan | Alejando | Diego | Jorge | Anderson </p>
      </Box>
      <Spacer display={{ base: "none", md: "block" }} />
      <Box></Box>
    </Flex>
  );
};

export default Footer;
