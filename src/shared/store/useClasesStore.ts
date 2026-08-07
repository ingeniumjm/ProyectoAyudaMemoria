import { create } from "zustand";
import type { CodeBlock, CourseClass } from "../../types";
import { fetchClasesCurso } from "../../services/fetchClasesCurso";

const EXTRA_BLOCKS_KEY = "ayudamemoria_extra_codeblocks";

interface ExtraCodeBlock {
  classId: string;
  subtopicId: string;
  block: CodeBlock;
}

function loadExtraBlocks(): ExtraCodeBlock[] {
  try {
    const raw = localStorage.getItem(EXTRA_BLOCKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveExtraBlock(extraBlock: ExtraCodeBlock) {
  const current = loadExtraBlocks();

  localStorage.setItem(
    EXTRA_BLOCKS_KEY,
    JSON.stringify([...current, extraBlock])
  );
}

function mergeExtraBlocks(classes: CourseClass[]): CourseClass[] {
  const extraBlocks = loadExtraBlocks();

  return classes.map((clase) => ({
    ...clase,
    subtopics: clase.subtopics.map((subtopic) => {
      const blocksForThisSubtopic = extraBlocks
        .filter(
          (item) =>
            item.classId === clase.id && item.subtopicId === subtopic.id
        )
        .map((item) => item.block);

      const originalIds = new Set(subtopic.codeBlocks.map((block) => block.id));

      const newBlocks = blocksForThisSubtopic.filter(
        (block) => !originalIds.has(block.id)
      );

      return {
        ...subtopic,
        codeBlocks: [...subtopic.codeBlocks, ...newBlocks],
      };
    }),
  }));
}

interface CourseStore {
  classes: CourseClass[];
  loading: boolean;
  error: string | null;
  seekTimestamp: number | null;
  playing: boolean;
  fetchClasses: () => Promise<void>;
  getClassById: (id: string) => CourseClass | undefined;
  setSeekTimestamp: (seconds: number | null) => void;
  setPlaying: (playing: boolean) => void;
  addCodeBlockToSubtopic: (
    classId: string,
    subtopicId: string,
    block: CodeBlock
  ) => void;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  classes: [],
  loading: false,
  error: null,
  seekTimestamp: null,
  playing: false,

  fetchClasses: async () => {
    set({ loading: true, error: null });

    const clases = await fetchClasesCurso();

    if (clases) {
      const clasesConContenidoExtra = mergeExtraBlocks(clases);

      set({
        classes: clasesConContenidoExtra,
        loading: false,
      });
    } else {
      set({
        error: "Error al cargar los datos",
        loading: false,
      });
    }
  },

  getClassById: (id) => get().classes.find((c) => c.id === id),

  setSeekTimestamp: (seconds) => set({ seekTimestamp: seconds }),

  setPlaying: (playing) => set({ playing }),

  addCodeBlockToSubtopic: (classId, subtopicId, block) => {
    saveExtraBlock({
      classId,
      subtopicId,
      block,
    });

    set((state) => ({
      classes: state.classes.map((clase) => {
        if (clase.id !== classId) return clase;

        return {
          ...clase,
          subtopics: clase.subtopics.map((subtopic) => {
            if (subtopic.id !== subtopicId) return subtopic;

            return {
              ...subtopic,
              codeBlocks: [...subtopic.codeBlocks, block],
            };
          }),
        };
      }),
    }));
  },
}));
