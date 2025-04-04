export interface Semester {
  periodo: number;
  materias: Subject[];
}

export interface Subject {
  id_materia: number;
  nome_materia: string;
  ch: number;
}

export interface CourseData {
  id_curso: number;
  nome_curso: string;
  formacao: string;
  campus: string;
  turno: string;
}

export interface CourseDetailed extends CourseData {
  periodos: Semester[];
}
