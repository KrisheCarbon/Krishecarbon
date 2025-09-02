import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  return (
    <>
      <Navbar />
      <main>
      <section className="py-16 bg-[#F8FAFC]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4">
        The Story Behind KriSHE
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather">
        How a simple idea became a climate movement.
      </p>
    </div>

    {/* Story Image */}
    <div className="relative w-full max-w-4xl mx-auto">
      <Image
        src="/krishe_story.svg" // Replace with your actual image path
        alt="The Story Behind kriSHE - How a simple idea became a climate movement"
        width={1200}
        height={800}
        className="w-full h-auto rounded-2xl shadow-lg"
        priority
      />
    </div>
  </div>
</section>




<section className="py-16 bg-[#F8FAFC]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4">
        Dedication. Expertise. Passion.
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather">
        Meet the team driving climate action forward.
      </p>
    </div>

    {/* Founders Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
      {/* Anjali Rose */}
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image
            src="/anjali.svg" // Replace with your actual image path
            alt="Anjali Rose - Co-Founder"
            width={192}
            height={192}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-black font-merriweather mb-2">
          ANJALI ROSE
        </h3>
        <p className="text-lg md:text-xl text-black font-merriweather mb-3">
          Co-Founder
        </p>
        <a 
          href="mailto:anjali@krishecarbon.com"
          className="text-green-600 hover:text-green-700 font-merriweather text-base md:text-lg transition-colors duration-300"
        >
          anjali@krishecarbon.com
        </a>
      </div>

      {/* Naga Sai Krishna */}
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <Image
            src="/naga.svg" // Replace with your actual image path
            alt="Naga Sai Krishna - Co-Founder"
            width={192}
            height={192}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-black font-merriweather mb-2">
          NAGA SAI KRISHNA
        </h3>
        <p className="text-lg md:text-xl text-black font-merriweather mb-3">
          Co-Founder
        </p>
        <a 
          href="mailto:saikrishna@krishecarbon.com"
          className="text-green-600 hover:text-green-700 font-merriweather text-base md:text-lg transition-colors duration-300"
        >
          saikrishna@krishecarbon.com
        </a>
      </div>
    </div>
  </div>
</section>




<section className="py-16 bg-[#F8FAFC]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4">
        Lett&apos;s Connect
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather mb-8">
        Start a conversation with us today.
      </p>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <button 
        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
      >
        Join as Climapreneur
      </button>
      
      <button 
        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
      >
        Partner/ NGO/ Donor
      </button>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </>
  );
}
