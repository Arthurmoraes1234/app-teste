
export interface PainPoint {
  pain: string;
  context: string;
}

export interface AudienceProfile {
  gender: string;
  ageRange: string;
  lifestyle: string;
  lifeStage: string;
  wantsToAvoid: string;
}

export interface ProductIdea {
  name: string;
  promise: string;
  format: string;
  content: string;
  price: string; // e.g., "R$19" or "$7"
  creationDifficulty: string;
  mentalTrigger: string;
}

export interface ExtraInsights {
  repeatedPhrases: string[];
  limitingBeliefs: string[];
  funnelPotential: string;
}

export interface AnalysisResult {
  identifiedPains: PainPoint[];
  audienceProfile: AudienceProfile;
  productIdeas: ProductIdea[];
  extraInsights: ExtraInsights;
}

// Add a type for the Gemini API key if you were to pass it around,
// but it's directly used from process.env in the service.
// export type ApiKey = string;
