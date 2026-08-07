import { Badge, Box, Button, Flex, useClipboard } from "@chakra-ui/react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdCheck, MdContentCopy } from "react-icons/md";
import type { CodeLanguage } from "../../../types";

SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("bash", bash);

const languageMap: Record<CodeLanguage, string> = {
  html: "markup",
  css: "css",
  javascript: "javascript",
  jsx: "jsx",
  bash: "bash",
};

interface ViewCodeProps {
  lenguaje: CodeLanguage;
  codigo: string;
}

const ViewCode = ({ lenguaje, codigo }: ViewCodeProps) => {
  const { onCopy, hasCopied } = useClipboard(codigo);

  return (
    <Box position="relative" borderRadius="md" overflow="hidden">
      <Flex
        align="center"
        justify="space-between"
        bg="gray.800"
        px={3}
        py={2}
      >
        <Badge colorScheme="purple" variant="subtle">
          {lenguaje}
        </Badge>
        <Button
          size="xs"
          variant="ghost"
          colorScheme="gray"
          color="gray.300"
          _hover={{ bg: "#6b46c1" }}
          leftIcon={hasCopied ? <MdCheck /> : <MdContentCopy />}
          onClick={onCopy}
        >
          {hasCopied ? "Copiado" : "Copiar"}
        </Button>
      </Flex>
      <SyntaxHighlighter
        language={languageMap[lenguaje]}
        style={oneDark}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: "0.875rem",
          padding: "1rem",
        }}
        lineNumberStyle={{ color: "#4b5563", minWidth: "2.5em" }}
      >
        {codigo}
    </SyntaxHighlighter>
    </Box>
  );
};

export default ViewCode;
