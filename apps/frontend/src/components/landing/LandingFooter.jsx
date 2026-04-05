import { Github, Linkedin, Mail } from 'lucide-react'

const LandingFooter = () => {
  return (
    <footer className="mt-12 rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
      <div className="grid gap-6 md:grid-cols-3 md:items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-100">Medico – AI Smart Medical Assistance System</h3>
          <p className="mt-1 text-sm text-slate-400">Professional AI healthcare startup experience.</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-300">Team Credits</p>
          <p className="mt-1 text-sm text-slate-400">Developed by Medico Project Team</p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-300">Contact</p>
          <p className="mt-1 text-sm text-slate-400">contact@medico-ai.com</p>
          <div className="mt-3 flex items-center gap-3 text-slate-400">
            <a href="mailto:contact@medico-ai.com" className="transition hover:text-cyan-400" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition hover:text-cyan-400" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-cyan-400" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
