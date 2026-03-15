import { motion } from 'framer-motion'
import { Pill, Siren, Stethoscope, LayoutDashboard } from 'lucide-react'

const features = [
  {
    title: 'AI Symptom Checker',
    description: 'Users can enter symptoms and get possible health insights.',
    icon: Stethoscope,
    accent: 'text-cyan-400'
  },
  {
    title: 'Medicine Recommendation',
    description: 'AI suggests basic medicines and precautions.',
    icon: Pill,
    accent: 'text-blue-400'
  },
  {
    title: 'Emergency Assistance',
    description: 'Quick access to emergency contacts and nearby hospitals.',
    icon: Siren,
    accent: 'text-red-400'
  },
  {
    title: 'Health Dashboard',
    description: 'Track reports, health status, and recommendations.',
    icon: LayoutDashboard,
    accent: 'text-emerald-400'
  }
]

const FeaturesSection = () => {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold text-slate-100">Core Features</h2>
      <p className="max-w-3xl text-slate-400">Designed to deliver fast, guided healthcare support with a futuristic clinical experience.</p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-md transition hover:-translate-y-1 hover:border-cyan-500/40"
          >
            <feature.icon className={`mb-3 h-7 w-7 ${feature.accent}`} />
            <h3 className="text-lg font-semibold text-slate-100">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{feature.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default FeaturesSection
