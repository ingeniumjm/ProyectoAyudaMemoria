import { create } from "zustand";
import type { CourseClass } from "../../types";
import { fetchClasesCurso } from "../../services/fetchClasesCurso";

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
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  classes: [],
  loading: false,
  error: null,
  seekTimestamp: null,
  playing: false,
  fetchClasses: async ()=>{
set({loading:true,error:null});
const clase=await fetchClasesCurso();
if(clase){
set({classes:clase, loading:false})

}
else{
set({error: "Error al cargar los datos", loading:false});
}
  },
  getClassById: (id) => get().classes.find((c) => c.id === id),
  setSeekTimestamp: (seconds) => set({ seekTimestamp: seconds }),
  setPlaying: (playing) => set({ playing }),
}));
