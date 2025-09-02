
"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HowItWorksSection from "@/components/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialSection from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit,ShieldCheck,Leaf, ArrowRight, Play, Sparkles,Smartphone,Users, Zap, Satellite, DollarSign,TrendingUp, Shield, Building2 } from "lucide-react";


export default function Home() {
    const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

           <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-12 pb-10">
                    {/* Background with animated gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-green-600/5"></div>
                    </div>
                    
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 60,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-green-500/10 rounded-full blur-3xl"
                      />
                      <motion.div
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 45,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-emerald-500/10 rounded-full blur-3xl"
                      />
                      
                      {/* Floating particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
                          style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + i * 10}%`,
                          }}
                          animate={{
                            y: [-20, 20, -20],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                    
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="text-center">
                        
                        {/* Main heading with staggered animation */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="mb-6"
                        >
                          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 mb-4">
                            KriSHE Carbon
                          </h1>
                          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full"></div>
                        </motion.div>
                        
                        {/* Tagline with enhanced styling */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="mb-8"
                        >
                          <h2 className="text-3xl md:text-5xl font-extrabold text-emerald-700 mb-4 leading-tight">
                            Empowering Rural India.
                            <br />
                            <span className="text-green-600">Healing the Planet.</span>
                          </h2>
                          <div className="flex items-center justify-center gap-2 text-emerald-600">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-lg font-medium font-body">Democratize Carbon Markets</span>
                            <Sparkles className="w-5 h-5" />
                          </div>
                        </motion.div>
                        
                        {/* Enhanced description */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="mb-12"
                        >
                          <p className="text-xl md:text-2xl text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed font-normal">
                            We help smallholder farmers turn agricultural waste into income through 
                            <span className="font-semibold text-emerald-700"> traceable biochar</span> and 
                            <span className="font-semibold text-emerald-700"> verified carbon credits</span>.
                          </p>
                          
                          {/* Stats preview */}
                          <div className="flex flex-wrap justify-center gap-8 text-center">
                            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-emerald-200">
                              <div className="text-2xl font-bold text-emerald-600">500+</div>
                              <div className="text-sm text-gray-600">Farmers</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-emerald-200">
                              <div className="text-2xl font-bold text-emerald-600">300+</div>
                              <div className="text-sm text-gray-600">Tons CO₂</div>
                            </div>
                            <div className="bg-white/70 backdrop-blur-sm px-4 py-2 rounded-2xl border border-emerald-200">
                              <div className="text-2xl font-bold text-emerald-600">₹45L+</div>
                              <div className="text-sm text-gray-600">Earned</div>
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Enhanced CTA buttons */}
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                        >
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40"
                          >
                            <span className="flex items-center gap-3">
                              Join the Regenerative Revolution
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative bg-white/90 backdrop-blur-sm border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <Link href="/buy-credits">
                            <span className="flex items-center gap-3">
                              <Play className="w-5 h-5" />
                              Buy Verified Credits
                            </span>
                            </Link>
                          </motion.button>
                        </motion.div>
                      </div>
                    </div>
            </section>


   {/* VALUE PROPOSITION (inline, minimal, no hook/ref needed) */}
<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
  {/* subtle background tint only (no rotating blobs) */}
  <div className="absolute inset-0 overflow-hidden opacity-30" />

  <div className="relative max-w-6xl mx-auto text-center">
    <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
      We turn every acre into a carbon sink.
    </h2>
  </motion.div>


    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Smallholders convert crop waste into 
        <span className="font-semibold text-emerald-700"> traceable biochar</span> and 
        <span className="font-semibold text-emerald-700"> verified carbon credits</span> — delivering 
        <span className="font-semibold text-emerald-700"> income for farmers</span> and 
        <span className="font-semibold text-emerald-700"> trust for buyers</span>.
      </p>
    </motion.div>


    {/* thin divider */}
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-20 h-[2px] bg-emerald-500 mx-auto rounded-full my-10"
    />

    {/* two light cards */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
    >
      <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-emerald-100 p-2 rounded-lg">
            <ArrowRight className="w-5 h-5 text-emerald-600 -rotate-180" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-emerald-800 mb-2">For Farmers</h3>
        <p className="text-gray-600 text-sm">
          Turn agricultural waste into sustainable income with verified carbon credits.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <ArrowRight className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-blue-800 mb-2">For Buyers</h3>
        <p className="text-gray-600 text-sm">
          Purchase high-quality, traceable carbon credits with full transparency.
        </p>
      </div>
    </motion.div>
  </div>
</section>

<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        What Makes KriSHE Different
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our unique approach combines technology, community, and fair economics to create lasting impact.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Feature 1 */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Climapreneurs</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Rural youth trained to run kilns & climate projects.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Local entrepreneurs driving ground-level implementation
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Kilns</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Low-cost, decentralized on-farm pyrolysis units.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Reduce logistics costs while maximizing quality
            </p>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Digital MRV</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Geo-tagging + AI + satellite monitoring ensure trust.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Audit-grade transparency for every carbon credit
            </p>
          </div>
        </div>
      </div>

      {/* Feature 4 */}
      <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-100 hover:shadow-lg transition-all duration-300 group">
        <div className="flex items-start space-x-4">
          <div className="bg-emerald-600 p-4 rounded-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Revenue Sharing</h3>
            <p className="text-gray-700 font-medium mb-2 leading-relaxed">
              Majority of credit value flows back to farmers.
            </p>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Direct income where it belongs—in rural communities
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Callout + Button */}
    <div className="text-center">

<Link
    href="/how-it-works"
    className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl"
  >
    See how it works
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</Link>
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
  <div className="max-w-7xl mx-auto relative z-10">
    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Why Biochar is Trusted Worldwide
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Not a fringe method—biochar is the mainstream, trusted choice for permanent carbon removal.
      </p>
    </div>

    {/* Benefits grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {/* Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
          <TrendingUp className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">85% Market Leader</h3>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          85% of all carbon removals in last 3 years = biochar
        </p>
        <div className="bg-emerald-100 px-3 py-1 rounded-full text-xs font-medium text-emerald-800">
          Proven at scale globally
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">1000+ Years Storage</h3>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          Stores CO₂ securely in soil for 1000+ years
        </p>
        <div className="bg-emerald-100 px-3 py-1 rounded-full text-xs font-medium text-emerald-800">
          True permanence
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Corporate Preferred</h3>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          Preferred by Microsoft, Google, Frontier
        </p>
        <div className="bg-emerald-100 px-3 py-1 rounded-full text-xs font-medium text-emerald-800">
          Industry standard
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
        <div className="bg-emerald-600 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Soil Health Bonus</h3>
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          Restores soil health, fertility, water retention, yields
        </p>
        <div className="bg-emerald-100 px-3 py-1 rounded-full text-xs font-medium text-emerald-800">
          Beyond carbon benefits
        </div>
      </div>
    </div>
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
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Real Climate Impact. Real Rural Income.
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Our model is already delivering tangible results for farmers, communities, and the planet.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {[
        { icon: "/icon_farmers.svg", title: "500+ Farmers", text: "Smallholders connected to the global carbon market." },
        { icon: "/icon_biochar.svg", title: "150+ Tons Biochar", text: "Turning crop residue into durable carbon sinks." },
        { icon: "/icon_money.svg", title: "₹45L+ Lakhs Earned", text: "New income streams for Rural Communities." },
        { icon: "/icon_zones.svg", title: "3 Pilot Zones", text: "Scale across multiple rural regions." },
        { icon: "/icon_soilsample.svg", title: "200+ Soil Samples", text: "Scientific validation of carbon storage and soil health." },
        { icon: "/icon_co2.svg", title: "20 Climapreneurs", text: "Rural youth trained to manage kilns and scale projects." },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group hover:-translate-y-2 flex flex-col justify-between w-full aspect-[1/1.1] mx-auto relative"
        >
          {/* Icon top-left */}
          <Image
            src={item.icon}
            alt={item.title}
            width={88}
            height={92}
            className="absolute top-6 left-6 w-[88px] h-[92px]"
          />

          {/* Text */}
          <div className="mt-auto text-left pt-20">
            <h3 className="text-2xl font-semibold mb-2 font-merriweather">{item.title}</h3>
            <p className="text-base text-gray-600 font-merriweather leading-relaxed">
              {item.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-7xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Credits You Can Trust
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Invest in high-integrity carbon removal. Our credits are transparent, permanent, 
        and backed by a robust, multi-layer verification process.
      </p>
    </motion.div>

    {/* Features List */}
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <ul className="space-y-6 mb-10 w-full">
          {/* Feature 1 */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-5">
              <BrainCircuit className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                AI-verified biochar application
              </p>
              <p className="text-gray-600">
                Our algorithms ensure data integrity from field to report.
              </p>
            </div>
          </motion.li>

          {/* Feature 2 */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-5">
              <Satellite className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Satellite & soil-based MRV
              </p>
              <p className="text-gray-600">
                Multi-layer verification for audit-grade traceability.
              </p>
            </div>
          </motion.li>

          {/* Feature 3 */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-5">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Farmer-first revenue model
              </p>
              <p className="text-gray-600">
                Your purchase directly supports rural communities.
              </p>
            </div>
          </motion.li>

          {/* Feature 4 */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-start"
          >
            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full mr-5">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Permanent, nature-based carbon removal
              </p>
              <p className="text-gray-600">
                Sequester carbon for 1,000+ years with a trusted method.
              </p>
            </div>
          </motion.li>
        </ul>

        {/* CTA Button */}
        <Link href='/buy-credits'>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="group w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          Buy Credits
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        </Link>
      </motion.div>
    </div>

    {/* Certification Badges */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mt-20 pt-10 border-t border-gray-200"
    >
      <p className="text-center text-sm text-gray-500 mb-6">
        Aligned with leading international standards
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-500">
        <div className="font-semibold">Verra Verified</div>
        <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
        <div className="font-semibold">Puro.earth Standard</div>
        <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
        <div className="font-semibold">ISO 14064-2</div>
        <div className="w-px h-4 bg-gray-300 hidden sm:block"></div>
        <div className="font-semibold">EBC Certified</div>
      </div>
    </motion.div>
  </div>
</section>

              <TestimonialSection/>
              <Footer/>
    </div>
  );
}
