import Chatbot from '../../components/features/Chatbot'

const AIChatPage = () => {
    return (
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-700 bg-slate-800/60 p-6 backdrop-blur-md">
                <h1 className="text-3xl font-bold text-slate-100">AI Medical Assistant</h1>
                <p className="mt-1 text-slate-400">Ask clinical and wellness questions with AI-guided insights.</p>
            </header>
            <Chatbot />
        </div>
    )
}

export default AIChatPage
