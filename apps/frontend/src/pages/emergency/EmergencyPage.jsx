import { Phone, MapPin, ShieldAlert } from 'lucide-react'

const actions = [
  {
    title: 'Call Emergency Services',
    description: 'Immediately call local emergency response.',
    icon: Phone,
    action: () => window.open('tel:911', '_self')
  },
  {
    title: 'Find Nearby Hospital',
    description: 'Open maps to locate the nearest emergency room.',
    icon: MapPin,
    action: () => window.open('https://www.google.com/maps/search/nearby+hospital', '_blank')
  },
  {
    title: 'Alert Assigned Doctor',
    description: 'Send an urgent notification to the assigned clinician.',
    icon: ShieldAlert,
    action: () => window.alert('Doctor alert request sent.')
  }
]

const EmergencyPage = () => {
  return (
    <div className="space-y-6">
      <header className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-red-300">Emergency Assistance</h1>
        <p className="mt-2 text-slate-300">
          Use these quick actions only for urgent situations. For immediate danger, call emergency services now.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {actions.map((item) => (
          <button
            key={item.title}
            onClick={item.action}
            className="rounded-xl border border-slate-700 bg-slate-800/60 p-5 text-left transition hover:border-red-400/60 hover:bg-slate-800"
          >
            <item.icon className="mb-4 h-8 w-8 text-red-400" />
            <h2 className="text-lg font-semibold text-slate-100">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{item.description}</p>
          </button>
        ))}
      </section>
    </div>
  )
}

export default EmergencyPage
