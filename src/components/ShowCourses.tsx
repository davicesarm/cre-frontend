import { CourseData } from "@/types/types";

export default function ShowCourses({
  courses,
  onSelect,
}: Readonly<{
  courses: CourseData[];
  onSelect: (course: CourseData) => void;
}>) {
  return (
    <div className="flex flex-col gap-2">
      {courses.map((course) => (
        <div
          onClick={() => onSelect(course)}
          className="last:border-0 hover:rounded hover:bg-neutral-700 text-left cursor-pointer border-b border-neutral-700 p-1 text-sm"
          key={course.id_curso}>
          <h2 className="mb-1 font-semibold">{course.nome_curso}</h2>
          <p className="text-xs text-green-500 font-semibold">
            {course.campus}
          </p>
          <div className="gap-1 items-end text-xs text-neutral-400 flex justify-between">
            <p className="text-nowrap">{course.turno}</p>
            <p className="text-xs">{course.formacao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
