import type { RoleName } from "@/lib/roles";

export type CreateUserDto = {
  username: string;
  password: string;
  role: RoleName;
};