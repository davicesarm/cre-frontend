export default function SelectSemester({
  semesters,
  selectedSemester,
  onSelect,
}: Readonly<{
  semesters: number[];
  selectedSemester: number;
  onSelect: (semester: number) => void;
}>) {
  return (
    <div className="flex flex-col items-center w-2xs">
      <h2 className="text-center mb-2">Selecione o período</h2>
      <ul className="justify-center flex w-full gap-4 flex-wrap">
        {semesters.map((semester) => {
          return (
            <li key={semester}>
              <input
                type="radio"
                id={semester.toString()}
                value={semester}
                name="semester"
                className="hidden peer"
                checked={selectedSemester === semester}
                onChange={() => onSelect(semester)}
                required
              />
              <label
                htmlFor={semester.toString()}
                className="w-8 h-8 justify-center text-sm flex items-center p-2 text-neutral-200 bg-neutral-800 border border-neutral-700 rounded-lg cursor-pointer peer-checked:border-neutral-100 peer-checked:text-neutral-100  hover:peer-checked:text-neutral-100 hover:peer-checked:border-neutral-100 hover:border-neutral-600 hover:bg-neutral-700">
                <p>{semester}</p>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
