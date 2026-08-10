import { generateMockPrediction } from '../utils/mockPrediction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function submitPrediction(formData) {
  const useMock = import.meta.env.VITE_USE_MOCK_API === 'true';

  if (useMock) {
    console.log('Datezo API: Running in MOCK API mode');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockPrediction(formData));
      }, 1500);
    });
  }

  try {
    const payload = {
      male_age: Number(formData.male_age),
      female_age: Number(formData.female_age),
      same_race: Number(formData.same_race),
      same_field: Number(formData.same_field),
      shared_interests: Number(formData.shared_interests),
      
      attr_of_female: Number(formData.attr_of_female),
      sinc_of_female: Number(formData.sinc_of_female),
      intel_of_female: Number(formData.intel_of_female),
      fun_of_female: Number(formData.fun_of_female),
      amb_of_female: Number(formData.amb_of_female),
      
      attr_of_male: Number(formData.attr_of_male),
      sinc_of_male: Number(formData.sinc_of_male),
      intel_of_male: Number(formData.intel_of_male),
      fun_of_male: Number(formData.fun_of_male),
      amb_of_male: Number(formData.amb_of_male),
      
      male_pref_attr: Number(formData.male_pref_attr),
      male_pref_intel: Number(formData.male_pref_intel),
      female_pref_attr: Number(formData.female_pref_attr),
      female_pref_intel: Number(formData.female_pref_intel),
      
      male_self_attr: Number(formData.male_self_attr),
      female_self_attr: Number(formData.female_self_attr),
      
      male_goes_out: String(formData.male_goes_out),
      female_goes_out: String(formData.female_goes_out)
    };

    // Try primary FastAPI endpoint
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server returned status ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.warn('Datezo API server unreachable or error, using client prediction fallback:', err.message);
    // Fallback to client-side prediction engine if backend is offline
    return generateMockPrediction(formData);
  }
}

export async function fetchModelInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/model-info`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Model info API unreachable:', e);
  }
  return {
    model_name: 'Datezo Match Classifier',
    model_version: '1.0.0',
    optimal_threshold: 0.30,
    test_roc_auc: 0.7033,
    test_f1: 0.3762,
    scenario: 'Post-interaction prediction',
    disclaimer: 'Datezo currently predicts match likelihood using post-interaction ratings. It is not a pre-date attraction predictor.'
  };
}
