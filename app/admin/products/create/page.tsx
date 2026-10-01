"use client";

import { useActionState } from "react";
import { createCustomer } from "./actions";

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function CreateCustomerPage() {
  const [state, formAction, isPending] = useActionState(
    createCustomer,
    initialState
  );

  return (
    <div>
      <h1>ایجاد مشتری</h1>

      <form action={formAction}>
        {/* Company Name */}
        <div>
          <label>نام شرکت</label>

          <input
            name="companyName"
            placeholder="مثلاً شرکت ABC"
          />

          {state.errors?.companyName && (
            <p>
              {state.errors.companyName[0]}
            </p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label>نام تماس</label>

          <input
            name="contactName"
            placeholder="نام مسئول شرکت"
          />

          {state.errors?.contactName && (
            <p>
              {state.errors.contactName[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label>ایمیل</label>

          <input
            name="email"
            type="email"
            placeholder="example@gmail.com"
          />

          {state.errors?.email && (
            <p>
              {state.errors.email[0]}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label>شماره تلفن</label>

          <input
            name="phone"
            placeholder="0912..."
          />

          {state.errors?.phone && (
            <p>
              {state.errors.phone[0]}
            </p>
          )}
        </div>

        {/* Success / Error Message */}
        {state.message && (
          <p>
            {state.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
        >
          {isPending ? "در حال ثبت..." : "ثبت مشتری"}
        </button>
      </form>
    </div>
  );
}