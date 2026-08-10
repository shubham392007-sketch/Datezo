export function calculate_compatibility_index(data) {
  const mutualAttr = (Number(data.attr_of_female || 5) + Number(data.attr_of_male || 5)) / 2.0;
  const attrScore = Math.min(100, Math.max(0, (mutualAttr / 10.0) * 100.0));

  const sharedInt = Number(data.shared_interests || 5.0);
  const interestScore = Math.min(100, Math.max(0, (sharedInt / 10.0) * 100.0));

  const mutualIntel = (Number(data.intel_of_female || 5) + Number(data.intel_of_male || 5)) / 2.0;
  const mutualSinc = (Number(data.sinc_of_female || 5) + Number(data.sinc_of_male || 5)) / 2.0;
  const intelSincScore = Math.min(100, Math.max(0, ((mutualIntel + mutualSinc) / 20.0) * 100.0));

  const mutualFun = (Number(data.fun_of_female || 5) + Number(data.fun_of_male || 5)) / 2.0;
  const mutualAmb = (Number(data.amb_of_female || 5) + Number(data.amb_of_male || 5)) / 2.0;
  const funAmbScore = Math.min(100, Math.max(0, ((mutualFun + mutualAmb) / 20.0) * 100.0));

  const normMalePrefAttr = Number(data.male_pref_attr || 25) / 10.0;
  const normMalePrefIntel = Number(data.male_pref_intel || 25) / 10.0;
  const normFemalePrefAttr = Number(data.female_pref_attr || 25) / 10.0;
  const normFemalePrefIntel = Number(data.female_pref_intel || 25) / 10.0;

  const mAttrAlign = 10.0 - Math.abs(normMalePrefAttr - Number(data.attr_of_female || 5));
  const mIntelAlign = 10.0 - Math.abs(normMalePrefIntel - Number(data.intel_of_female || 5));
  const fAttrAlign = 10.0 - Math.abs(normFemalePrefAttr - Number(data.attr_of_male || 5));
  const fIntelAlign = 10.0 - Math.abs(normFemalePrefIntel - Number(data.intel_of_male || 5));

  const prefScore = Math.min(100, Math.max(0, ((mAttrAlign + mIntelAlign + fAttrAlign + fIntelAlign) / 40.0) * 100.0));

  const overallFemale = (Number(data.attr_of_female||5) + Number(data.sinc_of_female||5) + Number(data.intel_of_female||5) + Number(data.fun_of_female||5) + Number(data.amb_of_female||5)) / 5.0;
  const overallMale = (Number(data.attr_of_male||5) + Number(data.sinc_of_male||5) + Number(data.intel_of_male||5) + Number(data.fun_of_male||5) + Number(data.amb_of_male||5)) / 5.0;
  const ratingGap = Math.abs(overallFemale - overallMale);
  const balanceScore = Math.min(100, Math.max(0, 100.0 - (ratingGap / 10.0 * 100.0)));

  const sameRace = Number(data.same_race || 0);
  const sameField = Number(data.same_field || 0);
  const ageGap = Math.abs(Number(data.male_age || 25) - Number(data.female_age || 25));
  const ageComp = Math.min(10, Math.max(0, 10.0 - ageGap));
  const backgroundScore = Math.min(100, Math.max(0, (sameRace * 35.0 + sameField * 35.0 + (ageComp / 10.0) * 30.0)));

  const lifestyleMap = { rarely: 1, sometimes: 2, often: 3, very_often: 4 };
  const maleLife = lifestyleMap[String(data.male_goes_out).toLowerCase()] || 2;
  const femaleLife = lifestyleMap[String(data.female_goes_out).toLowerCase()] || 2;
  const lifeGap = Math.abs(maleLife - femaleLife);
  const lifestyleScore = Math.min(100, Math.max(0, ((4 - lifeGap) / 4.0) * 100.0));

  const compIndex = (
    0.20 * attrScore +
    0.15 * interestScore +
    0.15 * intelSincScore +
    0.15 * funAmbScore +
    0.10 * prefScore +
    0.10 * balanceScore +
    0.10 * backgroundScore +
    0.05 * lifestyleScore
  );

  return Math.round(compIndex * 10) / 10.0;
}

export function get_compatibility_category(probability) {
  const p = probability <= 1.0 ? probability * 100.0 : probability;
  if (p < 30.0) return "Low Compatibility";
  if (p < 60.0) return "Moderate Compatibility";
  if (p < 80.0) return "High Compatibility";
  return "Very High Compatibility";
}
