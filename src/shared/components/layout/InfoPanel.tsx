import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useCourseStore } from "../../store/useClasesStore";
import { FaDiscord } from "react-icons/fa";
import { SiExcalidraw } from "react-icons/si";

const excalidrawUrl = "https://excalidraw.com/#json=Vn8LaFmvy1ktFn8xwzjn4,V7u_N6KRwol807AdIuGbmw"; // TODO: pegar aquí la URL de Excalidraw

const InfoPanel = () => {
  const { classId, subtopicId } = useParams();
  const getClassById = useCourseStore((s) => s.getClassById);
  const seekTimestamp = useCourseStore((s) => s.seekTimestamp);
  const playing = useCourseStore((s) => s.playing);
  const setSeekTimestamp = useCourseStore((s) => s.setSeekTimestamp);
  const setPlaying = useCourseStore((s) => s.setPlaying);

  const playerRef = useRef<HTMLVideoElement>(null);

  const clase = getClassById(classId ?? "");
  const subtema = clase?.subtopics.find((s) => s.id === subtopicId);

  useEffect(() => {
    setSeekTimestamp(null);
    setPlaying(false);
  }, [subtopicId, setSeekTimestamp, setPlaying]);

  useEffect(() => {
    if (seekTimestamp !== null && playerRef.current) {
      playerRef.current.currentTime = seekTimestamp;
      setPlaying(true);
      setSeekTimestamp(null);
    }
  }, [seekTimestamp, setPlaying, setSeekTimestamp]);

  return (
    <Box p={4}>
      <Text fontWeight="bold" mb={3}>
        Video de la clase
      </Text>
      {subtema?.videoUrl ? (
        <ReactPlayer
          ref={playerRef}
          src={subtema.videoUrl}
          width="100%"
          controls
          playing={playing}
          style={{ aspectRatio: "16/9" }}
        />
      ) : (
        <Text fontSize="sm" color="gray.500">
          Selecciona una clase para ver su video.
        </Text>
      )}

      <Text fontWeight="bold" mt={6} mb={3}>
        Enlaces útiles
      </Text>
      <Stack spacing={2}>
        <Link href={excalidrawUrl} isExternal color="purple.600">
          <Flex align="center" gap={2}>
            <SiExcalidraw />
            Diagrama en Excalidraw
          </Flex>
        </Link>
        <Link
          href="https://discord.com/channels/1499496615210389845/1499496616036663376"
          isExternal
          color="purple.600"
        >
          <Flex align="center" gap={2}>
            <FaDiscord />
            Discord del curso
          </Flex>
        </Link>
      </Stack>
    </Box>
  );
};

export default InfoPanel
