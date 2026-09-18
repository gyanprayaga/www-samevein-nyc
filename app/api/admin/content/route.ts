import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieMatches, ADMIN_COOKIE } from "@/lib/admin";
import { getContent, isSiteContentShape, saveContent } from "@/lib/content";

async function requireSession() {
  const jar = await cookies();
  return cookieMatches(jar.get(ADMIN_COOKIE)?.value);
}

export async function GET() {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!isSiteContentShape(body)) {
    return NextResponse.json(
      { error: "merch and shows must be arrays, with string fields." },
      { status: 400 },
    );
  }
  const saved = await saveContent(body);
  return NextResponse.json(saved);
}
