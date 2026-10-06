"use client";

import { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  OrderActionState,
  updateOrderAction,
} from "@/actions/companies/orders/company.order.update.actions";

import { UpdateOrderDto } from "@/app/DTOs/orders/order.dto";

type OrderFormProps = {
  companyId: number;
  orderId: number;
  order: UpdateOrderDto;
};

export function EditOrderForm({ companyId, orderId, order }: OrderFormProps) {
  const initialState: OrderActionState = {
    success: false,

    values: {
      name: order.name,
      status: order.status,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateOrderAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="companyId" value={companyId} />

      <input type="hidden" name="orderId" value={orderId} />

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">نام</Label>

        <Input id="name" name="name" defaultValue={state.values?.name} />

        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">وضعیت سفارش</Label>

        <Select name="status" defaultValue={state.values?.status}>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب وضعیت" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="pending">در انتظار</SelectItem>

            <SelectItem value="complete">تکمیل شده</SelectItem>
          </SelectContent>
        </Select>

        {state.errors?.status && (
          <p className="text-sm text-destructive">{state.errors.status[0]}</p>
        )}
      </div>
      {state.message && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "در حال بروزرسانی..." : "بروزرسانی سفارش"}
      </Button>
    </form>
  );
}
