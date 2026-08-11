# DATEZO — AI-Powered Speed Dating Match Prediction Platform

Datezo is a production-grade machine learning platform and web application designed to predict mutual match outcomes in speed-dating events, engineer domain-specific compatibility features, provide calibrated match probabilities, and deliver explainable compatibility insights.

---

## 🚀 Features

- **Machine Learning Match Classifier**: Predicts binary `match` (0 = No Match, 1 = Mutual Match).
- **Calibrated Match Probability**: Uses Sigmoid (Platt) calibration to output honest empirical match odds (0-100%).
- **Datezo Compatibility Index**: A transparent multi-attribute derived score (0-100) aggregating attraction, shared interests, rating balance, preference alignment, and lifestyle.
- **Explainable Compatibility Signals**: Positive and negative differentiating factors for every prediction.
- **Datezo AI Chat (Powered by Google Gemini API)**: Natural language conversational assistant answering questions about predictions, score calculation, calibration, and model scope.
- **FastAPI Production Server**: Asynchronous Python REST API serving inference and Gemini AI chat.
- **Responsive React / Vite / Tailwind Web App**: Handcrafted editorial sticker-card interface with custom SVG illustrations.

---

## 🛠️ Datezo AI Chat Setup (Google Gemini API)

The Datezo AI Chat integration uses Google's official **`google-genai`** SDK on the FastAPI backend. The Gemini API key is kept strictly on the backend and is never exposed to the frontend browser.

### 1. Obtain a Gemini API Key
Generate an API key in [Google AI Studio](https://aistudio.google.com/).

### 2. Configure Backend Environment
Copy `.env.example` to `.env` in the project root directory:

```bash
cp .env.example .env
```

Add your Gemini API key to `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

*(Note: `.env` is listed in `.gitignore` and must never be committed to Git).*

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
# Or directly install google-genai
pip install google-genai
```

### 4. Start the FastAPI ML & Chat Backend
```bash
python api.py
```
*(Runs on `http://localhost:8000`)*

### 5. Start the React Frontend Web Application
```bash
npm run dev
```
*(Runs on `http://localhost:5173` or `http://localhost:5175`)*

### 6. Test Datezo AI Chat
Navigate to `/chat` or click **"Ask Datezo AI →"** on any compatibility result report to chat with Gemini AI in plain language!

---

## 🔒 Security Checklist

- [x] `GEMINI_API_KEY` exists strictly on the FastAPI backend (`.env`).
- [x] `.env` is included in `.gitignore` and excluded from repository commits.
- [x] React frontend communicates exclusively via `POST /api/v1/chat`.
- [x] No API keys, server credentials, or personal participant data are exposed in network responses or prompt logs.

---

## 👤 Developer

Designed & Developed by **Shubham Pokale** (AI/ML Engineer & Developer).
- **GitHub**: [@shubham392007-sketch](https://github.com/shubham392007-sketch)
- **LinkedIn**: [Shubham Pokale](https://linkedin.com/in/shubham-pokale)
- **Instagram**: [@shubhamofficial_2007](https://instagram.com/shubhamofficial_2007)
- **Email**: shubham392007@gmail.com
- **X**: [@SHUBHAM392007](https://x.com/SHUBHAM392007)
