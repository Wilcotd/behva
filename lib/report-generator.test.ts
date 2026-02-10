
import { describe, it } from 'vitest';
import { calculatePremium } from './pricing';
import { FormData } from './types';
import * as fs from 'fs';
import * as path from 'path';

// Helper to create date years ago
const yearsAgo = (years: number) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date;
};

interface Scenario {
  name: string;
  data: Partial<FormData>;
}

const scenarios: Scenario[] = [
  // RC Base Scenarios
  {
    name: "RC: Car (>40y), 1st Vehicle",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Car (25-39y), 1st Vehicle",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(30),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Car (15-24y), <= 140kW",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(20),
      vehicleRank: '1',
      userStatus: 'club_member',
      powerKw: 100,
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Car (15-24y), > 140kW",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(20),
      vehicleRank: '1',
      userStatus: 'club_member',
      powerKw: 150,
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Motorcycle (15-24y)",
    data: {
      vehicleType: 'motorcycle',
      firstRegistrationDate: yearsAgo(20),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Truck (>40y)",
    data: {
      vehicleType: 'truck',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Moped (>15y)",
    data: {
      vehicleType: 'moped',
      firstRegistrationDate: yearsAgo(16),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },
  {
    name: "RC: Trailer (>25y)",
    data: {
      vehicleType: 'trailer',
      firstRegistrationDate: yearsAgo(26),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true } as any
    }
  },

  // Surcharges
  {
    name: "Surcharge: Individual, 1st Vehicle (+50 EUR)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'individual',
      coverages: { rc: true } as any
    }
  },
  {
    name: "Surcharge: Individual, 2nd Vehicle (No Surcharge)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '2',
      userStatus: 'individual',
      coverages: { rc: true } as any
    }
  },

  // Additional Coverages
  {
    name: "Coverage: Assistance Plus (Extension) (+66 EUR)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true, assistancePlus: true } as any
    }
  },
  {
    name: "Coverage: Legal Protection (Car) (+17 EUR)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true, legalProtection: true } as any
    }
  },
  {
    name: "Coverage: Driver Protection (Car) (+9 EUR)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      coverages: { rc: true, driverProtection: true } as any
    }
  },
  
  // Omnium Scenarios
  {
    name: "Omnium: Mini (>25y) - 0.83% of 10000 EUR (Min Premium Applied)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(30),
      vehicleRank: '1',
      userStatus: 'club_member',
      vehicleValue: 10000,
      coverages: { rc: true, omnium: true, omniumType: 'mini' } as any
    }
  },
  {
    name: "Omnium: Full (Table) - 20000 EUR, Rank 1",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(41),
      vehicleRank: '1',
      userStatus: 'club_member',
      vehicleValue: 20000,
      coverages: { rc: true, omnium: true, omniumType: 'full' } as any
    }
  },
  {
    name: "Omnium: Full (Percentage) - 60000 EUR, >25y (1.18%)",
    data: {
      vehicleType: 'car',
      firstRegistrationDate: yearsAgo(26),
      vehicleRank: '1',
      userStatus: 'club_member',
      vehicleValue: 60000,
      coverages: { rc: true, omnium: true, omniumType: 'full' } as any
    }
  }
];

describe('Report Generation', () => {
  it('generates a comprehensive calculation report', () => {
    let report = "# BEHVA Calculation Logic Verification Report\n\n";
    report += `Generated on: ${new Date().toLocaleString()}\n\n`;
    report += "This report verifies the premium calculation logic for various scenarios, covering different vehicle types, user statuses, and coverage options.\n\n";
    report += "| Scenario | Details | Total Annual Premium |\n";
    report += "|---|---|---|\n";

    scenarios.forEach(scenario => {
      const result = calculatePremium(scenario.data);
      
      const details = [
        `Type: ${scenario.data.vehicleType}`,
        `Age: ${new Date().getFullYear() - (scenario.data.firstRegistrationDate?.getFullYear() || 0)}y`,
        scenario.data.powerKw ? `Power: ${scenario.data.powerKw}kW` : '',
        scenario.data.vehicleValue ? `Value: €${scenario.data.vehicleValue}` : '',
        `Status: ${scenario.data.userStatus}`
      ].filter(Boolean).join('<br>');

      report += `| **${scenario.name}** | ${details} | **€${result.annual.toFixed(2)}** |\n`;
    });

    report += "\n## Calculation Rules Breakdown\n\n";
    report += "### 1. Civil Liability (RC) Base Premiums\n\n";
    
    report += "#### Category 1: Cars, Motorcycles, Vans (<3.5t)\n";
    report += "- **Group 1 (> 40 years)**:\n";
    report += "  - 1st Vehicle: €79.00\n";
    report += "  - Additional: €33.00\n";
    report += "- **Group 2 (25-39 years)**:\n";
    report += "  - 1st Vehicle: €119.00\n";
    report += "  - Additional: €33.00\n";
    report += "- **Group 3 (15-24 years)**:\n";
    report += "  - **Motorcycles**: €167.00\n";
    report += "  - **Cars/Vans**:\n";
    report += "    - Power ≤ 140 kW: €214.00\n";
    report += "    - Power > 140 kW: €264.00\n";

    report += "\n#### Category 2: Trucks, Buses (>3.5t)\n";
    report += "- **Group 1 (> 40 years)**:\n";
    report += "  - 1st Vehicle: €94.00\n";
    report += "  - Additional: €49.00\n";
    report += "- **Group 2 (25-39 years)**:\n";
    report += "  - 1st Vehicle: €134.00\n";
    report += "  - Additional: €49.00\n";
    report += "- **Group 3 (15-24 years)**:\n";
    report += "  - 1st Vehicle: €239.00\n";
    report += "  - Additional: €239.00\n";

    report += "\n#### Category 3: Mopeds\n";
    report += "- **Group 1 (> 15 years)**:\n";
    report += "  - 1st Vehicle: €73.00\n";
    report += "  - Additional: €17.00\n";

    report += "\n#### Category 4: Tractors\n";
    report += "- **Group 1 (> 40 years)**:\n";
    report += "  - 1st Vehicle: €43.00\n";
    report += "  - Additional: €17.00\n";
    report += "- **Group 2 (25-39 years)**:\n";
    report += "  - 1st Vehicle: €58.00\n";
    report += "  - Additional: €17.00\n";

    report += "\n#### Category 5: Trailers & Caravans\n";
    report += "- **Group 1 (15-24 years)**: €50.00\n";
    report += "- **Group 2 (> 25 years)**: €25.00\n";

    report += "\n### 2. Surcharges\n";
    report += "- **Individual Status**: +€50.00 on the first vehicle only.\n";

    report += "\n### 3. Optional Coverages\n";
    report += "- **Assistance Plus (Extension)**:\n";
    report += "  - 1st Vehicle: €66.00\n";
    report += "  - Additional: €39.00\n";
    report += "- **Legal Protection**:\n";
    report += "  - Mopeds (CAT 3): €12.00 (1st)\n";
    report += "  - All Others: €17.00 (1st)\n";
    report += "- **Driver Protection**:\n";
    report += "  - Cars/Vans: €9.00\n";
    report += "  - Motorcycles/Mopeds: €12.00\n";
    
    report += "\n### 4. Omnium\n";
    report += "- **Storage (Resting)**:\n";
    report += "  - Age ≥ 15 years: 0.58% of value\n";
    report += "- **Mini Omnium**:\n";
    report += "  - Age ≥ 25 years: 0.83% of value\n";
    report += "  - Age 15-24 years: 1.18% of value\n";
    report += "- **Full Omnium**:\n";
    report += "  - **Value ≤ €50,000** (Table Rates):\n";
    report += "    - ≤ €10k: €175 (all ranks)\n";
    report += "    - ≤ €20k: €230 (1st), €175 (Add.)\n";
    report += "    - ≤ €30k: €330 (1st), €235 (2nd), €175 (3rd+)\n";
    report += "    - ≤ €40k: €430 (1st), €335 (2nd), €175 (3rd+)\n";
    report += "    - ≤ €50k: €530 (1st), €435 (2nd), €175 (3rd+)\n";
    report += "  - **Value > €50,000** (Percentage Rates):\n";
    report += "    - Age ≥ 25 years:\n";
    report += "      - Value ≤ €75k: 1.18%\n";
    report += "      - Value ≤ €150k: 0.98%\n";
    report += "    - Age 15-24 years:\n";
    report += "      - Value ≤ €75k: 1.48%\n";
    report += "      - Value ≤ €150k: 1.38%\n";
    report += "- **Minimum Premium**:\n";
    report += "  - Two-wheelers: €135.00\n";
    report += "  - Others: €175.00\n";

    fs.writeFileSync(path.join(process.cwd(), 'CALCULATION_REPORT.md'), report);
    console.log("Report generated at CALCULATION_REPORT.md");
  });
});
