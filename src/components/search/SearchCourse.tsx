"use client";

import ShowCourses from "./ShowCourses";
import { useEffect, useState, useMemo } from "react";
import { CourseData, CourseDetailed } from "@/types/types";
import { IoSearch, IoClose } from "react-icons/io5";

export default function SearchCourse({
  courses,
  onSelect,
  activateLoading,
}: Readonly<{
  courses: CourseData[];
  onSelect: (course: CourseDetailed) => void;
  activateLoading: (bool: boolean) => void;
}>) {
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const filteredCourses = useMemo(() => {
    if (!inputValue.trim()) return [];

    return courses
      .filter((course) =>
        course.nome_curso
          .toLowerCase()
          .includes(inputValue.trim().toLowerCase())
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
  }, [inputValue, courses]);

  useEffect(() => {
    if (!selectedCourse) return;

    activateLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/curso/id/${selectedCourse.id_curso}`
    )
      .then((response) => response.json())
      .then((courseData) => onSelect(courseData))
      .finally(() => activateLoading(false));

    setInputValue(selectedCourse.nome_curso);
  }, [selectedCourse, onSelect, activateLoading]);

  return (
    <div className="w-2xs flex flex-col items-center">
      <h2 className="mb-2 text-center w-full">
        {selectedCourse?.nome_curso || "Selecione seu curso"}
      </h2>
      <div className="relative w-full">
        <div className="relative">
          <input
            className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-2 px-4 bg-neutral-800 rounded-full"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTimeout(() => setShowResults(false), 110)}
            onFocus={() => setShowResults(true)}
          />
          <div className="text-neutral-400 absolute end-4 top-1/2 -translate-y-1/2 flex">
            {(inputValue && (
              <IoClose
                className="hover:cursor-pointer"
                onClick={() => setInputValue("")}
              />
            )) || <IoSearch />}
          </div>
        </div>
        {filteredCourses.length > 0 && showResults && (
          <div className="z-10 max-h-96 overflow-y-scroll absolute w-full border border-neutral-700 p-2 rounded bg-neutral-800/75 backdrop-blur mt-2">
            <ShowCourses
              courses={filteredCourses.slice(0, 15)}
              onSelect={(course) => setSelectedCourse(course)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
