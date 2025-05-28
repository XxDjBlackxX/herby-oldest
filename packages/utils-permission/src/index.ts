export const PERMISSIONS = {
  user: 1 << 12,
  broadcaster: 1 << 10,
  moderator: 1 << 14,
  supervisory: 1 << 16,
  financier: 1 << 18,
  admin: 1 << 11,
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
export type PermissionKey = keyof typeof PERMISSIONS;

export function combinePermissions(...perms: Permission[]): number {
  return perms.reduce((acc, perm) => acc | perm, 0);
}

export function hasPermission(
  combined: number | undefined,
  perms: Permission | Permission[],
): boolean {
  if (combined == undefined) return false;
  if (Array.isArray(perms)) {
    return perms.some((perm) => (combined & perm) === perm);
  }
  return (combined & perms) === perms;
}

export function getPermissions(combined: number): (keyof typeof PERMISSIONS)[] {
  return Object.entries(PERMISSIONS)
    .filter(([_, value]) => hasPermission(combined, value))
    .map(([key]) => key) as (keyof typeof PERMISSIONS)[];
}
