import React, { createContext, useContext, useState, useEffect } from 'react';
import { submitPrediction } from '../services/api';

const PredictionContext = createContext(null);

const DEFAULT_FORM_DATA = {
  male_age: 28,
  female_age: 27,
  same_race: 1,
  same_field: 0,
  shared_interests: 8.4,
  
  attr_of_female: 8.0,
  sinc_of_female: 7.5,
  intel_of_female: 8.2,
  fun_of_female: 8.0,
  amb_of_female: 7.1,
  
  attr_of_male: 8.1,
  sinc_of_male: 7.8,
  intel_of_male: 7.9,
  fun_of_male: 8.3,
  amb_of_male: 7.5,
  
  male_pref_attr: 30.0,
  male_pref_intel: 25.0,
  female_pref_attr: 28.0,
  female_pref_intel: 27.0,
  
  male_self_attr: 8.0,
  female_self_attr: 7.8,
  
  male_goes_out: 'often',
  female_goes_out: 'often'
};

export function PredictionProvider({ children }) {
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('datezo_form_data');
    return saved ? JSON.parse(saved) : DEFAULT_FORM_DATA;
  });

  const [result, setResult] = useState(() => {
    const saved = sessionStorage.getItem('datezo_result');
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    sessionStorage.setItem('datezo_form_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    if (result) {
      sessionStorage.setItem('datezo_result', JSON.stringify(result));
    }
  }, [result]);

  const runPrediction = async (dataToSubmit) => {
    setIsLoading(true);
    setLoadingStep(1);
    setError(null);

    const mergedData = { ...formData, ...dataToSubmit };
    setFormData(mergedData);

    try {
      // Animated step 1
      await new Promise(r => setTimeout(r, 600));
      setLoadingStep(2);
      
      // Animated step 2
      await new Promise(r => setTimeout(r, 600));
      setLoadingStep(3);

      const response = await submitPrediction(mergedData);
      
      // Animated step 4
      await new Promise(r => setTimeout(r, 600));
      setLoadingStep(4);
      await new Promise(r => setTimeout(r, 400));

      setResult(response);
      setIsLoading(false);
      return response;
    } catch (err) {
      console.error('Prediction failed:', err);
      setError(err.message || 'Unable to complete prediction.');
      setIsLoading(false);
      throw err;
    }
  };

  const updateFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PredictionContext.Provider value={{
      formData,
      setFormData,
      updateFormField,
      result,
      setResult,
      isLoading,
      loadingStep,
      error,
      runPrediction
    }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePrediction() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within PredictionProvider');
  }
  return context;
}
