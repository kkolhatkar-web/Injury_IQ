import { getGeminiAI } from './gemini';
import { Athlete } from '../types';

export const calculateRecommendedMinutes = (athlete: Athlete): number => {
  // Base minutes for a standard youth match (e.g., 80 mins for U15-U16)
  const baseMinutes = 80;
  
  if (athlete.status === 'SAFE') {
    // High wellness and good HRV trend increases confidence
    const wellnessFactor = athlete.wellness / 5;
    return Math.round(baseMinutes * (0.8 + (0.2 * wellnessFactor)));
  } else if (athlete.status === 'CAUTION') {
    // Reduce load significantly
    return Math.round(baseMinutes * 0.5);
  } else {
    // OVERLOAD_RISK: Minimal or no play
    return Math.round(baseMinutes * 0.15);
  }
};

export const generatePrescription = async (athlete: Athlete, bodyPart: string): Promise<{ text: string; minutes: number }> => {
  const ai = getGeminiAI();
  const recommendedMinutes = calculateRecommendedMinutes(athlete);
  
  const prompt = `
    As an AI Sports Medicine expert for InjuryIQ, generate a plain-language coaching prescription for a youth athlete.
    
    Athlete: ${athlete.name}
    Age: ${athlete.age}
    Position: ${athlete.position}
    Current Status: ${athlete.status}
    HRV: ${athlete.hrv}
    Load: ${athlete.load}%
    Body Part of Concern: ${bodyPart}
    Recommended Play Time: ${recommendedMinutes} minutes
    
    Provide a concise, actionable prescription in this format:
    "[Athlete Name]: [Risk Level] risk of [Injury Type]. Recommended: [Specific Action]. Playing Time Cap: ${recommendedMinutes} mins."
    
    Focus on youth safety and overuse prevention. Avoid medical jargon.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return { 
      text: response.text || `${athlete.name}: MODERATE risk of strain. Recommended: Reduce intensity. Playing Time Cap: ${recommendedMinutes} mins.`,
      minutes: recommendedMinutes
    };
  } catch (error) {
    console.error("Error generating prescription:", error);
    return {
      text: `${athlete.name}: MODERATE risk of strain. Recommended: Reduce intensity. Playing Time Cap: ${recommendedMinutes} mins.`,
      minutes: recommendedMinutes
    };
  }
};
