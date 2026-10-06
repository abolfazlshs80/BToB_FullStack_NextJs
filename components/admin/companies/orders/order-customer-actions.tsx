"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CompanyOrderDto } from "@/app/DTOs/orders/order.dto";
import { DeleteOrderButton } from "./delete-company-order-button";

type OrderActionsProps = {
  companyId: number;
  order: CompanyOrderDto;
};

export function OrderActions({ companyId, order }: OrderActionsProps) {
  return (
    <>
      {/* <EditOrderModal
        companyId={companyId}
        customerId={customer.id}
        customer={{
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
        }}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted">
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {/* Edit */}
          <DropdownMenuItem>
            {/* <Link
                              href={`/admin/companies/${companyId}/edit/${customer.id}`}
                              className="flex w-full items-center"
                            >
                              <Pencil className="ml-2 size-4" />
                              ویرایش
                            </Link> */}
          </DropdownMenuItem>

          {/* Toggle Status */}
          {/* <DropdownMenuItem>
                            <ToggleCompanyStatusButton
                              companyId={company.id}
                              status={company.status}
                            />
                          </DropdownMenuItem> */}

          {/* Delete */}
          <DropdownMenuItem>
            <DeleteOrderButton companyId={companyId} orderId={order.id} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
