import type { RoleName } from "@/lib/roles";

export type UpdateUserDto = {
  id: number;
  username: string;
  password?: string;
  role: RoleName;
};
