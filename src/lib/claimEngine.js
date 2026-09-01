// Compensation estimate engine for the Progressive Discovery claim check.
// Pure function: takes the accumulated answers and returns a structured estimate.

export const ACCIDENT_TYPES = [
  { id: "Auto Accident", label: "Auto Accident", blurb: "Car, truck, or motorcycle collision" },
  { id: "Commercial Accident", label: "Commercial Accident", blurb: "Commercial vehicle incidents" },
  { id: "Rideshare Accident", label: "Rideshare Accident", blurb: "Uber, Lyft, or other rideshare" },
  { id: "Workplace Accident", label: "Workplace Accident", blurb: "On-the-job injury" },
  { id: "Slip and Fall", label: "Slip and Fall", blurb: "Premises liability injury" },
  { id: "Medical Malpractice", label: "Medical Malpractice", blurb: "Negligent medical care" },
];

export const INJURY_TIERS = [
  { id: "Minor", label: "Minor", desc: "Soft tissue, full recovery within weeks", multiplier: 1.5 },
  { id: "Moderate", label: "Moderate", desc: "Ongoing treatment, some lingering effects", multiplier: 2.5 },
  { id: "Serious", label: "Serious", desc: "Significant injury, longer recovery", multiplier: 3.5 },
  { id: "Severe", label: "Severe", desc: "Long-term or permanent impact", multiplier: 5 },
];

// Non-economic (pain and suffering) multiplier bands applied to economic damages.
function nonEconMultiplier(tier) {
  switch (tier) {
    case "Minor": return { low: 1, high: 2 };
    case "Moderate": return { low: 2, high: 3 };
    case "Serious": return { low: 3, high: 5 };
    case "Severe": return { low: 4, high: 7 };
    default: return { low: 1, high: 2 };
  }
}

// Represented cases typically settle 2x-3.5x higher than unrepresented.
const REPRESENTED_UPLIFT = { low: 2.0, high: 3.5 };

export function computeEstimate(answers) {
  const medical = Number(answers.medical_bills) || 0;
  const lostWages = Number(answers.lost_wages) || 0;
  const economic = medical + lostWages;

  const tier = answers.injury_tier || "Minor";
  const band = nonEconMultiplier(tier);

  // Floor for any valid claim with treatment sought
  const baseFloor = answers.sought_treatment && answers.sought_treatment.startsWith("Yes") ? 3500 : 0;

  const nonEconLow = Math.max(economic * band.low, baseFloor);
  const nonEconHigh = Math.max(economic * band.high, baseFloor * 2.2);

  const rangeLow = economic + nonEconLow;
  const rangeHigh = economic + nonEconHigh;

  const representedLow = Math.round(rangeLow * REPRESENTED_UPLIFT.low);
  const representedHigh = Math.round(rangeHigh * REPRESENTED_UPLIFT.high);

  return {
    economic_damages: economic,
    medical_bills: medical,
    lost_wages: lostWages,
    injury_tier: tier,
    non_econ_low: Math.round(nonEconLow),
    non_econ_high: Math.round(nonEconHigh),
    range_low: Math.round(rangeLow),
    range_high: Math.round(rangeHigh),
    represented_low: representedLow,
    represented_high: representedHigh,
  };
}

export function qualificationTier(answers) {
  const treated = answers.sought_treatment && answers.sought_treatment.startsWith("Yes");
  const atFault = answers.at_fault;
  const withinWindow = answers.accident_date && withinLastYears(answers.accident_date, 2);
  if (!treated || atFault === "At fault" || !withinWindow) return "DQ";
  if (answers.injury_tier === "Severe" || answers.injury_tier === "Serious") return "T1";
  if (answers.injury_tier === "Moderate") return "T2";
  return "T3";
}

export function withinLastYears(dateStr, years) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return false;
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - years);
    return d >= cutoff && d <= new Date();
  } catch {
    return false;
  }
}

export function formatCurrency(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}