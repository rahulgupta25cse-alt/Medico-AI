import { motion } from 'framer-motion'
import { Bot, BrainCircuit, Database, Sparkles } from 'lucide-react'

const technologies = [
  { label: 'Artificial Intelligence', icon: Bot },
  { label: 'Machine Learning', icon: BrainCircuit },
  { label: 'Medical Data Analysis', icon: Database },
  { label: 'Smart Health Recommendations', icon: Sparkles }
]

const TechnologySection = () => {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold text-slate-100">Technology</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technologies.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 text-center"
          >
            <item.icon className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
            <p className="font-medium text-slate-100">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default TechnologySection
