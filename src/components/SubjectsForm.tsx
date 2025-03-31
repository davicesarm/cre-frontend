import { Subject } from "@/types/types";
import { useEffect, useState } from "react";
import { IoHelpCircleOutline } from "react-icons/io5";

export default function SubjectsForm({
  subjects,
  selectedSemester,
}: Readonly<{ subjects: Subject[]; selectedSemester: number }>) {
  const [cre, setCre] = useState<number>(0);
  const [grades, setGrades] = useState<{ [key: string]: number }>({});
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

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
      setGrades((prevGrades) => {
        let parsedValue = parseFloat(value) || 0;
        if (parsedValue > 100) parsedValue = 100;
        if (parsedValue < 0) parsedValue = 0;
        return { ...prevGrades, [subjectName]: parsedValue };
      });
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

    let calculatedCre =
      totalWeights > 0 ? totalWeightedGrades / totalWeights : 0;

    const prevCre = grades["prevCre"];
    if (prevCre !== undefined) {
      calculatedCre =
        (prevCre * (selectedSemester - 1) + calculatedCre) / selectedSemester;
    }

    setCre(calculatedCre);
  };

  return (
    <form onSubmit={calculateCre} className="flex flex-col items-center w-2xs">
      <h2 className="text-center mb-3">Preencha as notas</h2>
      <div className="mb-2 w-2/3">
        <div className="flex justify-between gap-2 mx-2 relative">
          <h3 className="text-xs mb-2 line-clamp-2">CRE atual (opcional)</h3>
          <IoHelpCircleOutline
            className="hover:cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <p className="text-neutral-300 top-4 text-xs absolute border border-neutral-700 p-2 rounded bg-neutral-800/75 backdrop-blur">
              <em>
                Para obter o CRE geral é necessário informar o valor atual do
                CRE. Sem isso o cálculo será apenas da etapa.
              </em>
            </p>
          )}
        </div>
        <input
          type="number"
          id="previous-cre"
          step="any"
          title="CRE atual (opcional)"
          value={grades["prevCre"] ?? ""}
          className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-3 bg-neutral-800 rounded-lg"
          onChange={(e) => handleInputChange("prevCre", e.target.value)}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        {subjects.map((subject, index) => (
          <div key={index} className="flex flex-col justify-end">
            <h3 className="text-xs mb-2 mx-2 line-clamp-2">
              {subject.nome_materia}
            </h3>
            <input
              type="number"
              id={subject.id_materia.toString()}
              step="any"
              title={subject.nome_materia}
              value={grades[subject.nome_materia] ?? ""}
              className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-3 bg-neutral-800 rounded-lg"
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
