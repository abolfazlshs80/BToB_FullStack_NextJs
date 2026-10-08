"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CompanyPaymentDto } from "@/app/DTOs/payments/payment.dto";
import { EditPaymentForm } from "./payment-update-company-form";
import { CompanyOrderDto } from "@/app/DTOs/orders/order.dto";

type EditPaymentModalProps = {
  payment: CompanyPaymentDto;
  companyId: number;
  orders: CompanyOrderDto[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditPaymentModal({
  payment,
  companyId,
  orders,
  open,
  onOpenChange,
}: EditPaymentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ویرایش پرداخت</DialogTitle>
        </DialogHeader>

        <EditPaymentForm
          payment={payment}
          companyId={companyId}
          orders={orders}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
