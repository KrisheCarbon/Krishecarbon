import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-6 md:px-12 py-4 flex items-center justify-between shadow-sm">
    {/* Left: Logo */}
    <div className="flex items-center gap-2">
      <Link href="/" passHref>
          <Image
            src="/kriSHE_logo.svg"
            alt="KriSHE Carbon Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
      </Link>
    </div>
  
    {/* Right: Nav Links + Get Started */}
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800 ml-auto font-merriweather">
      
      <Link href="/how-it-works">How It Works</Link>
      <Link href="/technology">Technology</Link>
      <Link href="/about">About Us</Link>
      <Link href="/buy-credits">Buy Credits</Link>
      <Link href="/get-started">
        <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  </nav>
  
  );
}
