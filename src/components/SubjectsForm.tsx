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
    setGrades((prevGrades) => ({
      ...prevGrades,
      [subjectName]: parseFloat(value) || 0,
    }));
  };

  const calculateCre = (event: React.FormEvent) => {
    event.preventDefault();
    let totalWeightedGrades = 0;
    let totalWeights = 0;

    subjects.forEach((subject) => {
      const grade = grades[subject.name] || 0;
      totalWeightedGrades += grade * subject.weight;
      totalWeights += subject.weight;
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
          <div key={index}>
            <h3 className="text-xs truncate mb-2 ml-2">{subject.name}</h3>
            <input
              type="text"
              name={subject.name}
              id={subject.name}
              title={subject.name}
              value={grades[subject.name] || ""}
              className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-4 bg-neutral-800 rounded-full"
              onChange={(e) => handleInputChange(subject.name, e.target.value)}
              required
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
