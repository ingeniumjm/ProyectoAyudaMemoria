import { create } from "zustand";
import type { CourseClass } from "../../types";

interface CourseStore {
  classes: CourseClass[];
  loading: boolean;
  error: string | null;
  fetchClasses: () => Promise<void>;
  getClassById: (id: string) => CourseClass | undefined;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  classes: [],
  loading: false,
  error: null,
  fetchClasses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/datos.json");
      if (!res.ok) throw new Error("Error al cargar datos: " + res.status);
      const data = (await res.json()) as { classes: CourseClass[] };
      set({ classes: data.classes, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  getClassById: (id) => get().classes.find((c) => c.id === id),
}));
