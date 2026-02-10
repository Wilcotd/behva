# BEHVA Calculation Logic Verification Report

Generated on: 2/10/2026, 5:27:41 PM

This report verifies the premium calculation logic for various scenarios, covering different vehicle types, user statuses, and coverage options.

| Scenario | Details | Total Annual Premium |
|---|---|---|
| **RC: Car (>40y), 1st Vehicle** | Type: car<br>Age: 41y<br>Status: club_member | **€79.00** |
| **RC: Car (25-39y), 1st Vehicle** | Type: car<br>Age: 30y<br>Status: club_member | **€119.00** |
| **RC: Car (15-24y), <= 140kW** | Type: car<br>Age: 20y<br>Power: 100kW<br>Status: club_member | **€214.00** |
| **RC: Car (15-24y), > 140kW** | Type: car<br>Age: 20y<br>Power: 150kW<br>Status: club_member | **€264.00** |
| **RC: Motorcycle (15-24y)** | Type: motorcycle<br>Age: 20y<br>Status: club_member | **€167.00** |
| **RC: Truck (>40y)** | Type: truck<br>Age: 41y<br>Status: club_member | **€94.00** |
| **RC: Moped (>15y)** | Type: moped<br>Age: 16y<br>Status: club_member | **€73.00** |
| **RC: Trailer (>25y)** | Type: trailer<br>Age: 26y<br>Status: club_member | **€25.00** |
| **Surcharge: Individual, 1st Vehicle (+50 EUR)** | Type: car<br>Age: 41y<br>Status: individual | **€129.00** |
| **Surcharge: Individual, 2nd Vehicle (No Surcharge)** | Type: car<br>Age: 41y<br>Status: individual | **€33.00** |
| **Coverage: Assistance Plus (Extension) (+66 EUR)** | Type: car<br>Age: 41y<br>Status: club_member | **€145.00** |
| **Coverage: Legal Protection (Car) (+17 EUR)** | Type: car<br>Age: 41y<br>Status: club_member | **€96.00** |
| **Coverage: Driver Protection (Car) (+9 EUR)** | Type: car<br>Age: 41y<br>Status: club_member | **€88.00** |
| **Omnium: Mini (>25y) - 0.83% of 10000 EUR (Min Premium Applied)** | Type: car<br>Age: 30y<br>Value: €10000<br>Status: club_member | **€294.00** |
| **Omnium: Full (Table) - 20000 EUR, Rank 1** | Type: car<br>Age: 41y<br>Value: €20000<br>Status: club_member | **€309.00** |
| **Omnium: Full (Percentage) - 60000 EUR, >25y (1.18%)** | Type: car<br>Age: 26y<br>Value: €60000<br>Status: club_member | **€827.00** |

## Calculation Rules Breakdown

### 1. Civil Liability (RC) Base Premiums

#### Category 1: Cars, Motorcycles, Vans (<3.5t)
- **Group 1 (> 40 years)**:
  - 1st Vehicle: €79.00
  - Additional: €33.00
- **Group 2 (25-39 years)**:
  - 1st Vehicle: €119.00
  - Additional: €33.00
- **Group 3 (15-24 years)**:
  - **Motorcycles**: €167.00
  - **Cars/Vans**:
    - Power ≤ 140 kW: €214.00
    - Power > 140 kW: €264.00

#### Category 2: Trucks, Buses (>3.5t)
- **Group 1 (> 40 years)**:
  - 1st Vehicle: €94.00
  - Additional: €49.00
- **Group 2 (25-39 years)**:
  - 1st Vehicle: €134.00
  - Additional: €49.00
- **Group 3 (15-24 years)**:
  - 1st Vehicle: €239.00
  - Additional: €239.00

#### Category 3: Mopeds
- **Group 1 (> 15 years)**:
  - 1st Vehicle: €73.00
  - Additional: €17.00

#### Category 4: Tractors
- **Group 1 (> 40 years)**:
  - 1st Vehicle: €43.00
  - Additional: €17.00
- **Group 2 (25-39 years)**:
  - 1st Vehicle: €58.00
  - Additional: €17.00

#### Category 5: Trailers & Caravans
- **Group 1 (15-24 years)**: €50.00
- **Group 2 (> 25 years)**: €25.00

### 2. Surcharges
- **Individual Status**: +€50.00 on the first vehicle only.

### 3. Optional Coverages
- **Assistance Plus (Extension)**:
  - 1st Vehicle: €66.00
  - Additional: €39.00
- **Legal Protection**:
  - Mopeds (CAT 3): €12.00 (1st)
  - All Others: €17.00 (1st)
- **Driver Protection**:
  - Cars/Vans: €9.00
  - Motorcycles/Mopeds: €12.00

### 4. Omnium
- **Storage (Resting)**:
  - Age ≥ 15 years: 0.58% of value
- **Mini Omnium**:
  - Age ≥ 25 years: 0.83% of value
  - Age 15-24 years: 1.18% of value
- **Full Omnium**:
  - **Value ≤ €50,000** (Table Rates):
    - ≤ €10k: €175 (all ranks)
    - ≤ €20k: €230 (1st), €175 (Add.)
    - ≤ €30k: €330 (1st), €235 (2nd), €175 (3rd+)
    - ≤ €40k: €430 (1st), €335 (2nd), €175 (3rd+)
    - ≤ €50k: €530 (1st), €435 (2nd), €175 (3rd+)
  - **Value > €50,000** (Percentage Rates):
    - Age ≥ 25 years:
      - Value ≤ €75k: 1.18%
      - Value ≤ €150k: 0.98%
    - Age 15-24 years:
      - Value ≤ €75k: 1.48%
      - Value ≤ €150k: 1.38%
- **Minimum Premium**:
  - Two-wheelers: €135.00
  - Others: €175.00
