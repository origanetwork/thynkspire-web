export const rupees = (paise: number) =>
  "₹" + (paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const rupeesShort = (paise: number) =>
  "₹" + (paise / 100).toLocaleString("en-IN", { maximumFractionDigits: paise % 100 ? 2 : 0 });

export const dateTime = (d?: string | Date | null) =>
  d ? new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

export const dateOnly = (d?: string | Date | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export const phone = (m?: string | null) => (m ? `+91 ${m.slice(0, 5)} ${m.slice(5)}` : "—");

export const maskPhone = (m?: string | null) => (m ? `+91 ${m.slice(0, 2)}XXX XXX${m.slice(-2)}` : "—");

export const initials = (name: string) =>
  name
    .replace(/^(mr|ms|mrs|dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

export const SOURCE_LABEL = { TEACHER: "Teacher", STUDENT_LINK: "Student link" } as const;

export const SECTION_SHORT = { SECONDARY: "Secondary (8–10)", HIGHER_SECONDARY: "Higher Secondary (11–12)" } as const;

export const BOARD_LABEL = { STATE_KERALA: "State (Kerala)", CBSE: "CBSE", ICSE: "ICSE", OTHER: "Other" } as const;

export const SCHOOL_TYPE_LABEL = { GOVERNMENT: "Government", AIDED: "Aided", UNAIDED: "Unaided" } as const;
