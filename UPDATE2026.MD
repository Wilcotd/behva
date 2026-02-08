You are a senior product analyst + data modeler for an existing React + Next.js insurance pricing app.

Goal
1) Infer the complete “current system schema” (fields, enums, rules) from the existing app I provide (UI forms, API payloads, DB models, TypeScript types, validation schemas, pricing logic).
2) Parse and normalize the “Client doc (2026 tariff grid)” I provide in plain text below.
3) Produce a precise delta report: which NEW fields/rules are required by the 2026 doc, which existing fields are now UNUSED/obsolete, and what must CHANGE in pricing logic and UI.
4) Output MUST be in English (even though the client content is French).
5) Be strict: do not guess. If something is ambiguous, label it “Unknown” and propose 1–3 plausible interpretations with the exact question to ask the client.

Inputs I will provide to you next (you must request nothing else):
- Existing app artifacts: (a) current data model/types, (b) current pricing tables/config, (c) current UI fields + validation, (d) sample payloads, (e) any business rules.
- The client doc text is included below.

What you must do (step-by-step)
A) Extract “Client 2026 Model”
- Identify all insurance products/coverages mentioned:
  - R.C. + Assistance (base premium tables by category + age group + first vs additional vehicle)
  - BEHVA Assistance (included + optional “Europe extension” add-on pricing, first vs second+ vehicle)
  - Protection Juridique (legal protection pricing by category, first vs additional)
  - Omnium (pricing by vehicle value band and vehicle count tier)
- Extract all dimensions (pricing keys) and values:
  - Contract timing: annual renewal = contract effective date (“échéance annuelle = prise d’effet du contrat”)
  - Membership types: “Club Member”, “Supporter”, and “Individual” surcharge rule (+50€ on first vehicle)
  - Vehicle category groups:
    - CAT 1: (<3.5t) cars, motorcycles, vans (camionnettes)
    - CAT 2: (>3.5t) trucks, buses
    - CAT 3: mopeds (vélomoteurs)
    - CAT 4: agricultural tractors
    - CAT 5: trailers/caravans >750kg, ONLY if towing vehicle is also insured at BEHVA; table uses “Full Club Member”
  - Age groups by category (note CAT 1 has special split for Group 3 cars/vans vs Group 3 motorcycles)
  - “First vehicle” vs “Additional vehicle(s)” pricing
  - Group 3 prorata by month rule (for groups 1 and 2: fixed/indivisible; group 3: monthly pro-rata)
  - Power threshold rule for CAT 1 Group 3 cars/vans: up to 140 kW vs from 141 kW, and “bonus-malus 00” note
  - Assistance included exception: NOT included for mopeds and agricultural tractors
  - Assistance deductible rule: 5km from home (except in accident)
  - Assistance coverage countries list (Belgium, Netherlands, Luxembourg, Germany, France, Switzerland, UK + regions)
  - Optional extension: Europe-wide + replacement vehicle + family assistance:
    - First vehicle: 66 EUR/year
    - From second vehicle: 39 EUR/year
  - Legal protection coverage: free choice of lawyer; civil/criminal/contractual recourse; 12,500 EUR per claim
  - Legal protection pricing table:
    - “All categories”: 17€ first, free additional
    - “Cyclomoteurs” (mopeds): 12€ first, free additional
  - Omnium pricing table by vehicle value band and vehicle count tier:
    - 1–10,000: 175/175/175
    - 10,001–20,000: 230/175/175
    - 20,001–30,000: 330/235/175
    - 30,001–40,000: 430/335/175
    - 40,001–50,000: 530/435/175
- Produce a normalized JSON-like schema (conceptual) that represents all required keys and price cells.

B) Extract “Current App Model”
- From the provided code/types/payloads, list:
  - Entities (Contract, Policy, Vehicle, Coverages, Customer, Membership, PricingConfig, etc.)
  - Fields per entity (name, type, required/optional, enum values)
  - Derived fields used in pricing
  - Which fields are used in UI vs API vs pricing
  - Existing constraints and validation rules

C) Diff & Impact Report (primary deliverable)
1) NEW fields/rules required by 2026 doc
For each item include:
- Field/Rule name
- Where it belongs (entity: Contract / Vehicle / Coverage / Membership / PricingConfig)
- Type / enum / validation
- Why needed (quote the relevant doc snippet in paraphrase)
- Impacted screens, API payloads, DB, pricing engine modules

2) Fields/rules potentially obsolete (not used anymore)
- Only claim “obsolete” if the field is clearly not referenced by any 2026 requirement AND not referenced by the current pricing/UI logic.
- Otherwise mark as “Still used by app” or “Not mentioned in 2026 doc but may remain (confirm)”.

3) Pricing logic changes
- Summarize pricing formulas and decision tree:
  - Base RC+Assistance premium selection by (category, age group, first/additional, power band if applicable)
  - Membership surcharge rule (+50€ on first vehicle for Individual) and applicability constraints (“valid for Club Member and Supporter; +50 for Individual”)
  - Monthly pro-rata rule for Group 3 and fixed premium rule for Groups 1–2
  - Assistance included/excluded by category and optional extension add-on by vehicle count
  - Legal protection pricing selection by category type (all vs mopeds) and free additional vehicles
  - Omnium selection by vehicle value band and vehicle count tier
- Flag ambiguities (e.g., how “bonus-malus 00” interacts with pricing; whether “first vehicle” means per contract or per coverage; whether “Individual” is a membership type or customer type).

4) Data tables to implement
- Provide a compact matrix list for each tariff table (CAT1..CAT5, Legal Protection, Omnium, Assistance extension) in a machine-friendly structure.
- Ensure numeric parsing correctness (EUR amounts, commas vs dots) and consistent currency formatting.

D) Output format (MUST follow exactly)
Return in this structure:

1. Executive Summary (5–10 bullets)
2. Client 2026 Requirements Model
   2.1 Entities & Fields
   2.2 Pricing Dimensions & Rules
   2.3 Extracted Tariff Tables (machine-friendly)
3. Current App Model (from provided artifacts)
4. Delta Analysis
   4.1 New fields/rules to add (ranked high/med/low priority)
   4.2 Fields/rules potentially unused/obsolete
   4.3 Pricing engine changes (pseudocode allowed)
   4.4 UI/API/DB impact checklist
5. Ambiguities & Questions for Client (only if needed)

Constraints
- Use English only.
- Be precise, do not invent business rules.
- Treat the client doc below as the source of truth for 2026 pricing.
- When you see French terms, translate them but keep the original term in parentheses once.
- Use consistent naming for enums (e.g., VEHICLE_CATEGORY_CAT1, AGE_GROUP_G1_OVER_40, etc.).

Client doc (2026 tariff grid)
[PASTE EXACT TEXT PROVIDED IN THIS CHAT HERE, UNCHANGED]
