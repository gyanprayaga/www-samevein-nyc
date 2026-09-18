import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "sv_admin";
const SESSION_PAYLOAD = "sv-admin-session";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "samevein";
}

export function sessionDigest(password = adminPassword()): string {
  return createHmac("sha256", password).update(SESSION_PAYLOAD).digest("hex");
}

export function cookieMatches(value: string | undefined): boolean {
  if (!value) return false;
  const expected = sessionDigest();
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return cookieMatches(jar.get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}
