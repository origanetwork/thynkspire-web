import { z } from "zod";

// Form-level validation for the website. The server validates again with its own schemas.

const personName = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters.`)
    .max(100, `${label} is too long.`)
    .regex(/^[\p{L} .'-]+$/u, `${label} can contain only letters, spaces, dot and hyphen.`);

export const mobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."));

export const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address."));

export const otp = z.string().regex(/^\d{6}$/, "Enter the 6-digit OTP.");

export const NewSchoolSchema = z.object({
  name: z.string().trim().min(3, "Enter the school name.").max(150),
  address: z.string().trim().min(5, "Enter the school address.").max(300),
  districtId: z.coerce.number<string>().int().positive("Select a district."),
  pincode: z.string().trim().regex(/^6[7-9]\d{4}$/, "Enter a valid Kerala pincode."),
  board: z.enum(["STATE_KERALA", "CBSE", "ICSE", "OTHER"], { error: "Select a board." }),
  type: z.enum(["GOVERNMENT", "AIDED", "UNAIDED"], { error: "Select a school type." }),
  principalName: personName("Principal name"),
  principalPhone: mobile,
  email: z.union([z.literal(""), email]).optional(),
  landline: z.string().trim().max(20).optional(),
});
export type NewSchoolInput = z.input<typeof NewSchoolSchema>;
export type NewSchool = z.output<typeof NewSchoolSchema>;

export const CoordinatorSchema = z.object({
  section: z.enum(["SECONDARY", "HIGHER_SECONDARY"], { error: "Choose your section." }),
  fullName: personName("Full name"),
  designation: z.string().trim().min(2, "Enter your designation / subject.").max(80),
  email: z.union([z.literal(""), email]).optional(),
  mobile,
});
export type CoordinatorInput = z.input<typeof CoordinatorSchema>;
export type Coordinator = z.output<typeof CoordinatorSchema>;

export const StudentSchema = z.object({
  fullName: personName("Full name"),
  classLevel: z.coerce.number<string>().int().min(8, "Select a class.").max(12),
  division: z.string().trim().toUpperCase().regex(/^[A-Z0-9]{1,3}$/, "Enter the division — letters or numbers, up to 3 (e.g. A)."),
  age: z.coerce.number<string>().int().min(10, "Age must be 10–20.").max(20, "Age must be 10–20."),
  gender: z.union([z.literal(""), z.enum(["FEMALE", "MALE", "UNDISCLOSED"])]).optional(),
  parentName: personName("Parent / guardian name"),
  parentMobile: mobile,
});
export type StudentFormInput = z.input<typeof StudentSchema>;
export type StudentForm = z.output<typeof StudentSchema>;

export const TeamSchema = z
  .object({ students: z.tuple([StudentSchema, StudentSchema]) })
  .refine(
    ({ students: [a, b] }) => !(a.fullName.toLowerCase() === b.fullName.toLowerCase() && a.classLevel === b.classLevel),
    { message: "Both team members have the same details.", path: ["students", "1", "fullName"] },
  );

export const ContactSchema = z.object({ contactMobile: mobile });

export const emptyStudent = (): StudentFormInput => ({
  fullName: "",
  classLevel: "",
  division: "",
  age: "",
  gender: "",
  parentName: "",
  parentMobile: "",
});

/** Converts the form shape to the API payload. */
export const toApiStudent = (s: StudentForm) => ({ ...s, gender: s.gender || null });

export const fromApiStudent = (s: {
  fullName: string;
  classLevel: number;
  division: string;
  age: number;
  gender: string | null;
  parentName: string;
  parentMobile: string;
}): StudentFormInput => ({
  fullName: s.fullName,
  classLevel: String(s.classLevel),
  division: s.division,
  age: String(s.age),
  gender: (s.gender ?? "") as StudentFormInput["gender"],
  parentName: s.parentName,
  parentMobile: s.parentMobile,
});
