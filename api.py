import os
import sys
from pathlib import Path
from typing import Dict, Any, List, Optional, Literal
from pydantic import BaseModel, Field

# Ensure project root is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from src.predict import predict_match, DatezoPredictor
from src.gemini_service import gemini_service

app = FastAPI(
    title="Datezo Match Prediction & AI Chat API",
    description="AI-Powered Speed Dating Match Prediction & Gemini Conversational Assistant",
    version="1.0.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------
# ML PREDICTION SCHEMAS
# -------------------------------------------------------------------
class PairPredictionRequest(BaseModel):
    male_age: int = Field(..., ge=18, le=100, description="Male age")
    female_age: int = Field(..., ge=18, le=100, description="Female age")
    same_race: int = Field(..., ge=0, le=1, description="1 if same race, 0 otherwise")
    same_field: int = Field(..., ge=0, le=1, description="1 if same field of study/work, 0 otherwise")
    shared_interests: float = Field(..., ge=0.0, le=10.0, description="Shared interests rating 0-10")
    
    attr_of_female: float = Field(..., ge=0.0, le=10.0)
    sinc_of_female: float = Field(..., ge=0.0, le=10.0)
    intel_of_female: float = Field(..., ge=0.0, le=10.0)
    fun_of_female: float = Field(..., ge=0.0, le=10.0)
    amb_of_female: float = Field(..., ge=0.0, le=10.0)
    
    attr_of_male: float = Field(..., ge=0.0, le=10.0)
    sinc_of_male: float = Field(..., ge=0.0, le=10.0)
    intel_of_male: float = Field(..., ge=0.0, le=10.0)
    fun_of_male: float = Field(..., ge=0.0, le=10.0)
    amb_of_male: float = Field(..., ge=0.0, le=10.0)
    
    male_pref_attr: float = Field(..., ge=0.0, le=100.0)
    male_pref_intel: float = Field(..., ge=0.0, le=100.0)
    female_pref_attr: float = Field(..., ge=0.0, le=100.0)
    female_pref_intel: float = Field(..., ge=0.0, le=100.0)
    
    male_self_attr: float = Field(..., ge=0.0, le=10.0)
    female_self_attr: float = Field(..., ge=0.0, le=10.0)
    
    male_goes_out: str = Field(..., description="rarely | sometimes | often | very_often")
    female_goes_out: str = Field(..., description="rarely | sometimes | often | very_often")

class PredictionResponse(BaseModel):
    prediction: int
    label: str
    match_probability: float
    compatibility_category: str
    compatibility_index: float
    positive_factors: List[str]
    negative_factors: List[str]
    model_version: str = "1.0.0"
    threshold_used: float = 0.30

# -------------------------------------------------------------------
# GEMINI CHAT SCHEMAS
# -------------------------------------------------------------------
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class PredictionContext(BaseModel):
    prediction: Optional[int] = 1
    label: Optional[str] = "MATCH"
    match_probability: Optional[float] = 84.7
    compatibility_category: Optional[str] = "Very High Compatibility"
    compatibility_index: Optional[float] = 87.4
    positive_factors: Optional[List[str]] = []
    negative_factors: Optional[List[str]] = []
    model_version: Optional[str] = "1.0.0"
    threshold_used: Optional[float] = 0.30

class ChatRequest(BaseModel):
    message: str
    conversation: Optional[List[ChatMessage]] = []
    prediction_context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    success: bool
    message: str
    model: Optional[str] = None

# -------------------------------------------------------------------
# ENDPOINTS
# -------------------------------------------------------------------
@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "ml_service": "healthy",
        "gemini_service": "configured" if gemini_service.is_configured() else "not_configured"
    }

@app.get("/api/v1/model-info")
def get_model_info():
    try:
        predictor = DatezoPredictor()
        return {
            "model_name": predictor.metadata.get("model_name", "Datezo Match Classifier"),
            "model_version": "1.0.0",
            "optimal_threshold": predictor.threshold,
            "test_roc_auc": predictor.metadata.get("test_roc_auc", 0.7033),
            "test_f1": predictor.metadata.get("test_f1", 0.3762),
            "scenario": "Post-interaction prediction",
            "disclaimer": "Datezo currently predicts match likelihood using post-interaction ratings. It is not a pre-date attraction predictor."
        }
    except Exception as e:
        return {
            "model_name": "Datezo Match Classifier",
            "model_version": "1.0.0",
            "optimal_threshold": 0.30,
            "status": "ready"
        }

@app.post("/api/v1/predict", response_model=PredictionResponse)
def predict(request: PairPredictionRequest):
    try:
        input_data = request.dict()
        result = predict_match(input_data)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result.get("details", result["error"]))
            
        return PredictionResponse(
            prediction=result["prediction"],
            label=result["label"],
            match_probability=result["match_probability"],
            compatibility_category=result["compatibility_category"],
            compatibility_index=result["compatibility_index"],
            positive_factors=result["positive_factors"],
            negative_factors=result["negative_factors"],
            model_version="1.0.0",
            threshold_used=0.30
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/chat", response_model=ChatResponse)
async def chat_with_datezo_ai(request: ChatRequest):
    try:
        conversation_dicts = [msg.dict() for msg in request.conversation] if request.conversation else []
        result = await gemini_service.generate_chat_response(
            message=request.message,
            conversation=conversation_dicts,
            prediction_context=request.prediction_context
        )
        return ChatResponse(
            success=result.get("success", False),
            message=result.get("message", "Datezo AI is temporarily unavailable."),
            model=result.get("model", "gemini-2.5-flash")
        )
    except Exception as e:
        return ChatResponse(
            success=False,
            message="Datezo AI is temporarily unavailable. Please try again.",
            model="gemini-2.5-flash"
        )

# -------------------------------------------------------------------
# CATCH-ALL UNKNOWN API ROUTE HANDLER (Prevents 405 crashes)
# -------------------------------------------------------------------
@app.api_route("/api/{path:path}", methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"])
async def unknown_api_route(path: str):
    return JSONResponse(
        status_code=404,
        content={"detail": f"Endpoint '/api/{path}' not found on Datezo API."}
    )

# -------------------------------------------------------------------
# SERVE REACT FRONTEND STATIC BUILD (SINGLE UNIFIED DEPLOYMENT)
# -------------------------------------------------------------------
dist_dir = Path(__file__).resolve().parent / "dist"

if dist_dir.exists():
    # Mount assets folder
    assets_dir = dist_dir / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    # SPA Fallback for any client-side routes (/predict, /chat, /blog, /about, etc.)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        file_path = dist_dir / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(dist_dir / "index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
