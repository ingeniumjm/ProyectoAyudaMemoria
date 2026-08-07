import type { CourseClass } from "../types";
//creamos la funcion para hacer fecth a la Api, nos va a devolver en json
//Nota: ***Tipado*** siempre un fecth se tipa con Promise(Promesa) en este caso 
//lo que va llegar de la Api es de tipo <CourseClass[]> array de objetos
//y lo tenemos difinido en types
export async function fetchClasesCurso(): Promise<CourseClass[] | null> {

    try{
            const res=await fetch("/datos.json");
            const data=await res.json();
            return  data.classes;         
            // si todo es correcto devuelve el classes
    }

    catch {
        return null;
        //si hay un error devuelve un null 
    }
}
