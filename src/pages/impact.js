import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Impact() {
  return (
    <>
      <Navbar />
      <main>
      <section className="bg-[#F8FAFC] py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Content */}
      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather leading-tight">
        Turning Agricultural Waste into Verified Carbon Credits
        </h2>
        <p className="text-base md:text-lg text-[#808080] font-merriweather leading-relaxed">
        We empower farmers to convert crop residues into income through biochar, traceable technology, and carbon markets.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            className="px-6 py-3 text-white font-merriweather text-base rounded-lg hover:opacity-90 transition-opacity duration-300"
            style={{ backgroundColor: '#25632D' }}
          >
            Join as Farmer or Agent
          </button>
          
          <button 
            className="px-6 py-3 text-white font-merriweather text-base rounded-lg hover:opacity-90 transition-opacity duration-300"
            style={{ backgroundColor: '#25632D' }}
          >
            Buy Carbon Credits
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative h-80 md:h-96 lg:h-[400px]">
        <Image
          src="/impact_image.svg" // Replace with your actual image path
          alt="Crop residue to carbon credits process"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  </div>
</section>


<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4 leading-tight">
        Empowering Rural Communities. Fighting Climate Change.
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather">
        Where rural strength meets climate action.
      </p>
    </div>

    {/* Content Cards with Arrow */}
    <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Problem Card */}
        <div 
          className="rounded-2xl p-8 text-white shadow-lg w-full sm:w-[400px] md:w-[450px] lg:w-[554.93px] h-[250px] sm:h-[280px] md:h-[300px] lg:h-[316px] mx-auto lg:mx-0"
          style={{ 
            background: 'linear-gradient(to bottom right, #25632D, #BBCFBE)'
          }}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-base sm:text-lg md:text-xl font-merriweather leading-relaxed text-center">
              Burning agricultural waste is one of the largest sources of air pollution in India. 
              At the same time, millions of smallholder farmers are excluded from the global carbon market.
            </p>
          </div>
        </div>

        {/* Solution Card */}
        <div 
          className="rounded-2xl p-8 text-white shadow-lg w-full sm:w-[400px] md:w-[450px] lg:w-[554.93px] h-[250px] sm:h-[280px] md:h-[300px] lg:h-[316px] mx-auto lg:mx-0"
          style={{ 
            background: 'linear-gradient(to bottom right, #25632D, #BBCFBE)'
          }}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-base sm:text-lg md:text-xl font-merriweather leading-relaxed text-center">
              With smart kilns, AI + satellite-based verification, and direct farmer income, 
              wet&apos;re building a new climate economy from the soil up.
            </p>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center mb-12">
        <div className="w-16 h-16 flex items-center justify-center">
          <svg 
            className="w-12 h-12" 
            fill="none" 
            stroke="url(#arrowGradient)" 
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#25632D" />
                <stop offset="100%" stopColor="#BBCFBE" />
              </linearGradient>
            </defs>
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button 
          className="px-8 py-4 text-white font-merriweather text-lg rounded-lg hover:opacity-90 transition-opacity duration-300"
          style={{ backgroundColor: '#25632D' }}
        >
          See the Current Progress
        </button>
      </div>
    </div>
  </div>
</section>


<section className="bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Trainings */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/people_icon.svg" // Replace with your actual icon
                alt="Trainings"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-2xl font-bold text-green-900">500+</h3>
            <p className="text-[#555] font-medium">Trainings</p>
          </div>

          {/* CO2 Reduced */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/hands_icon.png" // Replace with your actual icon
                alt="CO2 Reduced"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-2xl font-bold text-green-900">300+ Tons</h3>
            <p className="text-[#555] font-medium">CO2 reduced</p>
          </div>

          {/* Earnings */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <Image
                src="/finger_icon.svg" // Replace with your actual icon
                alt="Earnings"
                width={40}
                height={40}
              />
            </div>
            <h3 className="text-2xl font-bold text-green-900">₹45L</h3>
            <p className="text-[#555] font-medium">Earnings</p>
          </div>
        </div>
      </div>
    </section>



    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
          From Pilot to Scale
        </h2>

        {/* Subheading */}
        <p className="text-base md:text-lg text-gray-300 mb-8">
          Expanding climate action across rural India.
        </p>

        {/* Map Image */}
        <div className="relative w-full max-w-2xl mx-auto mb-6">
          <Image
            src="/india_map.png" // Replace with your actual filename
            alt="India Map"
            width={800}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Text below the image */}
        <p className="text-sm md:text-base text-gray-400">
        “Currently active in Telangana, Karnataka & Maharashtra”
        </p>
      </div>
    </section>
      </main>
      <Footer />
    </>
  );
}
