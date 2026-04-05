import { motion } from 'framer-motion'

const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 md:p-8"
    >
      <h2 className="text-3xl font-bold text-slate-100">About Medico</h2>
      <p className="mt-4 leading-relaxed text-slate-300">
        Medico is an AI-driven healthcare assistance platform built to make first-level medical guidance more accessible, intelligent, and immediate. Our mission is to empower people with timely symptom insights, practical medicine suggestions, and emergency support pathways while complementing professional clinical care.
      </p>
    </motion.section>
  )
}

export default AboutSection
