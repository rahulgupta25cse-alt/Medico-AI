from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import logging
from datetime import datetime
import os
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup logging first
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize OpenAI client
api_key = os.getenv("OPENAI_API_KEY")
if not api_key or api_key == "your_openai_api_key_here":
    api_key = None
    logger.warning("No OpenAI API key found - running in demo mode")

client = None
if api_key:
    client = OpenAI(api_key=api_key)

app = FastAPI(
    title="Medical AI Service",
    description="AI Service with OpenAI ChatGPT Integration",
    version="0.1.0"
)

# Basic Models
class AnalyzeReportRequest(BaseModel):
    report_id: str
    object_url: Optional[str] = None

class AnalyzeReportResponse(BaseModel):
    report_id: str
    ocr_text: str
    entities: List[dict]
    model_version: str
    timestamp: datetime

class PredictionRequest(BaseModel):
    symptoms: List[str]
    demographics: Optional[dict] = None
    vitals: Optional[dict] = None

class PredictionResponse(BaseModel):
    conditions: List[dict]
    recommendations: Optional[List[str]] = None
    urgency: Optional[str] = None
    urgencyDescription: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    timestamp: datetime

# Basic Health Check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Medical AI Service", "version": "0.1.0"}

@app.get("/")
async def root():
    return {"message": "Medical AI Service", "status": "running"}

# OCR Endpoint (Mock)
@app.post("/ocr/analyze", response_model=AnalyzeReportResponse)
async def analyze_report(request: AnalyzeReportRequest):
    """Mock OCR analysis endpoint"""
    logger.info(f"Processing OCR request for report: {request.report_id}")
    
    # Mock response
    return AnalyzeReportResponse(
        report_id=request.report_id,
        ocr_text="Sample extracted text from medical report",
        entities=[
            {"type": "CONDITION", "text": "hypertension", "confidence": 0.95},
            {"type": "MEDICATION", "text": "lisinopril", "confidence": 0.87}
        ],
        model_version="mock-0.1.0",
        timestamp=datetime.now()
    )

# Symptom Prediction Endpoint (OpenAI powered)
@app.post("/predict/symptoms", response_model=PredictionResponse)
async def predict_symptoms(request: PredictionRequest):
    """Symptom prediction endpoint - uses OpenAI when available, else smart demo"""
    logger.info(f"Processing prediction for symptoms: {request.symptoms}")

    symptoms_str = ", ".join(request.symptoms)
    demo = request.demographics or {}
    duration = demo.get("duration", "unknown duration")
    severity = demo.get("severity", "moderate")

    # --- OpenAI path ---
    if client:
        try:
            prompt = (
                f"A patient reports the following symptoms: {symptoms_str}. "
                f"Duration: {duration}. Severity: {severity}. "
                "List the top 3 most likely medical conditions with a brief description for each. "
                "Also provide 3 practical recommendations and an urgency level (low/moderate/urgent/emergency). "
                "Respond ONLY in this exact JSON format (no markdown, no extra text):\n"
                '{"conditions":[{"name":"...","confidence":0.85,"description":"..."}],'
                '"recommendations":["...","...","..."],'
                '"urgency":"low","urgencyDescription":"..."}'
            )
            ai_resp = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a medical AI assistant. Reply only with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=600,
                temperature=0.3
            )
            import json
            parsed = json.loads(ai_resp.choices[0].message.content)
            return PredictionResponse(
                conditions=parsed.get("conditions", []),
                recommendations=parsed.get("recommendations", []),
                urgency=parsed.get("urgency", "low"),
                urgencyDescription=parsed.get("urgencyDescription", "Monitor your symptoms.")
            )
        except Exception as e:
            logger.error(f"OpenAI symptom prediction failed: {e}")

    # --- Demo / fallback path ---
    symptom_map = {
        "fever":          {"name": "Viral Infection", "confidence": 0.80, "description": "Fever often signals a viral or bacterial infection. Rest and stay hydrated."},
        "cough":          {"name": "Respiratory Infection", "confidence": 0.75, "description": "Persistent cough may indicate bronchitis, cold, or flu."},
        "headache":       {"name": "Tension Headache", "confidence": 0.70, "description": "Common tension headaches are often stress or dehydration related."},
        "fatigue":        {"name": "General Fatigue", "confidence": 0.65, "description": "Fatigue can result from poor sleep, anaemia, or underlying illness."},
        "chest pain":     {"name": "Musculoskeletal Pain", "confidence": 0.55, "description": "Chest pain has many causes; seek emergency care if severe or crushing."},
        "shortness of breath": {"name": "Respiratory Issue", "confidence": 0.70, "description": "Difficulty breathing may be asthma, anxiety, or a cardiac issue."},
        "nausea":         {"name": "Gastrointestinal Issue", "confidence": 0.72, "description": "Nausea can be caused by infections, food intolerance, or medication."},
        "dizziness":      {"name": "Inner Ear / Low Blood Pressure", "confidence": 0.60, "description": "Dizziness may relate to dehydration, low BP, or inner-ear problems."},
    }

    conditions = []
    symptoms_lower = [s.lower() for s in request.symptoms]
    for sym in symptoms_lower:
        for key, cond in symptom_map.items():
            if key in sym and not any(c["name"] == cond["name"] for c in conditions):
                conditions.append(cond)

    if not conditions:
        conditions = [
            {"name": "General Illness", "confidence": 0.60, "description": "Your symptoms may indicate a mild illness. Monitor closely."},
            {"name": "Stress / Fatigue", "confidence": 0.50, "description": "Stress and lack of rest can cause a wide range of symptoms."},
        ]

    urgency = "urgent" if "chest pain" in symptoms_lower or "shortness of breath" in symptoms_lower else \
              "moderate" if severity == "severe" else "low"

    return PredictionResponse(
        conditions=conditions,
        recommendations=[
            "Rest and stay well hydrated",
            "Monitor your symptoms for any worsening",
            "Consult a healthcare provider if symptoms persist or worsen",
        ],
        urgency=urgency,
        urgencyDescription="Seek emergency care immediately." if urgency == "urgent"
            else "Consider seeing a doctor within 24-48 hours." if urgency == "moderate"
            else "Non-urgent - monitor your symptoms and rest."
    )

# Chat Endpoint (OpenAI ChatGPT with smart fallback)
@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """ChatGPT-powered medical assistant with intelligent fallback"""
    logger.info(f"Processing chat message: {request.message}")

    # --- Try OpenAI first ---
    if client:
        try:
            system_prompt = (
                "You are a helpful medical AI assistant. Provide informative, accurate medical information "
                "while emphasizing that users should consult healthcare professionals for diagnosis and treatment. "
                "Be empathetic, professional, and safety-conscious."
            )
            openai_resp = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": request.message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            return ChatResponse(
                response=openai_resp.choices[0].message.content,
                timestamp=datetime.now()
            )
        except Exception as e:
            logger.warning(f"OpenAI unavailable ({e.__class__.__name__}), using smart fallback")

    # --- Smart keyword fallback (works without OpenAI) ---
    demo_responses = {
        "diabetes": "Diabetes symptoms include increased thirst, frequent urination, unexplained weight loss, fatigue, blurred vision, and slow-healing wounds. Please consult a healthcare professional for proper diagnosis.",
        "blood pressure": "High blood pressure (hypertension) often has no symptoms. Regular monitoring is important. Some may experience headaches or dizziness, but these are not reliable indicators.",
        "hypertension": "Hypertension means persistently high blood pressure (above 130/80 mmHg). It increases risk of heart disease and stroke. Lifestyle changes and medications can help manage it effectively.",
        "kidney stone": "Kidney stones are hard deposits of minerals and salts. Causes include dehydration, high-sodium diet, and genetics. Prevention: drink 2-3L of water daily, reduce sodium and animal protein intake.",
        "headache": "Headaches can be caused by stress, dehydration, eyestrain, or underlying conditions. If severe, sudden, or with fever or vision changes, seek medical attention promptly.",
        "migraine": "Migraines cause intense throbbing pain, often with nausea and light sensitivity. Triggers include stress, certain foods, and hormonal changes. Consult a doctor for preventive treatments.",
        "fever": "Fever is your body's natural response to infection. Stay hydrated, rest, and monitor your temperature. Seek medical care if fever exceeds 103F (39.4C) or lasts more than 3 days.",
        "antibiotic": "Common antibiotic side effects include nausea, diarrhea, and rash. Always complete the full course. Seek urgent care if you develop hives, swelling, or breathing difficulty.",
        "heart": "Heart disease symptoms can include chest pain, shortness of breath, and fatigue. If you experience sudden chest pain or pressure, call emergency services (911) immediately.",
        "cancer": "Cancer screening and early detection greatly improve outcomes. Warning signs: unexplained weight loss, fatigue, lumps, or skin changes. Always consult an oncologist for diagnosis.",
        "cold": "Common cold symptoms include runny nose, sore throat, sneezing, and mild fever. Rest, stay hydrated, and use over-the-counter remedies. It usually resolves in 7-10 days.",
        "flu": "Influenza symptoms include high fever, body aches, fatigue, and respiratory symptoms. Annual flu vaccines are recommended. Rest and antiviral medications can reduce severity.",
        "asthma": "Asthma causes airway inflammation and breathing difficulty. Triggers include allergens, exercise, and cold air. Inhalers (bronchodilators and corticosteroids) are the primary treatments.",
        "depression": "Depression symptoms include persistent sadness, loss of interest, fatigue, and difficulty concentrating. Treatments include therapy, antidepressants, and lifestyle changes. Please seek professional help.",
        "anxiety": "Anxiety disorders cause excessive worry, restlessness, and physical symptoms like rapid heartbeat. Cognitive behavioral therapy (CBT) and medications are effective treatments.",
        "allergy": "Allergies occur when the immune system reacts to harmless substances. Symptoms include sneezing, rash, and itchy eyes. Antihistamines and allergen avoidance are key management strategies.",
        "cholesterol": "High cholesterol increases the risk of heart disease. A healthy diet low in saturated fats, regular exercise, and medications like statins can help lower cholesterol levels.",
        "pregnancy": "During pregnancy, prenatal care is essential. Take folic acid, avoid alcohol and smoking, and attend regular check-ups. Contact your doctor immediately if you experience severe pain or bleeding.",
        "vitamin": "Common vitamin deficiencies: Vitamin D (bone health), B12 (nerve function), Iron (energy/anaemia). A balanced diet and sunlight help. Consult a doctor before supplementing.",
        "weight": "Healthy weight management: balanced diet, regular physical activity, adequate sleep, and stress management. Crash diets are not sustainable. Consult a dietitian for personalised guidance.",
        "exercise": "Regular exercise (150 min/week of moderate activity) reduces risk of heart disease, diabetes, and mental health issues. Include both cardio and strength training. Start gradually if inactive.",
        "sleep": "Good sleep hygiene: keep a consistent schedule, avoid screens before bed, limit caffeine after noon, and keep your bedroom cool and dark. Adults need 7-9 hours per night.",
        "stress": "Chronic stress can cause headaches, sleep problems, and weakened immunity. Management strategies include exercise, mindfulness, deep breathing, and seeking social support.",
        "back pain": "Back pain is very common. Causes include muscle strain, poor posture, or disc problems. Treatment: rest, gentle stretching, pain relievers, and physiotherapy. See a doctor if severe or persistent.",
        "skin": "Skin conditions like eczema, psoriasis, and acne have specific treatments. Moisturise regularly, avoid irritants, and use sunscreen daily. Consult a dermatologist for persistent issues.",
        "medication": "For medication-related questions, consult your pharmacist or prescribing physician. Never adjust doses or stop taking prescribed medication without professional advice.",
        "emergency": "If you are experiencing a medical emergency — severe chest pain, difficulty breathing, stroke symptoms, or severe bleeding — call 911 (or your local emergency number) immediately.",
        "stroke": "Stroke warning signs: Face drooping, Arm weakness, Speech difficulty, Time to call 911 (FAST). Every minute counts — seek emergency care immediately.",
        "pain": "Note your pain location, severity (1-10), and what makes it better or worse. Persistent or severe pain always warrants a medical evaluation.",
        "hello": "Hello! I am your AI Medical Assistant. I can answer health questions, discuss symptoms, explain conditions, and provide general medical guidance. How can I help you today?",
        "hi": "Hi there! I am your AI Medical Assistant. Feel free to ask me about symptoms, conditions, medications, or general health advice. How can I assist you?",
        "thank": "You are welcome! Remember, while I can provide general medical information, always consult a qualified healthcare professional for diagnosis and treatment decisions.",
    }

    message_lower = request.message.lower()
    for keyword, resp_text in demo_responses.items():
        if keyword in message_lower:
            return ChatResponse(response=resp_text, timestamp=datetime.now())

    # Generic intelligent fallback
    return ChatResponse(
        response=(
            f"Thank you for your question. As a medical AI assistant I can share that "
            f"topics like this are best discussed with your healthcare provider for personalised advice. "
            f"In general, maintaining a healthy lifestyle — balanced diet, regular exercise, adequate sleep, "
            f"and stress management — supports overall wellbeing. "
            f"Is there a specific symptom or condition you'd like me to explain in more detail?"
        ),
        timestamp=datetime.now()
    )

# Model Info (Mock)
@app.get("/model/info")
async def model_info():
    """Get model information"""
    return {
        "model_version": "mock-0.1.0",
        "supported_features": [
            "OCR Analysis",
            "Symptom Prediction", 
            "Medical Chat",
            "Entity Extraction"
        ],
        "status": "ready"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)