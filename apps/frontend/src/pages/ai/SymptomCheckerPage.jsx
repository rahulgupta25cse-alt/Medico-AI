import SymptomCheckerComponent from '../../components/features/SymptomChecker'

const SymptomCheckerPage = () => {
    return (
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <h1 className="text-3xl font-bold text-slate-100">AI Symptom Checker</h1>
                <p className="mt-1 text-slate-400">Analyze symptoms and get AI-powered health insights.</p>
            </header>

            <div>
                <SymptomCheckerComponent />
            </div>
        </div>
    )
}

export default SymptomCheckerPage
