import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { MdCheck, MdContentCopy } from "react-icons/md";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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

const languageLabels: Record<CodeLanguage, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  jsx: "JSX",
  bash: "Bash",
};

interface CodeViewerProps {
  code: string;
  language: CodeLanguage;
}

const CodeViewer = ({ code, language }: CodeViewerProps) => {
  const { onCopy, hasCopied } = useClipboard(code);

  return (
    <Box
      border="1px solid"
      borderColor="#2a2e43"
      borderRadius="10px"
      overflow="hidden"
      bg="#0a0c15"
      boxShadow="0 16px 32px rgba(0, 0, 0, 0.18)"
    >
      <Flex
        align="center"
        justify="space-between"
        minH="42px"
        px={3}
        bg="#141725"
        borderBottom="1px solid"
        borderColor="#272b3d"
      >
        <Text color="#e5e7eb" fontSize="sm" fontWeight="600">
          Código
        </Text>

        <Flex align="center" gap={2}>
          <Text color="#9ca3b7" fontSize="xs">
            {languageLabels[language]}
          </Text>
          <Tooltip label={hasCopied ? "Código copiado" : "Copiar código"}>
            <IconButton
              aria-label={hasCopied ? "Código copiado" : "Copiar código"}
              icon={hasCopied ? <MdCheck /> : <MdContentCopy />}
              onClick={onCopy}
              size="xs"
              variant="ghost"
              color={hasCopied ? "#4ade80" : "#c4b5fd"}
              _hover={{ bg: "rgba(139, 92, 246, 0.18)" }}
            />
          </Tooltip>
        </Flex>
      </Flex>

      <Box overflowX="auto">
        <SyntaxHighlighter
          language={languageMap[language]}
          style={oneDark}
          showLineNumbers
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            minHeight: "190px",
            background: "#0a0c15",
            padding: "1rem",
            fontSize: "0.82rem",
            lineHeight: "1.65",
          }}
          lineNumberStyle={{
            minWidth: "2.4em",
            color: "#4b5563",
            paddingRight: "1rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default CodeViewer;
