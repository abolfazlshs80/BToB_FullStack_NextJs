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
import { EditCustomerForm } from "./company-Edit-Customer";
import { UpdateCustomerDto } from "@/app/DTOs/customers/customer.dto";

type EditCustomerModalProps = {
  companyId: number;
  customerId: number;
  customer: UpdateCustomerDto;
};

export function EditCustomerModal({
  companyId,
  customerId,
  customer,
}: EditCustomerModalProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus className="ml-2 size-4" />
          ویرایش مشتری
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش مشتری</DialogTitle>
        </DialogHeader>

        <EditCustomerForm
          companyId={companyId}
          customerId={customerId}
          customer={customer}
        />
      </DialogContent>
    </Dialog>
  );
}
