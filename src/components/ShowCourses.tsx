export default function ShowCourses({
  courses,
  onSelect,
}: Readonly<{ courses: string[]; onSelect: (course: string) => void }>) {
  return (
    <div
      className="flex flex-col gap-2"
      onMouseDown={(e) => e.preventDefault()}>
      {courses.map((course) => (
        <button
          onClick={() => onSelect(course)}
          className="hover:rounded hover:bg-neutral-700 text-left cursor-pointer border-b border-neutral-700 p-1 text-sm"
          key={course}>
          {course}
        </button>
      ))}
    </div>
  );
}
