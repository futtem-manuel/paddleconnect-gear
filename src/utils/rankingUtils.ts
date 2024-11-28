// Constants for the ranking conversion
const ELO_MIN = 800;  // Minimum expected ELO
const ELO_MAX = 2000; // Maximum expected ELO
const DISPLAY_MIN = 1.0;
const DISPLAY_MAX = 7.0;
const ELO_MEAN = 1400; // Average ELO rating
const ELO_STD_DEV = 200; // Standard deviation for ELO ratings

/**
 * Converts an ELO rating to the 1.0-7.0 scale using a bell curve distribution
 */
export const eloToDisplayRating = (elo: number): number => {
  // Using a modified sigmoid function to create a bell curve
  const zScore = (elo - ELO_MEAN) / ELO_STD_DEV;
  const percentile = 0.5 * (1 + Math.erf(zScore / Math.sqrt(2)));
  
  // Map the percentile to the 1.0-7.0 range
  const rating = DISPLAY_MIN + (DISPLAY_MAX - DISPLAY_MIN) * percentile;
  
  // Round to one decimal place
  return Math.round(rating * 10) / 10;
};

/**
 * Converts a display rating (1.0-7.0) back to an approximate ELO rating
 */
export const displayRatingToElo = (rating: number): number => {
  const percentile = (rating - DISPLAY_MIN) / (DISPLAY_MAX - DISPLAY_MIN);
  const zScore = Math.sqrt(2) * inverseErf(2 * percentile - 1);
  return Math.round(ELO_MEAN + zScore * ELO_STD_DEV);
};

// Helper function to calculate inverse error function
function inverseErf(x: number): number {
  const a = 0.147;
  const y = Math.log(1 - x * x);
  const z = 2 / (Math.PI * a) + y / 2;
  return Math.sign(x) * Math.sqrt(Math.sqrt(z * z - y / a) - z);
}

// Add Math.erf if not supported
if (!Math.erf) {
  Math.erf = (x: number): number => {
    const t = 1 / (1 + 0.5 * Math.abs(x));
    const tau = t * Math.exp(-x * x - 1.26551223 + 1.00002368 * t + 0.37409196 * t * t + 
      0.09678418 * t * t * t - 0.18628806 * t * t * t * t + 
      0.27886807 * t * t * t * t * t - 1.13520398 * t * t * t * t * t * t +
      1.48851587 * t * t * t * t * t * t * t - 0.82215223 * t * t * t * t * t * t * t * t +
      0.17087277 * t * t * t * t * t * t * t * t * t);
    return x >= 0 ? 1 - tau : tau - 1;
  };
}