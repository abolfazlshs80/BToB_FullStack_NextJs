"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CompanyPaymentDto } from "@/app/DTOs/payments/payment.dto";
import { CompanyOrderDto } from "@/app/DTOs/orders/order.dto";
import { EditPaymentModal } from "./Update/payment-update-company-modal";

import { deletePaymentAction } from "@/actions/companies/payments/company.payment.delete.actions";

type PaymentActionsProps = {
  payment: CompanyPaymentDto;
  companyId: number;
  orders: CompanyOrderDto[];
};

export function PaymentActions({
  payment,
  companyId,
  orders,
}: PaymentActionsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm("آیا از حذف این پرداخت مطمئن هستید؟");

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deletePaymentAction(payment.id, companyId);

      console.log("DELETE RESULT:", result);
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-8 items-center justify-center rounded-md hover:bg-muted">
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Pencil className="ml-2 size-4" />
            ویرایش
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="ml-2 size-4" />

            {isPending ? "در حال حذف..." : "حذف"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPaymentModal
        payment={payment}
        companyId={companyId}
        orders={orders}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
