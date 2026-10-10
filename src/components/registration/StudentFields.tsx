"use client";

import React from "react";
import type { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import type { StudentFormInput } from "@/lib/schemas";
import { Field, Input, PhoneInput, Select } from "./ui";

/** The fields for one team member. Used by the teacher portal and the student flow. */
export default function StudentFields({
  reg,
  errors,
  allowedClasses,
  showGender = true,
  parentHint,
}: {
  reg: (field: keyof StudentFormInput) => UseFormRegisterReturn;
  errors?: FieldErrors<StudentFormInput>;
  allowedClasses: number[];
  showGender?: boolean;
  parentHint?: string;
}) {
  const classHint = `Limited to your section (${allowedClasses.join(", ")})`;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
      <Field label="Full name" required error={errors?.fullName?.message} className="sm:col-span-2" hint="As it should appear on the certificate">
        <Input {...reg("fullName")} autoComplete="off" invalid={!!errors?.fullName} />
      </Field>
      <Field label="Class" required error={errors?.classLevel?.message} hint={classHint}>
        <Select {...reg("classLevel")} invalid={!!errors?.classLevel}>
          <option value="">Select</option>
          {allowedClasses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Division" required error={errors?.division?.message}>
        <Input {...reg("division")} maxLength={3} autoComplete="off" placeholder="e.g. A" className="uppercase" invalid={!!errors?.division} />
      </Field>
      <Field label="Age" required error={errors?.age?.message}>
        <Input type="number" inputMode="numeric" min={10} max={20} {...reg("age")} invalid={!!errors?.age} />
      </Field>
      {showGender && (
        <Field label="Gender (optional)" error={errors?.gender?.message}>
          <Select {...reg("gender")}>
            <option value="">Select</option>
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="UNDISCLOSED">Prefer not to say</option>
          </Select>
        </Field>
      )}
      <Field label="Parent / Guardian name" required error={errors?.parentName?.message}>
        <Input {...reg("parentName")} invalid={!!errors?.parentName} />
      </Field>
      <Field label="Student / Parent mobile" required error={errors?.parentMobile?.message} hint={parentHint}>
        <PhoneInput {...reg("parentMobile")} invalid={!!errors?.parentMobile} />
      </Field>
    </div>
  );
}
