export type Section = "SECONDARY" | "HIGHER_SECONDARY";
export type TeamStatus = "DRAFT" | "PAYMENT_PENDING" | "CONFIRMED" | "CANCELLED" | "EXPIRED";
export type TeamSource = "TEACHER" | "STUDENT_LINK";
export type PaymentStatus = "CREATED" | "CAPTURED" | "FAILED";

export type Fee = {
  studentCount: number;
  feePerStudentPaise: number;
  gstPerStudentPaise: number;
  totalPerStudentPaise: number;
  subtotalPaise: number;
  gatewayFeePaise: number;
  totalPaise: number;
  gstPercent: number;
  gatewayFeePercent: number;
};

export type PublicSettings = {
  name: string;
  year: number;
  registrationOpen: boolean;
  closingDate: string | null;
  editDeadline: string | null;
  draftExpiryHours: number;
  fee: Fee;
};

export type District = { id: number; name: string; code: string };

export type SlotStatus = { status: "OPEN" | "TAKEN" | "IN_PROGRESS" | "UNAVAILABLE"; coordinatorName?: string };

export type SchoolSearchResult = {
  id: string;
  name: string;
  address: string;
  district: string;
  pincode: string;
  board: string;
  sections: Record<Section, SlotStatus>;
};

export type Student = {
  id: string;
  position: number;
  fullName: string;
  classLevel: number;
  division: string;
  age: number;
  gender: string | null;
  parentName: string;
  parentMobile: string;
};

export type Payment = {
  id: string;
  razorpayOrderId: string;
  razorpayPaymentId: string | null;
  status: PaymentStatus;
  paidBy: TeamSource;
  baseAmountPaise: number;
  gstAmountPaise: number;
  gatewayFeePaise: number;
  totalPaise: number;
  method: string | null;
  failureReason: string | null;
  receiptNo: string | null;
  capturedAt: string | null;
  createdAt: string;
};

export type Team = {
  id: string;
  teamCode: string | null;
  draftNo: string;
  status: TeamStatus;
  source: TeamSource;
  section: Section;
  sectionLabel: string;
  contactEmail: string;
  contactMobile: string;
  termsAccepted: boolean;
  expiresAt: string | null;
  confirmedAt: string | null;
  createdAt: string;
  school: { id: string; name: string; district: string; address: string };
  coordinator: { id: string; fullName: string; schoolCode: string };
  students: Student[];
  payment: Payment | null;
  payments: Payment[];
};

export type Duplicate = { fullName: string; classLevel: number; division: string; teamCode: string | null };

export type DraftResponse = { team: Team; duplicates: Duplicate[]; fee: Fee; token?: string };

export type CheckoutOrder = {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: { email: string; contact: string };
  fee: Fee;
};

export type TeacherMe = {
  id: string;
  fullName: string;
  designation: string;
  email: string;
  mobile: string;
  section: Section;
  sectionLabel: string;
  schoolCode: string;
  studentLink: string;
  school: { id: string; name: string; district: string };
};

export type Paged<T> = { items: T[]; meta: { page: number; pageSize: number; total: number; totalPages: number } };
