import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function BuyCredits() {
  return (
    <>
      <Navbar />
      <main>
      <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4">
        Verified Biochar Credits with Rural Impact
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather">
        Our credits are backed by multi-layer proof
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {/* AI-verified biochar application */}
      <div className="flex flex-col items-center text-center p-8 border-2 border-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-24 h-24 mb-6">
          <Image
            src="/app_demo_icon.svg" // Replace with your actual image path
            alt="AI-verified biochar application"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black font-merriweather">
          AI-verified biochar application
        </h3>
      </div>

      {/* Satellite & soil-based MRV */}
      <div className="flex flex-col items-center text-center p-8 border-2 border-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-24 h-24 mb-6 flex items-center justify-center">
          <Image
            src="/upload_icon.svg" // Replace with your actual image path
            alt="Satellite & soil-based MRV"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black font-merriweather">
          Satellite & soil-based MRV
        </h3>
      </div>

      {/* Farmer-first revenue sharing */}
      <div className="flex flex-col items-center text-center p-8 border-2 border-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="w-24 h-24 mb-6 flex items-center justify-center">
          <Image
            src="verified_icon.svg" // Replace with your actual image path
            alt="Farmer-first revenue sharing"
            width={96}
            height={96}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-black font-merriweather">
          Farmer-first revenue sharing
        </h3>
      </div>
    </div>

    {/* Bottom Text */}
    <div className="text-center mb-12">
      <p className="text-2xl md:text-3xl text-black font-merriweather">
        We offer nature-based, permanent carbon removal credits with full traceability
      </p>
    </div>

    {/* Buy Credits Button */}
    <div className="text-center">
      <Link href="/roi">
        <button
          className="px-8 py-4 text-white font-merriweather text-lg rounded-lg hover:opacity-90 transition-opacity duration-300"
          style={{ backgroundColor: '#25632D' }}
        >
          Buy Credits
        </button>
      </Link>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </>
  );
}
