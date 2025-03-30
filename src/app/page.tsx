"use client";

import SearchCourse from "@/components/SearchCourse";
import SelectSemester from "@/components/SelectSemester";
import SubjectsForm from "@/components/SubjectsForm";
import { useEffect, useState } from "react";
import { CourseDetailed, CourseData } from "@/types/types";

export default function Home() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [courseData, setCourseData] = useState<CourseDetailed | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/cursos`)
      .then((response) => response.json())
      .then((cursos: { cursos: CourseData[] }) => setCourses(cursos.cursos));
  }, []);

  return (
    <main className="mt-8 flex max-w-xl mx-auto flex-col gap-8 items-center">
      <SearchCourse
        courses={courses}
        onSelect={(courseData) => {
          setCourseData(courseData);
          setSelectedSemester(1);
        }}
      />
      {courseData && (
        <>
          <SelectSemester
            semesters={courseData.periodos.map((semester) => {
              return semester.periodo;
            })}
            selectedSemester={selectedSemester}
            onSelect={setSelectedSemester}
          />

          <SubjectsForm
            subjects={
              courseData.periodos.find((semester) => {
                return semester.periodo === selectedSemester;
              })?.materias || []
            }
          />
        </>
      )}
    </main>
  );
}
