
import { describe, it, expect } from 'vitest';
import { calculatePremium } from './pricing';
import { FormData } from './types';

// Helper to create date years ago
const yearsAgo = (years: number) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - years);
  return date;
};

describe('Pricing Calculation', () => {
  describe('RC Base Premiums', () => {
    it('CAT 1 (Car) Group 1 (>40y) - 1st Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79);
    });

    it('CAT 1 (Car) Group 2 (25-39y) - 1st Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(30),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(119);
    });

    it('CAT 1 (Car) Group 3 (15-24y) <= 140kW', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(20),
        vehicleRank: '1',
        userStatus: 'club_member',
        powerKw: 100,
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(214);
    });

    it('CAT 1 (Car) Group 3 (15-24y) > 140kW', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(20),
        vehicleRank: '1',
        userStatus: 'club_member',
        powerKw: 150,
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(264);
    });

    it('CAT 1 (Moto) Group 3 (15-24y)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'motorcycle',
        firstRegistrationDate: yearsAgo(20),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(167);
    });

    it('CAT 2 (Truck) Group 1 (>40y) - 1st Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'truck',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(94);
    });

    it('CAT 3 (Moped) Group 1 (>15y) - 1st Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'moped',
        firstRegistrationDate: yearsAgo(16),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(73);
    });
    
    it('CAT 5 (Trailer) Group 2 (>25y)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'trailer',
        firstRegistrationDate: yearsAgo(26),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(25);
    });
  });

  describe('User Status Surcharge', () => {
    it('Individual Surcharge (+50) on 1st Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41), // Base 79
        vehicleRank: '1',
        userStatus: 'individual',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79 + 50);
    });

    it('No Surcharge for Individual on 2nd Vehicle', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41), // Base 33 for additional
        vehicleRank: '2',
        userStatus: 'individual',
        coverages: { rc: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(33); // No +50
    });
  });

  describe('Additional Coverages', () => {
    it('Assistance (Basic) - Free/Included', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true, assistance: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79); // No extra charge
    });

    it('Assistance Plus (Extension) - 1st Vehicle (+66)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true, assistancePlus: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79 + 66);
    });

    it('Assistance Plus (Extension) - 2nd Vehicle (+39)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41), // Base 33
        vehicleRank: '2',
        userStatus: 'club_member',
        coverages: { rc: true, assistancePlus: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(33 + 39);
    });

    it('Legal Protection - Car (+17)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true, legalProtection: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79 + 17);
    });

    it('Legal Protection - Moped (+12)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'moped',
        firstRegistrationDate: yearsAgo(16), // Base 73
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true, legalProtection: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(73 + 12);
    });

    it('Driver Protection - Car (+9)', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(41),
        vehicleRank: '1',
        userStatus: 'club_member',
        coverages: { rc: true, driverProtection: true } as any
      };
      const result = calculatePremium(data);
      expect(result.annual).toBe(79 + 9);
    });
  });

  describe('Omnium', () => {
    it('Mini Omnium (>25y) - 0.83%', () => {
      const value = 10000;
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(30), // Base 119
        vehicleRank: '1',
        userStatus: 'club_member',
        vehicleValue: value,
        coverages: { rc: true, omnium: true, omniumType: 'mini' } as any
      };
      const result = calculatePremium(data);
      // Min premium check: 10000 * 0.0083 = 83. 
      // Min premium is 175. So expected is 119 + 175 = 294.
      expect(result.annual).toBe(119 + 175); 
    });

    it('Mini Omnium (>25y) - High Value', () => {
      const value = 30000;
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(30), // Base 119
        vehicleRank: '1',
        userStatus: 'club_member',
        vehicleValue: value,
        coverages: { rc: true, omnium: true, omniumType: 'mini' } as any
      };
      const result = calculatePremium(data);
      // 30000 * 0.0083 = 249. > 175.
      // Total = 119 + 249 = 368.
      expect(result.annual).toBe(119 + 249);
    });

    it('Full Omnium (Table) - Value 20000, Rank 1', () => {
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(10), // Too young for RC? calculatePremium returns 0 RC if too young.
        // Wait, calculatePremium handles "no ageGroup" by setting rcAmount=0.
        // But for Full Omnium, let's use a valid age for RC but < 15 for Omnium? 
        // No, Omnium usually requires < something? Or > something?
        // Logic: if value <= 50000, uses table.
        // Let's use valid age for RC (e.g. 40y) to avoid RC=0 confusion.
        firstRegistrationDate: yearsAgo(41), // Base 79
        vehicleRank: '1',
        userStatus: 'club_member',
        vehicleValue: 20000,
        coverages: { rc: true, omnium: true, omniumType: 'full' } as any
      };
      // Table for 20000: Rank 1 -> 230.
      const result = calculatePremium(data);
      expect(result.annual).toBe(79 + 230);
    });

    it('Full Omnium (Percentage) - Value 60000, >25y', () => {
      const value = 60000;
      const data: Partial<FormData> = {
        vehicleType: 'car',
        firstRegistrationDate: yearsAgo(26), // Base 119
        vehicleRank: '1',
        userStatus: 'club_member',
        vehicleValue: value,
        coverages: { rc: true, omnium: true, omniumType: 'full' } as any
      };
      // >50k, >25y, <=75k -> 1.18%
      // 60000 * 0.0118 = 708.
      const result = calculatePremium(data);
      expect(result.annual).toBe(119 + 708);
    });
  });
});
