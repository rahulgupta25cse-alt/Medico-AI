import { motion } from 'framer-motion'
import HeroSection from '../../components/landing/HeroSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import AboutSection from '../../components/landing/AboutSection'
import TechnologySection from '../../components/landing/TechnologySection'
import LandingFooter from '../../components/landing/LandingFooter'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020817] via-[#0b1120] to-[#111827] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-[-140px] top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <HeroSection />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="mt-12"
        >
          <FeaturesSection />
        </motion.div>

        <div className="mt-12">
          <AboutSection />
        </div>

        <div className="mt-12">
          <TechnologySection />
        </div>

        <LandingFooter />
      </main>
    </div>
  )
}

export default LandingPage
