"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditCustomerModal } from "./Update/company-Edit-customer-modal";
import { DeleteCustomerButton } from "./delete-company-customer-button";

import type { CompanyCustomerDto } from "@/app/DTOs/customers/customer.dto";

type CustomerActionsProps = {
  companyId: number;
  customer: CompanyCustomerDto;
};

export function CustomerActions({ companyId, customer }: CustomerActionsProps) {
  return (
    <>
      <EditCustomerModal
        companyId={companyId}
        customerId={customer.id}
        customer={{
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
        }}
      />
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
            <DeleteCustomerButton
              companyId={companyId}
              customerId={customer.id}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
