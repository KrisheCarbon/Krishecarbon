
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu,Wheat, Zap, Smartphone, Satellite, Award, IndianRupee,Sprout ,UserCheck,Users,Map,ShieldCheck,Layers,} from 'lucide-react';


export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <main>
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-emerald-100/40 [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            From Crop Residue to Carbon Credits
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how rural innovation, smart technology, and biochar come together to generate income and climate impact.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/#join">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-3">
                Join Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
          <Link href="/how-it-works#technology">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-white/80 backdrop-blur-sm border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href='/technology'>
              <span className="flex items-center gap-3">
                <Cpu className="w-5 h-5" />
                Explore the Technology
              </span>
              </Link>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>


    <section className="bg-[#F8FAFC] py-20 px-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-merriweather mb-4">
        How Krishe Carbon Works
      </h2>
      <p className="text-xl md:text-2xl text-[#808080] font-merriweather">
        How farmers and entrepreneurs power climate solutions.
      </p>
    </div>

    {/* Process Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Biomass Collection */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Wheat className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Biomass Collection</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Farmers collect crop residue or agri-waste from their own farms.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Turning farm waste into opportunity
            </p>
          </div>
        </div>
      </div>

      {/* Smart Kilns */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Kilns Create Biochar</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              We provide kilns that convert the biomass into stable carbon.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Low-cost, high-quality biochar
            </p>
          </div>
        </div>
      </div>

      {/* AI + Satellite Verification */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Satellite className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI + Satellite Verification</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              We use hyperspectral imagery and AI models to verify usage.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Multi-layer MRV for audit-grade trust
            </p>
          </div>
        </div>
      </div>

      {/* Geotagged Application */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Geotagged Biochar Application</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Farmers apply biochar to their land. Our agent app collects image + data.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Transparent, geotagged soil enhancement
            </p>
          </div>
        </div>
      </div>

      {/* Carbon Credits */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Carbon Credits Generated</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Our MRV stack translates this into verified, high-quality credits.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Trusted, verified carbon removal
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Shared */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <IndianRupee className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Revenue Shared</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Profits from credits go back to those who made it happen.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Farmer-first revenue distribution
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <div className="text-center">
      <Link href='/technology'>
      <button className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl">
        Learn About Our Technology
      </button>
      </Link>
    </div>
  </div>
</section>

<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    {/* Left: Copy */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Meet the Climapreneurs
      </h2>
      <div className="w-24 h-1 bg-emerald-500 rounded-full mb-6"></div>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        Rural entrepreneurs trained on the KriSHE platform run on-farm operations, manage kilns,
        guide farmers, and log data that powers verification. They’re the backbone of our
        decentralized climate network.
      </p>
      <div className="bg-gradient-to-r from-emerald-50 to-green-100 p-6 rounded-xl border-l-4 border-emerald-500">
        <blockquote className="text-emerald-800 font-semibold italic">
          “One Climapreneur can support ~150 farmers and enable ~100 tons of biochar per year.”
        </blockquote>
      </div>
    </motion.div>

    {/* Right: Image + Badge */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
    </motion.div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Who Can Join?
      </h2>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
        We welcome anyone committed to sustainable agriculture and climate action.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8">
      {/* Farmers */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.0 }}
        className="bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl"
      >
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-6">
          <Sprout className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Farmers</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Smallholder farmers with agricultural waste looking to generate additional income streams.
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Direct payments</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Training provided</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Equipment support</span>
          </div>
        </div>
      </motion.div>

      {/* Rural Youth */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl"
      >
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-6">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Rural Youth</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Young entrepreneurs interested in climate-tech and sustainable agriculture.
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Employment opportunities</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Technical training</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Community impact</span>
          </div>
        </div>
      </motion.div>

      {/* Agents */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl"
      >
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-6">
          <UserCheck className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Agents</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Local representatives who can coordinate between farmers and our platform.
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Commission earnings</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Community leadership</span>
          </div>
          <div className="flex items-center text-emerald-700">
            <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
            <span className="text-sm font-medium">Sustainable business</span>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Built for Trust. Designed for Scale.
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
    </motion.div>

    {/* Features */}
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* 1. Decentralized & Low-Cost */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-start space-x-5"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Map className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Decentralized & Low-Cost</h3>
          <p className="text-gray-600 leading-relaxed">
            On-farm kilns cut transport, time, and emissions.
          </p>
        </div>
      </motion.div>

      {/* 2. Traceable by Default */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-start space-x-5"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Traceable by Default</h3>
          <p className="text-gray-600 leading-relaxed">
            Geo-tagged logging + satellite/AI validation = credible MRV.
          </p>
        </div>
      </motion.div>

      {/* 3. Farmer-First Economics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex items-start space-x-5"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Users className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Farmer-First Economics</h3>
          <p className="text-gray-600 leading-relaxed">
            Majority of revenue flows back to farmers and local operators.
          </p>
        </div>
      </motion.div>

      {/* 4. Stackable Removals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-start space-x-5"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Layers className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Stackable Removals</h3>
          <p className="text-gray-600 leading-relaxed">
            Biochar today; ERW and soil practices next for more CO₂ per acre.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl p-10 md:p-16 text-white text-center"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-8">
        You Can Join the Carbon Revolution
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Card */}
        <div className="text-left bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
          <h3 className="text-2xl font-semibold mb-3">Join the Movement</h3>
          <p className="mb-6 opacity-90">
            Become a farmer partner, agent, or Climapreneur and earn from verified carbon removals.
          </p>
          <Link href="/#join">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full bg-white text-emerald-700 px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Join Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>

        {/* Right Card */}
        <div className="text-left bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20">
          <h3 className="text-2xl font-semibold mb-3">Buy Verified Credits</h3>
          <p className="mb-6 opacity-90">
            Purchase high-quality, traceable biochar credits with multi-layer MRV.
          </p>
          <Link href="/buy-credits">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              Buy Credits
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
</section>


      </main>
      <Footer />
    </>
  );
}
