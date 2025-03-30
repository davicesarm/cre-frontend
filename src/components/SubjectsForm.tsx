import { Subject } from "@/types/types";
import { useEffect, useState } from "react";

export default function SubjectsForm({
  subjects,
}: Readonly<{ subjects: Subject[] }>) {
  const [cre, setCre] = useState<number>(0);
  const [grades, setGrades] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setGrades({});
    setCre(0);
  }, [subjects]);

  const handleInputChange = (subjectName: string, value: string) => {
    if (value === "") {
      setGrades((prevGrades) => {
        const newGrades = { ...prevGrades };
        delete newGrades[subjectName];
        return newGrades;
      });
    } else {
      setGrades((prevGrades) => ({
        ...prevGrades,
        [subjectName]: parseFloat(value) || 0,
      }));
    }
  };

  const calculateCre = (event: React.FormEvent) => {
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

    const calculatedCre =
      totalWeights > 0 ? totalWeightedGrades / totalWeights : 0;

    setCre(calculatedCre);
  };

  return (
    <form onSubmit={calculateCre} className="flex flex-col items-center w-2xs">
      <h2 className="text-center mb-3">Preencha as notas</h2>
      <div className="w-full grid grid-cols-2 gap-2">
        {subjects.map((subject, index) => (
          <div key={index} className="flex flex-col h-full">
            <h3 className="text-xs line-clamp-2 mb-2 ml-2 flex-1">
              {subject.nome_materia}
            </h3>
            <input
              type="text"
              name={subject.nome_materia}
              id={subject.id_materia.toString()}
              title={subject.nome_materia}
              value={
                grades[subject.nome_materia] === 0
                  ? "0"
                  : grades[subject.nome_materia] || ""
              }
              className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-4 bg-neutral-800 rounded-full"
              onChange={(e) =>
                handleInputChange(subject.nome_materia, e.target.value)
              }
            />
          </div>
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
