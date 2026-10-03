export const ROLES = {
  ADMIN: "Admin",
} as const;

export type RoleName = (typeof ROLES)[keyof typeof ROLES];

export function isRoleName(value: string): value is RoleName {
  return Object.values(ROLES).includes(value as RoleName);
}
