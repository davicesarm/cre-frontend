"use client";

import { useEffect, useRef, useState } from "react";
import ShowCourses from "./ShowCourses";
import { CourseData, CourseDetailed } from "@/types/types";

export default function SearchCourse({
  courses,
  onSelect,
}: Readonly<{
  courses: CourseData[];
  onSelect: (course: CourseDetailed) => void;
}>) {
  const [filteredCourses, setFilteredCourses] = useState<CourseData[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterCourses = (inputValue: string) => {
    if (!inputValue.trim()) {
      setFilteredCourses([]);
      return;
    }
    const filtered = courses
      .filter((course) =>
        course.nome_curso.toLowerCase().includes(inputValue.toLowerCase())
      )
      .sort((a, b) => {
        const aLower = a.nome_curso.toLowerCase();
        const bLower = b.nome_curso.toLowerCase();
        const inputLower = inputValue.toLowerCase();

        const aStartsWith = aLower.startsWith(inputLower);
        const bStartsWith = bLower.startsWith(inputLower);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        return aLower.localeCompare(bLower);
      });

    setFilteredCourses(filtered);
  };

  useEffect(() => {
    if (!selectedCourse) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/curso/id/${selectedCourse.id_curso}`
    )
      .then((response) => response.json())
      .then((courseData) => onSelect(courseData));

    inputRef.current!.value = selectedCourse.nome_curso;
  }, [selectedCourse]);

  return (
    <div className="w-2xs flex flex-col items-center">
      <h2 className="mb-2 text-center w-full">
        {selectedCourse?.nome_curso || "Selecione seu curso"}
      </h2>
      <div className="relative w-full">
        <input
          ref={inputRef}
          className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-2 px-4 bg-neutral-800 rounded-full"
          type="text"
          onChange={(e) => filterCourses(e.target.value)}
          onBlur={() => setShowResults(false)}
          onFocus={() => setShowResults(true)}
        />
        {filteredCourses.length > 0 && showResults && (
          <div className="max-h-96 overflow-x-scroll absolute w-full border border-neutral-700 p-2 rounded bg-neutral-800/75 backdrop-blur mt-2">
            <ShowCourses
              courses={filteredCourses.slice(0, 15)}
              onSelect={(course) => {
                setSelectedCourse(course);
                inputRef.current?.blur();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
