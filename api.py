import os
import sys
from pathlib import Path
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

# Ensure project root is in sys.path
sys.path.insert(0, str(Path(__file__).resolve().parent))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from src.predict import predict_match, DatezoPredictor

app = FastAPI(
    title="Datezo Match Prediction API",
    description="AI-Powered Speed Dating Match Prediction & Compatibility Insights Engine",
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

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "service": "Datezo API", "version": "1.0.0"}

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
