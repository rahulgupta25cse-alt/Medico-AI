import { Activity, FileText, Users } from 'lucide-react'

const cards = [
  {
    title: 'Patient Growth',
    value: '+12%',
    description: 'Compared with last month',
    icon: Users,
    color: 'text-cyan-400'
  },
  {
    title: 'Report Turnaround',
    value: '2.4h',
    description: 'Average analysis completion time',
    icon: FileText,
    color: 'text-emerald-400'
  },
  {
    title: 'AI Triage Accuracy',
    value: '91%',
    description: 'Validated against clinician review',
    icon: Activity,
    color: 'text-blue-400'
  }
]

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-slate-100">Clinical Analytics</h1>
        <p className="mt-2 text-slate-400">
          High-level operational metrics for patient care and AI assistance performance.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-xl border border-slate-700 bg-slate-800/60 p-5">
            <card.icon className={`h-8 w-8 ${card.color}`} />
            <h2 className="mt-4 text-sm font-medium text-slate-400">{card.title}</h2>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{card.value}</p>
            <p className="mt-1 text-sm text-slate-500">{card.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default AnalyticsPage
