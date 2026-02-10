import { FormData } from "./types";

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
  truck: 2,
  bus: 2,
  moped: 3,
  tractor: 4,
  trailer: 5,
  caravan: 5,
};

type AgeGroup = "group1" | "group2" | "group3";

// Base Premiums (RC) structure: [Category][AgeGroup] -> { first, additional }
// CAT 1 Group 3 has special logic handled in calculation
const BASE_PREMIUMS = {
  CAT1: {
    group1: { first: 79, additional: 33 },
    group2: { first: 119, additional: 33 },
    // Group 3 is special (Power/Type dependent)
  },
  CAT2: {
    group1: { first: 94, additional: 49 },
    group2: { first: 134, additional: 49 },
    group3: { first: 239, additional: 239 },
  },
  CAT3: {
    group1: { first: 73, additional: 17 },
  },
  CAT4: {
    group1: { first: 43, additional: 17 },
    group2: { first: 58, additional: 17 },
  },
  CAT5: {
    // Logic: Group 1 (15y+) = 50, Group 2 (25y+) = 25. 
    // Implies >25 is cheaper.
    group1: 50,
    group2: 25,
  },
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
  driverProtection: 40, // Unchanged from previous assumption
  omnium: {
    tiers: [
      { limit: 10000, premiums: { "1": 175, "2": 175, "3+": 175 } },
      { limit: 20000, premiums: { "1": 230, "2": 175, "3+": 175 } },
      { limit: 30000, premiums: { "1": 330, "2": 235, "3+": 175 } },
      { limit: 40000, premiums: { "1": 430, "2": 335, "3+": 175 } },
      { limit: 50000, premiums: { "1": 530, "2": 435, "3+": 175 } },
    ],
  },
};

// Helper to get exact age
export function getVehicleAge(date: Date): number {
  const currentYear = new Date().getFullYear();
  return currentYear - date.getFullYear();
}

function getAgeGroup(age: number, category: 1 | 2 | 3 | 4 | 5): AgeGroup | null {
  if (category === 1 || category === 2) {
    if (age >= 40) return "group1";
    if (age >= 25) return "group2";
    if (age >= 15) return "group3";
    return null; // < 15 not covered?
  }
  
  if (category === 3) { // Mopeds
    if (age >= 15) return "group1";
    return null;
  }
  
  if (category === 4) { // Tractors
    if (age >= 40) return "group1";
    if (age >= 25) return "group2";
    return null; // < 25 not covered?
  }
  
  if (category === 5) { // Trailers & Caravans
    if (age >= 25) return "group2";
    if (age >= 15) return "group1";
    return null;
  }

  return null;
}

function getVehicleCategory(type: string): 1 | 2 | 3 | 4 | 5 {
  return CATEGORY_MAPPING[type] || 1;
}

export function calculatePremium(data: Partial<FormData>) {
  let annualPremium = 0;
  const breakdown: { label: string; amount: number }[] = [];
  const notes: string[] = [];
  const details: any = {
    rc: {},
    omnium: {},
  };

  if (!data.vehicleType || !data.firstRegistrationDate) {
    return { annual: 0, monthly: 0, breakdown: [], details: {} };
  }

  const category = getVehicleCategory(data.vehicleType);
  const vehicleAgeYears = getVehicleAge(data.firstRegistrationDate);
  const ageGroup = getAgeGroup(vehicleAgeYears, category);
  
  details.rc.category = category;
  details.rc.ageGroup = ageGroup;
  details.rc.vehicleAge = vehicleAgeYears;

  console.log(`[Pricing] Category: CAT ${category}, Age Group: ${ageGroup}, Age: ${vehicleAgeYears} years`);

  const rank = data.vehicleRank || "1";
  const isFirst = rank === "1";
  details.rc.rank = rank;

  // 1. Base RC Premium
  let rcAmount = 0;

  if (!ageGroup) {
    // TODO: Handle too young vehicles gracefully? For now 0.
    rcAmount = 0;
    notes.push("Vehicle is too young for RC coverage.");
  } else {
    if (category === 1) {
      if (ageGroup === "group3") {
        details.rc.rule = "CAT 1, Group 3 (15-24 years)";
        // Special logic for CAT 1 Group 3 (15-24y)
        if (data.vehicleType === "motorcycle") {
          rcAmount = 167; // Fixed for Moto
          details.rc.base = 167;
          details.rc.condition = "Motorcycle";
        } else {
          // Car/Van
          const power = data.powerKw || 0;
          details.rc.power = power;
          if (power <= 140) {
            rcAmount = 214;
            details.rc.base = 214;
            details.rc.condition = "Power <= 140 kW";
          } else {
            rcAmount = 264;
            details.rc.base = 264;
            details.rc.condition = "Power > 140 kW";
          }
        }
      } else {
        // Group 1 & 2
        const rates = BASE_PREMIUMS.CAT1[ageGroup];
        rcAmount = isFirst ? rates.first : rates.additional;
        details.rc.base = rcAmount;
        details.rc.rule = `CAT 1, Group ${ageGroup === 'group1' ? '1 (40+)' : '2 (25-39)'}`;
      }
    } else if (category === 2) {
      const rates = BASE_PREMIUMS.CAT2[ageGroup];
      rcAmount = isFirst ? rates.first : rates.additional;
      details.rc.base = rcAmount;
      details.rc.rule = `CAT 2, Group ${ageGroup}`;
    } else if (category === 3) {
      if (ageGroup === "group1") {
        const rates = BASE_PREMIUMS.CAT3.group1;
        rcAmount = isFirst ? rates.first : rates.additional;
        details.rc.base = rcAmount;
        details.rc.rule = `CAT 3, Group 1 (15+)`;
      }
    } else if (category === 4) {
      // Tractors: Group 1 or 2
      if (ageGroup === "group1" || ageGroup === "group2") {
        const rates = BASE_PREMIUMS.CAT4[ageGroup];
        rcAmount = isFirst ? rates.first : rates.additional;
        details.rc.base = rcAmount;
        details.rc.rule = `CAT 4, Group ${ageGroup === 'group1' ? '1 (40+)' : '2 (25-39)'}`;
      }
    } else if (category === 5) {
      // Trailers & Caravans: Group 1 or 2
      // Note: For CAT 5, Rank is NOT checked (same price for first/additional).
      if (ageGroup === "group2") rcAmount = BASE_PREMIUMS.CAT5.group2;
      else if (ageGroup === "group1") rcAmount = BASE_PREMIUMS.CAT5.group1;
      details.rc.base = rcAmount;
      details.rc.rule = `CAT 5, Group ${ageGroup === 'group1' ? '1 (15-24)' : '2 (25+)'}`;
      details.rc.rank = "not_applicable";
    }
  }

  // Membership Surcharge (Individual) - Only on first vehicle
  // "valables pour « Club Member » et « Supporter » -> +50,00 € sur premier véhicule pour « Individual »"
  // Applies to RC+Assistance section.
  let surchargeAmount = 0;
  if (data.userStatus === "individual" && isFirst) {
    surchargeAmount = SURCHARGES.individual;
  }

  // Add RC to total
  if (rcAmount > 0) {
    annualPremium += rcAmount;
    breakdown.push({ label: "coverages.rc.label", amount: rcAmount });
  }

  // Add Surcharge to total
  if (surchargeAmount > 0) {
    annualPremium += surchargeAmount;
    breakdown.push({ label: "coverages.surcharge.individual.label", amount: surchargeAmount });
  }

  // 2. Coverages
  if (data.coverages) {
    // Assistance
    // "sauf vélomoteurs et tracteurs agricoles" -> Excluded for CAT 3 & 4
    if (data.coverages.assistance) {
      if (category !== 3 && category !== 4) {
         // Standard Assistance is INCLUDED in the base premium for RC? 
         // Doc Title: "R.C. + ASSISTANCE"
         // Doc Description: "Dépannage inclus dans la prime (accident ou panne)"
         // So we should NOT add extra for basic assistance.
         
         // However, there is an EXTENSION:
         // "Extension possible ... Premier véhicule : 66 EUR ... A partir du second : 39 EUR"
         // Wait, the UI has "Assistance" checkbox. If it refers to the Extension, we charge.
         // If it refers to basic assistance, it's free/included.
         
         // Looking at config.ts:
         // assistance: { label: "Assistance", description: "Dépannage..." }
         // assistancePlus: { label: "Extension assistance..." }
         
         // If "Assistance" in UI means the basic included one, price is 0 (included in RC).
         // If "Assistance Plus" is selected, we charge 66/39.
         
         // Let's assume the "Assistance" checkbox in Step 3 is for the OPTIONAL Extension?
         // OR, is it just showing that it's included?
         // In `types.ts`, `assistance` defaults to true. 
         
         // Refined Logic:
         // Basic Assistance is INCLUDED in RC premium for CAT 1, 2, 5 (maybe 5? Doc says "sauf vélomoteurs et tracteurs").
         // So for CAT 3 & 4, Assistance is NOT available or NOT included.
         
         // IF the user selects "Assistance Plus" (Extension), we charge.
         // The `assistance` field in types might be redundant if it's mandatory/included.
         // But let's keep it. If checked, and it's an extension, charge.
         
         // Let's look at the previous code:
         // assistance: { first: 66, additional: 39 }
         // This matches the "Extension possible" prices.
         // So the "Assistance" checkbox in the UI likely corresponds to this "Extension".
         // BUT the UI also has `assistancePlus`.
         
         // Let's check config.ts again.
         // `assistance`: "Assistance"
         // `assistancePlus`: "Extension assistance Europe..."
         
         // Clarification needed. For now, I will assume:
         // - Basic Assistance is INCLUDED in RC (no extra charge).
         // - "Assistance Plus" (Extension) costs 66/39.
         // - The `assistance` checkbox in UI might be confusing if it maps to the Extension prices in my previous code.
         
         // Update: I will treat `assistancePlus` as the Extension (66/39).
         // I will treat `assistance` as the Basic Included one (0 EUR, but maybe we show it in breakdown as "Included"?).
         
         // Let's see previous implementation:
         // if (data.coverages.assistance) { annualPremium += ... }
         // It seems previous dev mapped `assistance` to the paid extension.
         
         // Decision: 
         // Map `assistancePlus` to the 66/39 EUR extension.
         // Map `assistance` to 0 EUR (Included) or just ignore if it's base.
         // BUT wait, previous code had `assistance` costing 66/39.
         // Maybe the UI "Assistance" IS the extension?
         // Let's check the labels.
         // `assistancePlus`: "Extension assistance Europe + véhicule remplacement"
         // `assistance`: "Assistance"
         
         // I'll stick to: `assistance` checkbox = Basic (Included). `assistancePlus` = Extension (Paid).
         // If `assistance` is checked, cost is 0 (included in RC).
         // If `assistancePlus` is checked, cost is 66/39.
      }
    }
    
    if (data.coverages.assistancePlus) {
        if (category !== 3 && category !== 4) {
            const amount = isFirst ? COVERAGES.assistance.first : COVERAGES.assistance.additional;
            annualPremium += amount;
            breakdown.push({ label: "coverages.assistancePlus.label", amount });
        }
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
  }

  return {
    annual: Math.round(annualPremium * 100) / 100,
    monthly: Math.round((annualPremium / 12) * 100) / 100,
    breakdown,
    notes,
    details,
  };
}
