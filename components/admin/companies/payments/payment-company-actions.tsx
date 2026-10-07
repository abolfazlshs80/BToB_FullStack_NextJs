"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompanyPaymentDto } from "@/app/DTOs/payments/payment.dto";

import { ota } from "zod/locales";
import { DeletePaymentButton } from "./delete-payment-company-button";

type PaymentActionsProps = {
  companyId: number;
  paymentId: number;

  payment: CompanyPaymentDto;
};

export function PaymentActions({
  companyId,
  paymentId,
  payment,
}: PaymentActionsProps) {
  return (
    <>
      {/* <EditPaymentModal
        companyId={companyId}
        paymentId={paymentId}
        payment={{
          id: payment.id,
          status: payment.status ?? "pendding",
          name: payment.name ?? "نام تستی",
        }}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted">
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {/* Edit */}
          <DropdownMenuItem></DropdownMenuItem>

          <DropdownMenuItem>
            <DeletePaymentButton companyId={companyId} paymentId={payment.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
