import { motion } from 'framer-motion'
import { Activity, Brain, ShieldCheck } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/50 p-8 md:p-12 backdrop-blur-xl">
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
          >
            <Activity className="h-4 w-4" />
            Medico – AI Smart Medical Assistance System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-slate-100 md:text-5xl"
          >
            AI Powered Medical Assistant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-lg font-medium text-cyan-300"
          >
            Diagnose • Suggest • Protect
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 max-w-2xl text-slate-300"
          >
            An intelligent healthcare assistant that analyzes symptoms and provides instant medical guidance using artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href="/login"
              className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-950/40 transition hover:scale-[1.02]"
            >
              Start Diagnosis
            </a>
            <a
              href="/login"
              className="rounded-xl border border-slate-600 bg-slate-800/70 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-500/60 hover:bg-slate-800"
            >
              Talk to AI Doctor
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
            <Brain className="mb-3 h-6 w-6 text-cyan-400" />
            <h3 className="font-semibold text-slate-100">AI Clinical Intelligence</h3>
            <p className="mt-2 text-sm text-slate-400">Fast symptom triage with machine-assisted medical guidance.</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5">
            <ShieldCheck className="mb-3 h-6 w-6 text-emerald-400" />
            <h3 className="font-semibold text-slate-100">Emergency Ready</h3>
            <p className="mt-2 text-sm text-slate-400">Instant emergency access and protective healthcare actions.</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 sm:col-span-2">
            <Activity className="mb-3 h-6 w-6 text-blue-400" />
            <h3 className="font-semibold text-slate-100">Smart Health Monitoring</h3>
            <p className="mt-2 text-sm text-slate-400">Track reports, recommendations, and health status in one dashboard.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
