"use client";

import SearchCourse from "@/components/SearchCourse";
import SelectSemester from "@/components/SelectSemester";
import SubjectsForm from "@/components/SubjectsForm";
import { useEffect, useState, useMemo, useCallback } from "react";
import { CourseDetailed, CourseData } from "@/types/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Home() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [courseData, setCourseData] = useState<CourseDetailed | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/cursos`)
      .then((response) => response.json())
      .then((cursos: { cursos: CourseData[] }) => setCourses(cursos.cursos));
  }, []);

  const semesters = useMemo(() => {
    return courseData?.periodos.map((semester) => semester.periodo) || [];
  }, [courseData]);

  const subjects = useMemo(() => {
    return (
      courseData?.periodos.find(
        (semester) => semester.periodo === selectedSemester
      )?.materias || []
    );
  }, [courseData, selectedSemester]);

  const handleSelectCourse = useCallback((courseData: CourseDetailed) => {
    setCourseData(courseData);
    setSelectedSemester(1);
  }, []);

  return (
    <main className="mt-8 flex max-w-xl mx-auto flex-col gap-8 items-center">
      <SearchCourse
        courses={courses}
        onSelect={handleSelectCourse}
        activateLoading={setIsLoading}
      />

      {isLoading && (
        <AiOutlineLoading3Quarters className="animate-spin mt-40 text-4xl" />
      )}

      {!isLoading && courseData?.periodos && (
        <>
          <SelectSemester
            semesters={semesters}
            selectedSemester={selectedSemester}
            onSelect={setSelectedSemester}
          />

          <SubjectsForm
            subjects={subjects}
            selectedSemester={selectedSemester}
          />
        </>
      )}
    </main>
  );
}
