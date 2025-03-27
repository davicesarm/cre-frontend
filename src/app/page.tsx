"use client";

import SearchCourse from "@/components/SearchCourse";
import SelectSemester from "@/components/SelectSemester";
import SubjectsForm from "@/components/SubjectsForm";
import { useEffect, useState } from "react";
import { CourseData } from "@/types/types";

export default function Home() {
  const cursos = [
    "Sistemas para internet",
    "Administração",
    "Engenharia de software",
    "Redes de computadores",
  ];

  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<number>(1);

  useEffect(() => {
    if (courseData) console.log("Course data:", courseData);
  }, [courseData]);

  return (
    <main className="mt-8 flex max-w-xl mx-auto flex-col gap-8 items-center">
      <SearchCourse courses={cursos} onSelect={setCourseData} />
      {courseData && (
        <>
          <SelectSemester
            semesters={courseData.semesters.map((semester) => {
              return semester.semester;
            })}
            onSelect={setSelectedSemester}
          />

          <SubjectsForm
            subjects={
              courseData.semesters.find((semester) => {
                return semester.semester === selectedSemester;
              })?.subjects || []
            }
          />
        </>
      )}
    </main>
  );
}
