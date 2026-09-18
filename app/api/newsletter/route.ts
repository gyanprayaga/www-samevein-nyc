import { NextResponse } from "next/server";
import { subscribe } from "@/lib/subscribe";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let company = "";

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    email = String(body.email ?? body.email_address ?? "");
    company = String(body.company ?? "");
  } else {
    const form = await request.formData();
    email = String(form.get("email") ?? form.get("email_address") ?? "");
    company = String(form.get("company") ?? "");
  }

  const result = await subscribe({ email, company });
  const status = result.status === "error" ? 400 : 200;
  return NextResponse.json(result, { status });
}
