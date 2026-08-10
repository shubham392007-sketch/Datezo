import { calculate_compatibility_index, get_compatibility_category } from './compatibility.js';

export function generateMockPrediction(formData) {
  // Convert formData keys to floats/ints
  const data = {
    male_age: Number(formData.male_age || 28),
    female_age: Number(formData.female_age || 27),
    same_race: Number(formData.same_race || 1),
    same_field: Number(formData.same_field || 0),
    shared_interests: Number(formData.shared_interests || 8.0),
    
    attr_of_female: Number(formData.attr_of_female || 8.0),
    sinc_of_female: Number(formData.sinc_of_female || 7.5),
    intel_of_female: Number(formData.intel_of_female || 8.0),
    fun_of_female: Number(formData.fun_of_female || 8.0),
    amb_of_female: Number(formData.amb_of_female || 7.0),
    
    attr_of_male: Number(formData.attr_of_male || 8.0),
    sinc_of_male: Number(formData.sinc_of_male || 7.5),
    intel_of_male: Number(formData.intel_of_male || 8.0),
    fun_of_male: Number(formData.fun_of_male || 8.0),
    amb_of_male: Number(formData.amb_of_male || 7.0),
    
    male_pref_attr: Number(formData.male_pref_attr || 25.0),
    male_pref_intel: Number(formData.male_pref_intel || 25.0),
    female_pref_attr: Number(formData.female_pref_attr || 25.0),
    female_pref_intel: Number(formData.female_pref_intel || 25.0),
    
    male_self_attr: Number(formData.male_self_attr || 8.0),
    female_self_attr: Number(formData.female_self_attr || 8.0),
    
    male_goes_out: formData.male_goes_out || "often",
    female_goes_out: formData.female_goes_out || "often"
  };

  const compIndex = calculate_compatibility_index(data);
  
  // Calculate simulated calibrated match probability from signals
  const mutualAttr = (data.attr_of_female + data.attr_of_male) / 2.0;
  const mutualFun = (data.fun_of_female + data.fun_of_male) / 2.0;
  const sharedInt = data.shared_interests;
  const ageGap = Math.abs(data.male_age - data.female_age);

  let rawLogit = -3.5 + 
    (mutualAttr * 0.35) + 
    (sharedInt * 0.25) + 
    (mutualFun * 0.20) + 
    (data.same_field * 0.4) + 
    (data.same_race * 0.3) - 
    (ageGap * 0.05);

  const prob = 1.0 / (1.0 + Math.exp(-rawLogit));
  const probPercent = Math.round(prob * 1000) / 10.0;
  
  const threshold = 0.30;
  const prediction = probPercent >= (threshold * 100) ? 1 : 0;
  const label = prediction === 1 ? "MATCH" : "NO MATCH";
  const category = get_compatibility_category(probPercent);

  // Generate factors
  const posFactors = [];
  const negFactors = [];

  if (data.shared_interests >= 7.0) posFactors.push("High shared interests score");
  if (mutualAttr >= 7.5) posFactors.push("Strong mutual attractiveness rating");
  if (mutualFun >= 7.5) posFactors.push("High mutual fun perception");
  if ((data.intel_of_female + data.intel_of_male) / 2 >= 7.5) posFactors.push("High mutual intelligence perception");
  if (data.same_field === 1) posFactors.push("Shared academic/professional field");
  if (data.same_race === 1) posFactors.push("Shared cultural background");
  if (data.male_goes_out === data.female_goes_out) posFactors.push("Identical social lifestyle habits");

  if (data.shared_interests < 5.0) negFactors.push("Low shared interests rating");
  if (mutualAttr < 5.5) negFactors.push("Low mutual physical attractiveness perception");
  if (Math.abs(data.attr_of_female - data.attr_of_male) >= 2.5) negFactors.push("Asymmetry in physical attraction ratings");
  if (data.male_goes_out !== data.female_goes_out) negFactors.push("Difference in social going-out frequency");
  if (ageGap > 7) negFactors.push("Significant age difference");

  if (posFactors.length === 0) posFactors.push("Moderate overall rating compatibility");
  if (negFactors.length === 0) negFactors.push("No major compatibility drawbacks detected");

  return {
    prediction,
    label,
    match_probability: probPercent,
    compatibility_category: category,
    compatibility_index: compIndex,
    positive_factors: posFactors.slice(0, 4),
    negative_factors: negFactors.slice(0, 3),
    model_version: "1.0.0 (Client Fallback)",
    threshold_used: threshold
  };
}
