import { FormData, vehicleTypes } from "./types";

// 2026 Tariff Grid Structure
// Categories:
// CAT 1: Cars, Motorcycles, Vans (<3.5t)
// CAT 2: Trucks, Buses (>3.5t)
// CAT 3: Mopeds
// CAT 4: Tractors
// CAT 5: Trailers

const CATEGORY_MAPPING: Record<string, 1 | 2 | 3 | 4 | 5> = {
  car: 1,
  motorcycle: 1,
  van: 1,
  truck: 2, // Assuming truck > 3.5t
  moped: 3,
  tractor: 4,
  trailer: 5,
};

// Placeholder Base Premiums (RC)
// Structure: [Category][AgeGroup][PowerGroup?]
// We'll use a simplified flat structure for now and expand as data becomes available.
const BASE_PREMIUMS = {
  CAT1: {
    group1: 200, // Placeholder
    group2: 180,
    group3: 150,
  },
  CAT2: 250,
  CAT3: 50,
  CAT4: 100,
  CAT5: 40,
};

const SURCHARGES = {
  individual: 50, // Applied to first vehicle only
};

const COVERAGES = {
  assistance: {
    first: 66,
    additional: 39,
  },
  legalProtection: {
    CAT3: { first: 12, additional: 0 },
    OTHER: { first: 17, additional: 0 },
  },
  driverProtection: 40, // Unchanged?
  omnium: {
    // Structure for 1st, 2nd, 3rd+ vehicles
    // Example: { limit: 10000, premiums: { "1": 175, "2": 150, "3+": 125 } }
    tiers: [
      { limit: 10000, premiums: { "1": 175, "2": 175, "3+": 175 } },
      { limit: 20000, premiums: { "1": 230, "2": 230, "3+": 230 } },
      { limit: 30000, premiums: { "1": 300, "2": 300, "3+": 300 } },
      { limit: 40000, premiums: { "1": 400, "2": 400, "3+": 400 } },
      { limit: 50000, premiums: { "1": 500, "2": 500, "3+": 500 } },
    ],
  },
};

function getAgeGroup(date: Date): "group1" | "group2" | "group3" {
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  // Placeholder logic for age groups
  if (age >= 50) return "group3";
  if (age >= 30) return "group2";
  return "group1";
}

// Helper to get exact age if needed for debugging/display
export function getVehicleAge(date: Date): number {
  const currentYear = new Date().getFullYear();
  return currentYear - date.getFullYear();
}

function getVehicleCategory(type: string): 1 | 2 | 3 | 4 | 5 {
  return CATEGORY_MAPPING[type] || 1;
}

export function calculatePremium(data: Partial<FormData>) {
  let annualPremium = 0;
  const breakdown: { label: string; amount: number }[] = [];

  if (!data.vehicleType || !data.firstRegistrationDate) {
    return { annual: 0, monthly: 0, breakdown: [] };
  }

  const category = getVehicleCategory(data.vehicleType);
  
  // Explicitly calculate vehicle age for clarity and potential use
  const vehicleAgeYears = getVehicleAge(data.firstRegistrationDate);
  const ageGroup = getAgeGroup(data.firstRegistrationDate);
  
  // Determine if it's the first vehicle based on rank
  // rank can be "1", "2", or "3+"
  const rank = data.vehicleRank || "1";
  const isFirst = rank === "1";

  // 1. Base RC Premium
  let rcAmount = 0;
  if (category === 1) {
    // CAT 1 logic (simplified)
    // TODO: Implement power check for Group 3
    rcAmount = BASE_PREMIUMS.CAT1[ageGroup];
  } else if (category === 2) {
    rcAmount = BASE_PREMIUMS.CAT2;
  } else if (category === 3) {
    rcAmount = BASE_PREMIUMS.CAT3;
  } else if (category === 4) {
    rcAmount = BASE_PREMIUMS.CAT4;
  } else if (category === 5) {
    rcAmount = BASE_PREMIUMS.CAT5;
  }

  // Membership Surcharge (Individual) - Only on first vehicle
  let surchargeAmount = 0;
  if (data.userStatus === "individual" && isFirst) {
    surchargeAmount = SURCHARGES.individual;
  }

  // Add RC to total
  annualPremium += rcAmount;
  breakdown.push({ label: "coverages.rc.label", amount: rcAmount });

  // Add Surcharge to total (separately)
  if (surchargeAmount > 0) {
    annualPremium += surchargeAmount;
    breakdown.push({ label: "coverages.surcharge.individual.label", amount: surchargeAmount });
  }

  // 2. Coverages
  if (data.coverages) {
    // Assistance
    if (data.coverages.assistance) {
      const amount = isFirst ? COVERAGES.assistance.first : COVERAGES.assistance.additional;
      annualPremium += amount;
      breakdown.push({ label: "coverages.assistance.label", amount });
    }

    // Legal Protection
    if (data.coverages.legalProtection) {
      let amount = 0;
      if (category === 3) { // Mopeds
        amount = isFirst ? COVERAGES.legalProtection.CAT3.first : COVERAGES.legalProtection.CAT3.additional;
      } else {
        amount = isFirst ? COVERAGES.legalProtection.OTHER.first : COVERAGES.legalProtection.OTHER.additional;
      }
      annualPremium += amount;
      breakdown.push({ label: "coverages.legalProtection.label", amount });
    }

    // Driver Protection
    if (data.coverages.driverProtection) {
      const amount = COVERAGES.driverProtection;
      annualPremium += amount;
      breakdown.push({ label: "coverages.driverProtection.label", amount });
    }

    // Omnium
    if (data.coverages.omnium && data.vehicleValue) {
      const value = data.vehicleValue;
      const tier = COVERAGES.omnium.tiers.find(t => value <= t.limit);
      const amount = tier ? tier.premiums[rank] : 0; 
      if (amount > 0) {
        annualPremium += amount;
        breakdown.push({ label: "coverages.omnium.label", amount });
      }
    }
    
    // Fire/Theft (Legacy/Placeholder?)
    if (data.coverages.fireTheftResting) {
       // Assuming this is handled via Omnium or separate? 
       // Keeping simple fixed value for now if selected
       const amount = 80; 
       annualPremium += amount;
       breakdown.push({ label: "coverages.fireTheftResting.label", amount });
    }
  }

  // 3. Multi-vehicle logic?
  // Already handled via isFirst checks in components.

  return {
    annual: Math.round(annualPremium * 100) / 100,
    monthly: Math.round((annualPremium / 12) * 100) / 100,
    breakdown,
  };
}
