import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  SimpleGrid,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import type { CodeLanguage, ResourceType } from "../../types";

interface Props {
  classId: string;
  subtopicId: string;
  onSaved?: () => void;
  onCancel?: () => void;
}

const FormAgregarContenido = ({ onSaved, onCancel }: Props) => {
  const [form, setForm] = useState({
    blockTitle: "",
    language: "html" as CodeLanguage,
    code: "",
    summary: "",
    idea1Title: "",
    idea1Description: "",
    idea2Title: "",
    idea2Description: "",
    idea3Title: "",
    idea3Description: "",
    videoTimestamp: "",
    resourceTitle: "",
    resourceUrl: "",
    resourceType: "documentacion" as ResourceType,
    personalNotes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSaved?.();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      mt={5}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isRequired>
          <FormLabel>Título del bloque</FormLabel>
          <Input
            name="blockTitle"
            value={form.blockTitle}
            onChange={handleChange}
            placeholder="Ej: Estructura básica de HTML"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Lenguaje</FormLabel>
          <Select name="language" value={form.language} onChange={handleChange}>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
            <option value="jsx">JSX</option>
            <option value="bash">Bash</option>
          </Select>
        </FormControl>

        <FormControl gridColumn={{ md: "span 2" }} isRequired>
          <FormLabel>Código</FormLabel>
          <Textarea
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="Pega aquí el código"
            minH="180px"
          />
        </FormControl>

        <FormControl gridColumn={{ md: "span 2" }}>
          <FormLabel>Explicación</FormLabel>
          <Textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Explica qué hace este código"
          />
        </FormControl>

        <FormControl gridColumn={{ md: "span 2" }}>
          <FormLabel>Ideas clave</FormLabel>

          <VStack align="stretch" spacing={3}>
            <HStack>
              <Input
                name="idea1Title"
                value={form.idea1Title}
                onChange={handleChange}
                placeholder="Idea 1"
              />
              <Input
                name="idea1Description"
                value={form.idea1Description}
                onChange={handleChange}
                placeholder="Descripción"
              />
            </HStack>

            <HStack>
              <Input
                name="idea2Title"
                value={form.idea2Title}
                onChange={handleChange}
                placeholder="Idea 2"
              />
              <Input
                name="idea2Description"
                value={form.idea2Description}
                onChange={handleChange}
                placeholder="Descripción"
              />
            </HStack>

            <HStack>
              <Input
                name="idea3Title"
                value={form.idea3Title}
                onChange={handleChange}
                placeholder="Idea 3"
              />
              <Input
                name="idea3Description"
                value={form.idea3Description}
                onChange={handleChange}
                placeholder="Descripción"
              />
            </HStack>
          </VStack>
        </FormControl>

        <FormControl>
          <FormLabel>Minuto del video</FormLabel>
          <Input
            name="videoTimestamp"
            value={form.videoTimestamp}
            onChange={handleChange}
            placeholder="Ej: 05:30"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Tipo de recurso</FormLabel>
          <Select name="resourceType" value={form.resourceType} onChange={handleChange}>
            <option value="documentacion">Documentación</option>
            <option value="video">Video</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Título del recurso</FormLabel>
          <Input
            name="resourceTitle"
            value={form.resourceTitle}
            onChange={handleChange}
            placeholder="Ej: MDN HTML"
          />
        </FormControl>

        <FormControl>
          <FormLabel>URL del recurso</FormLabel>
          <Input
            name="resourceUrl"
            value={form.resourceUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </FormControl>

        <FormControl gridColumn={{ md: "span 2" }}>
          <FormLabel>Notas personales</FormLabel>
          <Textarea
            name="personalNotes"
            value={form.personalNotes}
            onChange={handleChange}
            placeholder="Notas opcionales"
          />
        </FormControl>
      </SimpleGrid>

      <HStack justify="flex-end" mt={5}>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" colorScheme="purple">
          Guardar
        </Button>
      </HStack>
    </Box>
  );
};

export default FormAgregarContenido;
