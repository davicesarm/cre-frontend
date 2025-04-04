import { Subject } from "@/types/types";
import React from "react";

function SubjectInput({
  subject,
  value,
  onChange,
}: {
  subject: Subject;
  value: number | "";
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col justify-end">
      <h3 className="text-xs mb-2 mx-2 line-clamp-2">{subject.nome_materia}</h3>
      <input
        type="number"
        id={subject.id_materia.toString()}
        step="any"
        title={subject.nome_materia}
        value={value}
        className="w-full text-sm focus:outline-none border focus:border-neutral-500 border-neutral-700 py-1 px-3 bg-neutral-800 rounded-lg"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default React.memo(SubjectInput);
