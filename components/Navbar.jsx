import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="">
      <div className="container bg-base-300 mx-auto py-6 px-4">
        <nav className="flex items-center justify-between space-x-20">
          <Link href="/">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Logo" width={32} height={32} className="mx-2" />
              <span className="font-semibold text-xl text-primary">jsProdigy</span>
            </div>
          </Link>
          <div className="flex space-x-8">
            <Link href="/login">
              <button className="btn btn-ghost">Login</button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-primary">Sign Up</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;