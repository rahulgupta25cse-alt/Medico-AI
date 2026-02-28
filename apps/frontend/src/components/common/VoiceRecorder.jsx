import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../../services/api';

const LANGUAGES = [
    { code: 'en-US', label: 'English',  flag: '🇺🇸', promptPrefix: '' },
    { code: 'hi-IN', label: 'हिंदी',    flag: '🇮🇳', promptPrefix: 'Please respond in Hindi (हिंदी में जवाब दें): ' },
    { code: 'mr-IN', label: 'मराठी',    flag: '🇮🇳', promptPrefix: 'Please respond in Marathi (मराठीत उत्तर द्या): ' },
];

const VoiceRecorder = () => {
    const [isListening, setIsListening]   = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking]     = useState(false);
    const [transcript, setTranscript]     = useState('');
    const [reply, setReply]               = useState('');
    const [showBubble, setShowBubble]     = useState(false);
    const [error, setError]               = useState('');
    const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
    const recognitionRef = useRef(null);

    const supported = typeof window !== 'undefined' &&
        ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.abort();
            window.speechSynthesis?.cancel();
        };
    }, []);

    /* ── Female voice speaker ── */
    const speak = (text, langCode) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();

        // Voices may not be loaded yet; retry once after a short delay
        const doSpeak = () => {
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang  = langCode || selectedLang.code;
            utter.rate  = 0.93;
            utter.pitch = 1.1;   // slightly higher = more feminine

            const voices = window.speechSynthesis.getVoices();

            /* Priority order for female voices */
            const female = voices.find(v =>
                v.lang.startsWith(langCode?.split('-')[0] || selectedLang.code.split('-')[0]) &&
                /female|woman|girl|zira|aria|natasha|samantha|moira|karen|veena|heera|kalpana/i.test(v.name)
            ) || voices.find(v =>
                v.lang === (langCode || selectedLang.code)
            ) || voices.find(v =>
                v.lang.startsWith((langCode || selectedLang.code).split('-')[0])
            );

            if (female) utter.voice = female;

            utter.onstart = () => setIsSpeaking(true);
            utter.onend   = () => setIsSpeaking(false);
            utter.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utter);
        };

        // getVoices() is async in Chrome; give it time to populate
        if (window.speechSynthesis.getVoices().length > 0) {
            doSpeak();
        } else {
            window.speechSynthesis.onvoiceschanged = () => { doSpeak(); };
        }
    };

    /* ── Start / Stop listening ── */
    const handleToggle = () => {
        if (isListening) { recognitionRef.current?.stop(); return; }

        setError(''); setTranscript(''); setReply('');

        if (!supported) {
            setError('Speech recognition is not supported. Please use Chrome or Edge.');
            setShowBubble(true);
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang            = selectedLang.code;
        recognition.interimResults  = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onstart = () => { setIsListening(true); setShowBubble(true); };

        recognition.onresult = async (event) => {
            const spoken = event.results[0][0].transcript;
            setTranscript(spoken);
            setIsListening(false);
            setIsProcessing(true);

            try {
                const message = selectedLang.promptPrefix
                    ? `${selectedLang.promptPrefix}${spoken}`
                    : spoken;

                const response = await apiClient.post('/ai/chat', { message });
                const payload  = response?.data ?? response;
                const aiText   = payload?.response || payload?.answer || 'I could not process that. Please try again.';
                setReply(aiText);
                speak(aiText, selectedLang.code);
            } catch {
                const msg = 'Failed to reach the AI service. Please try again.';
                setReply(msg);
                speak(msg, selectedLang.code);
            } finally {
                setIsProcessing(false);
            }
        };

        recognition.onerror = (e) => {
            setIsListening(false); setIsProcessing(false);
            if (e.error === 'not-allowed') setError('Microphone access denied. Please allow mic access.');
            else if (e.error === 'no-speech') setError('No speech detected. Please try again.');
            else setError(`Voice error: ${e.error}`);
        };

        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const handleClose = () => {
        setShowBubble(false); setTranscript(''); setReply(''); setError('');
        window.speechSynthesis?.cancel(); setIsSpeaking(false);
    };

    const btnClass = isSpeaking
        ? 'bg-green-500 hover:bg-green-600'
        : isListening
            ? 'bg-red-500 animate-pulse scale-110'
            : isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-500 hover:bg-pink-600 hover:scale-105';   /* pink = female theme */

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* ── Bubble panel ── */}
            {showBubble && (
                <div className="bg-white border border-pink-100 rounded-2xl shadow-xl p-4 w-80 text-sm relative">
                    <button onClick={handleClose}
                        className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>

                    {/* Header + language selector */}
                    <div className="flex items-center justify-between mb-3">
                        <p className="font-semibold text-pink-600">🎙 AI Voice Assistant</p>
                        <div className="flex gap-1">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => { setSelectedLang(lang); setError(''); setTranscript(''); setReply(''); }}
                                    title={lang.label}
                                    className={`text-xs px-2 py-1 rounded-full border transition-all ${
                                        selectedLang.code === lang.code
                                            ? 'bg-pink-500 text-white border-pink-500'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                                    }`}
                                >
                                    {lang.flag} {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    {!error && isListening   && <p className="text-gray-500 animate-pulse">Listening… speak now ({selectedLang.label})</p>}
                    {!error && isProcessing  && <p className="text-gray-500 animate-pulse">Thinking…</p>}

                    {transcript && !isListening && (
                        <div className="mt-2">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">You said</p>
                            <p className="text-gray-700 mt-0.5">"{transcript}"</p>
                        </div>
                    )}

                    {reply && (
                        <div className="mt-2 border-t pt-2">
                            <p className="text-xs text-gray-400 uppercase tracking-wide">
                                AI {isSpeaking ? '🔊 Speaking…' : 'Response'}
                            </p>
                            <p className="text-gray-800 mt-0.5">{reply}</p>
                            {!isSpeaking && (
                                <button onClick={() => speak(reply, selectedLang.code)}
                                    className="mt-2 text-xs text-pink-500 hover:text-pink-700 underline">
                                    🔊 Read again
                                </button>
                            )}
                        </div>
                    )}

                    {!error && !isListening && !isProcessing && !transcript && (
                        <p className="text-gray-400 text-xs">Click the mic button to start speaking in {selectedLang.label}</p>
                    )}
                </div>
            )}

            {/* ── Mic button ── */}
            <button
                onClick={handleToggle}
                disabled={isProcessing}
                className={`p-4 rounded-full shadow-lg transition-all flex items-center justify-center w-16 h-16 ${btnClass} text-white border-2 border-white`}
                title={`AI Voice Assistant (${selectedLang.label})`}
            >
                {isProcessing ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isSpeaking ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                ) : isListening ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 1.5a3 3 0 013 3v1.5a3 3 0 01-6 0v-1.5a3 3 0 013-3z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default VoiceRecorder;
