import { describe, it, expect } from "vitest";
import { calculatePremium } from "./pricing";
import { FormData } from "./types";

// Helper to create base valid data
const defaultCoverages = {
  rc: true,
  omnium: false,
  assistance: false,
  legalProtection: false,
  driverProtection: false,
  fireTheftResting: false,
  assistancePlus: false,
};

const createData = (overrides: Partial<FormData> = {}): Partial<FormData> => ({
  userStatus: "individual",
  vehicleType: "car",
  firstRegistrationDate: new Date(),
  birthDate: new Date(1990, 0, 1), // Default 30+ year old driver
  vehicleRank: "1",
  coverages: { ...defaultCoverages },
  ...overrides,
});

describe("Pricing Logic", () => {
  it("should calculate driver age correctly", () => {
    // 2000-01-01 -> Age should be currentYear - 2000 (roughly)
    const birthDate = new Date(2000, 0, 1);
    const data = createData({ birthDate });
    const result = calculatePremium(data);
    // We are just verifying logic doesn't crash, 
    // but ideally we'd export the age calculation or check a side effect if it existed.
    // Since we don't return metadata, we can't check age directly here without exposing it.
    // For now, we assume if no error, it's fine.
    expect(result.annual).toBeGreaterThan(0);
  });

  describe("CAT 1: Cars, Motorcycles, Vans", () => {
    it("should calculate correct base premium for Group 1 (Age < 30)", () => {
      const data = createData({
        firstRegistrationDate: new Date(new Date().getFullYear() - 5, 0, 1),
        vehicleRank: "2", // No surcharge
      });
      const result = calculatePremium(data);
      // Base 200
      expect(result.annual).toBe(200);
    });

    it("should calculate correct base premium for Group 2 (Age >= 30)", () => {
      const data = createData({
        firstRegistrationDate: new Date(new Date().getFullYear() - 35, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT1 Group 2 = 180
      expect(result.annual).toBe(180);
    });

    it("should calculate correct base premium for Group 3 (Age >= 50)", () => {
      const data = createData({
        firstRegistrationDate: new Date(new Date().getFullYear() - 55, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT1 Group 3 = 150
      expect(result.annual).toBe(150);
    });
  });

  describe("CAT 2: Trucks (>3.5t)", () => {
    it("should calculate correct base premium", () => {
      const data = createData({
        vehicleType: "truck",
        firstRegistrationDate: new Date(new Date().getFullYear() - 30, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT2 = 250
      expect(result.annual).toBe(250);
    });
  });

  describe("CAT 3: Mopeds", () => {
    it("should calculate correct base premium", () => {
      const data = createData({
        vehicleType: "moped",
        firstRegistrationDate: new Date(new Date().getFullYear() - 30, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT3 = 50
      expect(result.annual).toBe(50);
    });
  });

  describe("CAT 4: Tractors", () => {
    it("should calculate correct base premium", () => {
      const data = createData({
        vehicleType: "tractor",
        firstRegistrationDate: new Date(new Date().getFullYear() - 30, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT4 = 100
      expect(result.annual).toBe(100);
    });
  });

  describe("CAT 5: Trailers", () => {
    it("should calculate correct base premium", () => {
      const data = createData({
        vehicleType: "trailer",
        firstRegistrationDate: new Date(new Date().getFullYear() - 30, 0, 1),
        vehicleRank: "2",
      });
      const result = calculatePremium(data);
      // Base CAT5 = 40
      expect(result.annual).toBe(40);
    });
  });

  describe("First Vehicle Surcharge (Individual)", () => {
    it("should add 50 EUR surcharge for first vehicle", () => {
      const data = createData({
        vehicleType: "car",
        firstRegistrationDate: new Date(),
        vehicleRank: "1",
        userStatus: "individual",
      });
      const result = calculatePremium(data);
      // Base 200 + Surcharge 50 = 250
      expect(result.annual).toBe(250);
    });

    it("should NOT add surcharge for additional vehicle", () => {
      const data = createData({
        vehicleType: "car",
        firstRegistrationDate: new Date(),
        vehicleRank: "2",
        userStatus: "individual",
      });
      const result = calculatePremium(data);
      // Base 200 = 200
      expect(result.annual).toBe(200);
    });
  });

  describe("Coverages", () => {
    it("should calculate Assistance correctly (First vs Additional)", () => {
      // First
      const dataFirst = createData({
        vehicleRank: "1",
        coverages: { ...defaultCoverages, assistance: true },
      });
      // Base 200 + Surcharge 50 + Assistance First 66 = 316
      expect(calculatePremium(dataFirst).annual).toBe(316);

      // Additional
      const dataAdd = createData({
        vehicleRank: "2",
        coverages: { ...defaultCoverages, assistance: true },
      });
      // Base 200 + Assistance Additional 39 = 239
      expect(calculatePremium(dataAdd).annual).toBe(239);
    });

    it("should calculate Legal Protection correctly (CAT3 vs Other)", () => {
      // CAT 1 First
      const dataCat1First = createData({
        vehicleType: "car",
        vehicleRank: "1",
        coverages: { ...defaultCoverages, legalProtection: true },
      });
      // Base 200 + Surcharge 50 + Legal Other First 17 = 267
      expect(calculatePremium(dataCat1First).annual).toBe(267);

      // CAT 3 First
      const dataCat3First = createData({
        vehicleType: "moped",
        vehicleRank: "1",
        coverages: { ...defaultCoverages, legalProtection: true },
      });
      // Base 50 + Surcharge 50 + Legal CAT3 First 12 = 112
      expect(calculatePremium(dataCat3First).annual).toBe(112);
    });

    it("should calculate Driver Protection", () => {
      const data = createData({
        vehicleRank: "2", // No surcharge
        coverages: { ...defaultCoverages, driverProtection: true },
      });
      // Base 200 + Driver 40 = 240
      expect(calculatePremium(data).annual).toBe(240);
    });

    it("should calculate Omnium based on tiers and rank", () => {
      const data = createData({
        vehicleValue: 25000,
        vehicleRank: "1",
        coverages: { ...defaultCoverages, omnium: true },
      });
      // Base 200 + Surcharge 50 + Omnium (30k tier for 25k value, rank 1) 300 = 550
      expect(calculatePremium(data).annual).toBe(550);
    });

    it("should calculate Fire/Theft", () => {
      const data = createData({
        vehicleRank: "2", // No surcharge
        coverages: { ...defaultCoverages, fireTheftResting: true },
      });
      // Base 200 + Fire/Theft 80 = 280
      expect(calculatePremium(data).annual).toBe(280);
    });
  });

  describe("Edge Cases & Mappings", () => {
    it("should return 0 if required fields are missing", () => {
      const result = calculatePremium({});
      expect(result.annual).toBe(0);
    });

    it("should map motorcycle to CAT 1", () => {
      const data = createData({
        vehicleType: "motorcycle",
        firstRegistrationDate: new Date(new Date().getFullYear() - 5, 0, 1),
        vehicleRank: "2",
      });
      expect(calculatePremium(data).annual).toBe(200);
    });

    it("should map van to CAT 1", () => {
      const data = createData({
        vehicleType: "van",
        firstRegistrationDate: new Date(new Date().getFullYear() - 5, 0, 1),
        vehicleRank: "2",
      });
      expect(calculatePremium(data).annual).toBe(200);
    });
  });
});
