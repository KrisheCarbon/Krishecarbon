import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Smartphone, Satellite, TestTube2 ,CheckCircle2,ArrowRight} from "lucide-react"

export default function Technology() {
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
            Technology That Makes It Verifiable
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Traceable, transparent, and scalable solutions to verify rural carbon removals.
          </p>
        </motion.div>
      </div>
    </section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
        Smart. Transparent. Scalable.
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
    </motion.div>

    {/* Features */}
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Smart Kilns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex items-start space-x-5 hover:border-emerald-200 hover:shadow-md transition-all"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Zap className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Kilns</h3>
          <p className="text-gray-600 leading-relaxed">
            Track biomass in/out per burn with timestamp and quantity.
          </p>
        </div>
      </motion.div>

      {/* Geo-Tagged Data Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex items-start space-x-5 hover:border-emerald-200 hover:shadow-md transition-all"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Smartphone className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Geo-Tagged Data Capture</h3>
          <p className="text-gray-600 leading-relaxed">
            Farmers or agents upload proof with mobile app.
          </p>
        </div>
      </motion.div>

      {/* Satellite & AI Monitoring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex items-start space-x-5 hover:border-emerald-200 hover:shadow-md transition-all"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <Satellite className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Satellite & AI Monitoring</h3>
          <p className="text-gray-600 leading-relaxed">
            Hyperspectral imagery + AI inference confirms biochar usage.
          </p>
        </div>
      </motion.div>

      {/* Soil Testing + dMRV */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-50 p-8 rounded-xl border border-gray-100 flex items-start space-x-5 hover:border-emerald-200 hover:shadow-md transition-all"
      >
        <div className="flex-shrink-0 bg-emerald-600 text-white p-4 rounded-xl">
          <TestTube2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Soil Testing + dMRV Compliance</h3>
          <p className="text-gray-600 leading-relaxed">
            On-field sampling + auto-generated MRV reports for carbon credit registries.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>

<section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
  <div className="max-w-4xl mx-auto">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Why Our Verification is Trusted
      </h2>
      <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
    </motion.div>

    {/* Trust Points */}
    <div className="space-y-6">
      {/* Point 1 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
        <p className="text-lg text-gray-700">
          Live data capture with Climapreneurs on every field
        </p>
      </motion.div>

      {/* Point 2 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
        <p className="text-lg text-gray-700">
          Regular internal and third-party audits
        </p>
      </motion.div>

      {/* Point 3 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-4 flex-shrink-0" />
        <p className="text-lg text-gray-700">
          Built-in fraud detection via satellite cross-verification
        </p>
      </motion.div>
    </div>
  </div>
</section>


<section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-emerald-50 to-green-100 rounded-xl p-10 text-center border border-emerald-100"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Want to know more about our carbon quantification system?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        Get in touch with our technical team for a detailed overview of our MRV methodology.
      </p>
      <Link href='/about'>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        Contact Our Team
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
       </Link>
    </motion.div>
  </div>
</section>


      </main>
      <Footer />
    </>
  );
}
