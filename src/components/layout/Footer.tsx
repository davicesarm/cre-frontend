import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-center py-8 w-full">
      <Link
        href="https://www.linkedin.com/in/davicesar/"
        target="_blank"
        className="text-neutral-400 text-center text-sm">
        Davi César :D
      </Link>
    </footer>
  );
}
