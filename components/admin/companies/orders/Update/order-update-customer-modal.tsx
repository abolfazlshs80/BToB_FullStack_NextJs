"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateOrderDto } from "@/app/DTOs/orders/order.dto";
import { EditOrderForm } from "./order-update-Customer";

type EditOrderModalProps = {
  companyId: number;
  orderId: number;
  order: UpdateOrderDto;
};

export function EditOrderModal({
  companyId,
  orderId,
  order,
}: EditOrderModalProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="ml-2 size-4" />
          ویرایش فاکتور
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش فاکتور</DialogTitle>
        </DialogHeader>

        <EditOrderForm companyId={companyId} order={order} orderId={orderId} />
      </DialogContent>
    </Dialog>
  );
}
