"use client";

import { useEffect, useRef, useState } from "react";
import ShowCourses from "./ShowCourses";
import { CourseData } from "@/types/types";

export default function SearchCourse({
  courses,
  onSelect,
}: Readonly<{ courses: string[]; onSelect: (course: CourseData) => void }>) {
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filterCourses = (inputValue: string) => {
    if (!inputValue.trim()) {
      setFilteredCourses([]);
      return;
    }
    const filtered = courses.filter((course) =>
      course.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  useEffect(() => {
    if (!selectedCourse) return;
    const sistemas = {
      name: "Sistemas para internet",
      semesters: [
        {
          semester: 1,
          subjects: [
            {
              name: "Banco de Dados I ",
              weight: 80,
            },
            { name: "Ciência, Tecnologia e Meio Ambiente ", weight: 40 },
            {
              name: "Estruturas de Dados ",
              weight: 80,
            },
            { name: "Fundamentos da Metodologia", weight: 40 },
            {
              name: "Linguagens de Script ",
              weight: 80,
            },
            {
              name: "Protocolos de Interconexão de Redes de Computadores ",
              weight: 80,
            },
            { name: "Sistemas Operacionais", weight: 100 },
          ],
        },
        {
          semester: 2,
          subjects: [
            { name: "Banco", weight: 100 },
            { name: "Pweb", weight: 40 },
            { name: "Poo", weight: 80 },
          ],
        },
      ],
    };
    const adm = {
      name: "Administraçao",
      semesters: [
        {
          semester: 1,
          subjects: [
            { name: "Sla", weight: 80 },
            { name: "dinheiro", weight: 90 },
            { name: "economia", weight: 80 },
          ],
        },
        {
          semester: 2,
          subjects: [
            { name: "ota coisa", weight: 100 },
            { name: "teste", weight: 40 },
            { name: "som", weight: 80 },
          ],
        },
      ],
    };
    if (selectedCourse === "Sistemas para internet") {
      onSelect(sistemas);
    } else onSelect(adm);
    inputRef.current!.value = selectedCourse;
  }, [selectedCourse]);

  return (
    <div className="w-2xs flex flex-col items-center">
      <h2 className="mb-2 text-center w-full">
        {selectedCourse || "Selecione seu curso"}
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
          <div className="absolute w-full border border-neutral-700 p-2 rounded bg-neutral-800 mt-4">
            <ShowCourses
              courses={filteredCourses.slice(0, 8)}
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
