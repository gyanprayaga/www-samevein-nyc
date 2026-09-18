import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminPassword,
  sessionCookieOptions,
  sessionDigest,
} from "@/lib/admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if ((body.password || "") !== adminPassword()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, sessionDigest(), sessionCookieOptions());
  return response;
}
