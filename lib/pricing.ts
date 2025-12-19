import { FormData } from "./types";

export const pricingConfig = {
  basePremium: 200, // Base RC price
  memberDiscount: 0.10, // 10% discount for members
  vehicleMultipliers: {
    car: 1.0,
    motorcycle: 0.8,
    van: 1.1,
    tractor: 0.9,
    truck: 1.5,
    trailer: 0.5,
    moped: 0.6,
  },
  coverages: {
    omnium: { type: "flat", value: 250 },
    assistance: { type: "flat", value: 50 },
    legalProtection: { type: "flat", value: 30 },
    driverProtection: { type: "flat", value: 40 },
    fireTheftResting: { type: "flat", value: 80 },
    assistancePlus: { type: "flat", value: 80 }, // Replaces basic assistance usually, but let's just add it as extra for now or handle logic.
  },
};

export function calculatePremium(data: Partial<FormData>) {
  let annualPremium = pricingConfig.basePremium;
  const breakdown: { label: string; amount: number }[] = [];

  // Base RC
  breakdown.push({ label: "coverages.rc.label", amount: pricingConfig.basePremium });

  // Vehicle Multiplier
  if (data.vehicleType) {
    const multiplier = pricingConfig.vehicleMultipliers[data.vehicleType as keyof typeof pricingConfig.vehicleMultipliers] || 1;
    if (multiplier !== 1) {
      annualPremium *= multiplier;
       // We could show this breakdown but usually base price is just adjusted.
    }
  }

  // Coverages
  if (data.coverages) {
    if (data.coverages.omnium) {
      const amount = pricingConfig.coverages.omnium.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.omnium.label", amount });
    }
    if (data.coverages.assistance) {
      // If assistancePlus is selected, maybe we don't charge basic assistance?
      // Logic: "Extension assistance Europe + véhicule remplacement" usually is an upgrade.
      // Let's assume they are separate options in the form, but maybe mutually exclusive or additive.
      // For now, simple additive.
      const amount = pricingConfig.coverages.assistance.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.assistance.label", amount });
    }
    if (data.coverages.legalProtection) {
      const amount = pricingConfig.coverages.legalProtection.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.legalProtection.label", amount });
    }
    if (data.coverages.driverProtection) {
      const amount = pricingConfig.coverages.driverProtection.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.driverProtection.label", amount });
    }
    if (data.coverages.fireTheftResting) {
      const amount = pricingConfig.coverages.fireTheftResting.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.fireTheftResting.label", amount });
    }
    if (data.coverages.assistancePlus) {
      const amount = pricingConfig.coverages.assistancePlus.value;
      annualPremium += amount;
      breakdown.push({ label: "coverages.assistancePlus.label", amount });
    }
  }

  // Member Discount
  if (data.userStatus === "member") {
    const discountAmount = annualPremium * pricingConfig.memberDiscount;
    annualPremium -= discountAmount;
    breakdown.push({ label: "summary.memberDiscount", amount: -discountAmount });
  }

  return {
    annual: Math.round(annualPremium * 100) / 100,
    monthly: Math.round((annualPremium / 12) * 100) / 100,
    breakdown,
  };
}
