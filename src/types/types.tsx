export interface CourseData {
  name: string;
  semesters: Semester[];
}

export interface Semester {
  semester: number;
  subjects: Subject[];
}

export interface Subject {
  name: string;
  weight: number;
}
