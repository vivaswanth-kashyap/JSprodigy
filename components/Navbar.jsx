import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-base-100 shadow-md">
      <div className="container mx-auto navbar">
        <div className="navbar-start">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
            <span className="ml-2 text-2xl font-semibold text-primary">jsProdigy</span>
          </Link>
        </div>
        <div className="navbar-end">
          <Link href="/login" className="btn btn-ghost btn-sm rounded-btn">
            Login
          </Link>
          <Link href="/signup" className="btn btn-primary btn-sm rounded-btn ml-2">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;