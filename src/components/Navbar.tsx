import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 flex justify-between items-center bg-[#1c2b3a] text-white">
      {/* Logo / Brand */}
      <Link
        href="/"
        className="text-xl font-bold font-serif hover:opacity-80 transition"
      >
        Polify
      </Link>
      {/* Navigation Links */}
      <ul className="flex gap-3 items-center">
        <li>
          <Link
            href="#about"
            className="px-4 py-2 rounded-2xl bg-[#223649] hover:bg-[#2d435d] transition duration-200 font-serif text-white"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="px-4 py-2 rounded-2xl bg-[#223649] hover:bg-[#2d435d] transition duration-200 font-serif text-white"
          >
            Contact
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-2xl bg-blue-500 hover:bg-blue-600 transition duration-200 font-serif text-white"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            href="/signin"
            className="px-4 py-2 rounded-2xl border border-white hover:bg-white hover:text-black transition duration-200 font-serif"
          >
            Sign In
          </Link>
        </li>
      </ul>
    </nav>
  );
}
