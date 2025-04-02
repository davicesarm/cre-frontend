import { Subject } from "@/types/types";
import { useState, useCallback } from "react";
import CreInput from "./CreInput";
import SubjectInput from "./SubjectInput";

export default function SubjectsForm({
  subjects,
  selectedSemester,
}: Readonly<{ subjects: Subject[]; selectedSemester: number }>) {
  const [cre, setCre] = useState<number>(0);
  const [grades, setGrades] = useState<{ [key: string]: number }>({});

  const handleInputChange = useCallback(
    (subjectName: string, value: string) => {
      if (value === "") {
        setGrades((prevGrades) => {
          const newGrades = { ...prevGrades };
          delete newGrades[subjectName];
          return newGrades;
        });
      } else {
        setGrades((prevGrades) => {
          let parsedValue = parseFloat(value) || 0;
          if (parsedValue > 100) parsedValue = 100;
          if (parsedValue < 0) parsedValue = 0;
          return { ...prevGrades, [subjectName]: parsedValue };
        });
      }
    },
    []
  );

  const calculateCre = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      let totalWeightedGrades = 0;
      let totalWeights = 0;

      subjects.forEach((subject) => {
        const grade = grades[subject.nome_materia];
        if (grade !== undefined) {
          totalWeightedGrades += grade * subject.ch;
          totalWeights += subject.ch;
        }
      });

      let calculatedCre =
        totalWeights > 0 ? totalWeightedGrades / totalWeights : 0;

      const prevCre = grades["prevCre"];
      if (prevCre !== undefined) {
        calculatedCre =
          (prevCre * (selectedSemester - 1) + calculatedCre) / selectedSemester;
      }

      setCre(calculatedCre);
    },
    [grades, subjects, selectedSemester]
  );

  return (
    <form onSubmit={calculateCre} className="flex flex-col items-center w-2xs">
      <h2 className="text-center mb-3">Preencha as notas</h2>
      <div className="mb-2 w-2/3">
        <CreInput
          onInputChange={handleInputChange}
          creValue={grades["prevCre"] ?? ""}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        {subjects.map((subject) => (
          <SubjectInput
            key={subject.id_materia}
            subject={subject}
            value={grades[subject.nome_materia] ?? ""}
            onChange={(value) => handleInputChange(subject.nome_materia, value)}
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-8 hover:cursor-pointer hover:bg-green-600 w-full text-sm border border-green-600 py-2 px-4 bg-green-700 rounded-full">
        Calcular cre
      </button>
      {cre !== 0 && (
        <h2 className="animate-pulse text-center mt-4">
          CRE: {cre.toFixed(2)}
        </h2>
      )}
    </form>
  );
}
