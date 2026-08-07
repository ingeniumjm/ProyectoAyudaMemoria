import {
  Button,
  ButtonGroup,
  FocusLock,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdEdit } from "react-icons/md";

interface FormProps{
    firstFieldRef: React.RefObject<HTMLInputElement|null>
    onCancel:()=>void
}

const Form = ({ firstFieldRef, onCancel}:FormProps) => {
  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Idea Clave 1</FormLabel>
        <Input ref={firstFieldRef} type="text" />
                <FormLabel>Idea Clave 2</FormLabel>
        <Input ref={firstFieldRef} type="text" />
                <FormLabel>Idea Clave 3</FormLabel>
        <Input ref={firstFieldRef} type="text" />
        <FormHelperText>¡Dilo en tus palabras!</FormHelperText>

      </FormControl>

      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled colorScheme="teal">
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export const PopoverFormIdeas = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef<HTMLImageElement |null>(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button
            size="xs"
            variant="solid"
            colorScheme="blue"
            color="gray.300"
            _hover={{ bg: "#6b46c1" }}
            leftIcon={<MdEdit />}
          >
            Editar
          </Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};