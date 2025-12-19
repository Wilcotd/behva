import { z } from "zod";
import { Dictionary } from "./config";

export const vehicleTypes = [
  "car",
  "motorcycle",
  "van",
  "tractor",
  "truck",
  "trailer",
  "moped",
] as const;

export const registrationStatuses = [
  "not_registered",
  "registered",
  "storage",
] as const;

export const plateTypes = ["normal", "classic"] as const;

export const plateFormats = [
  "rectangular",
  "square",
  "moto",
  "cyclo",
] as const;

export const createFormSchema = (t: Dictionary) => z.object({
  // Step 1: User Profile
  userStatus: z.enum(["member", "not_member"], {
    message: t.validation.required,
  }),
  clubName: z.string().optional(),
  otherClub: z.string().optional(),
  behvaRefNumber: z.string().optional(),
  contractType: z.enum(["new", "change"], {
    message: t.validation.required,
  }),
  vehicleOrContractNumber: z.string().optional(),

  // Step 2: Vehicle
  vehicleType: z.enum(vehicleTypes, {
    message: t.validation.required,
  }),
  registrationStatus: z.enum(registrationStatuses, {
    message: t.validation.required,
  }),
  registrationNumber: z.string().optional(),
  plateType: z.enum(plateTypes, {
    message: t.validation.required,
  }).optional(),
  plateFormat: z.enum(plateFormats, {
    message: t.validation.required,
  }).optional(),
  brand: z.string({
    message: t.validation.brandRequired,
  }).trim().min(1, t.validation.brandRequired),
  model: z.string({
    message: t.validation.modelRequired,
  }).trim().min(1, t.validation.modelRequired),
  chassisNumber: z.string({
    message: t.validation.chassisRequired,
  }).trim().min(1, t.validation.chassisRequired),
  firstRegistrationDate: z.date({
    message: t.validation.dateRequired,
  }),
  powerKw: z.coerce.number({
    message: t.validation.numberInvalid,
  }).min(1, t.validation.powerMin),

  // Step 3: Coverages
  coverages: z.object({
    rc: z.boolean().default(true),
    omnium: z.boolean().default(false),
    assistance: z.boolean().default(true),
    legalProtection: z.boolean().default(false),
    driverProtection: z.boolean().default(false),
    fireTheftResting: z.boolean().default(false),
    assistancePlus: z.boolean().default(false),
  }),

  // Step 4: Contact
  firstName: z.string().min(1, t.validation.firstNameRequired),
  lastName: z.string().min(1, t.validation.lastNameRequired),
  email: z.string().min(1, t.validation.emailRequired).email(t.validation.emailInvalid),
  phone: z.string().optional(),
});

export type FormSchemaType = ReturnType<typeof createFormSchema>;
export type FormData = z.infer<FormSchemaType>;

export const defaultValues: Partial<FormData> = {
  userStatus: "not_member",
  contractType: "new",
  coverages: {
    rc: true,
    omnium: false,
    assistance: true,
    legalProtection: false,
    driverProtection: false,
    fireTheftResting: false,
    assistancePlus: false,
  },
};
