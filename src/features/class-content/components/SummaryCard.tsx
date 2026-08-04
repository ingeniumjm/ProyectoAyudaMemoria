import { Box, Heading, Text } from "@chakra-ui/react";

interface SummaryCardProps {
  summary: string;
  title?: string;
}

const SummaryCard = ({
  summary,
  title = "¿Qué hace esta parte?",
}: SummaryCardProps) => {
  return (
    <Box
      as="section"
      aria-labelledby="class-summary-title"
      p={{ base: 4, md: 5 }}
      border="1px solid"
      borderColor="#2a2e43"
      borderRadius="10px"
      bg="linear-gradient(135deg, #171a2a 0%, #141726 100%)"
    >
      <Heading
        id="class-summary-title"
        as="h2"
        mb={2}
        color="#f3f4f6"
        fontSize="md"
        lineHeight="1.35"
      >
        {title}
      </Heading>
      <Text color="#b8bdca" fontSize="sm" lineHeight="1.7">
        {summary}
      </Text>
    </Box>
  );
};

export default SummaryCard;
