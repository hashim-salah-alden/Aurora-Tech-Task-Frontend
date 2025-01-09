import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 hidden md:block">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="PhysioRehab Logo"
                width={150}
                height={48}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">

            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8 ">
            <Link
              href="/doctors"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Doctors
            </Link>
            <Link
              href="/reservation"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Reservation
            </Link>
            <Link
              href="/today-sessions"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Confirm Reservation
            </Link>
            <Link
              href="/all-sessions"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              All Sessions
            </Link>
          </nav>
        </div>
      </div>
      {/* mobile header*/}
      <div className="navbar-start md:hidden flex">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 ml-4 w-96 p-8 shadow flex gap-4">
            <Link
              href="/doctors"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Doctors
            </Link>
            <Link
              href="/reservation"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Reservation
            </Link>
            <Link
              href="/today-sessions"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Confirm Reservation
            </Link>
            <Link
              href="/all-sessions"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              All Sessions
            </Link>
          </ul>
        </div>
        <Image
          src="/logo.png"
          alt="PhysioRehab Logo"
          width={150}
          height={48}
          className="rounded-full"
        />
      </div>
    </header>
  );
}