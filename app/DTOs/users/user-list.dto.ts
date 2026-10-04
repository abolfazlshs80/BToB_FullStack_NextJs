import type { RoleName } from "@/lib/roles";

export type UserListDto = {
  id: number;
  username: string;
  roles: RoleName[];
  createdAt: Date;
};
