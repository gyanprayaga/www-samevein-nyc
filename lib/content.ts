import { get, put } from "@vercel/blob";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { SiteContent } from "@/lib/types";

const BLOB_PATH = "same-vein/content.json";
const LOCAL_PATH = path.join(process.cwd(), "data", "content.json");

function token(): string | undefined {
  return process.env.BLOB_READ_WRITE_TOKEN;
}

async function readLocal(): Promise<SiteContent> {
  const raw = await readFile(LOCAL_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

async function writeLocal(content: SiteContent): Promise<void> {
  try {
    await writeFile(LOCAL_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "EROFS") return;
    throw error;
  }
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

export async function getContent(): Promise<SiteContent> {
  const blobToken = token();
  if (!blobToken) {
    return readLocal();
  }

  const existing = await get(BLOB_PATH, {
    access: "private",
    token: blobToken,
    useCache: false,
  });

  if (existing?.statusCode === 200 && existing.stream) {
    const text = await streamToText(existing.stream);
    return JSON.parse(text) as SiteContent;
  }

  const seed = await readLocal();
  await put(BLOB_PATH, JSON.stringify(seed, null, 2), {
    access: "private",
    token: blobToken,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  return seed;
}

export async function saveContent(content: SiteContent): Promise<SiteContent> {
  const blobToken = token();
  if (blobToken) {
    await put(BLOB_PATH, JSON.stringify(content, null, 2), {
      access: "private",
      token: blobToken,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    await writeLocal(content);
    return content;
  }
  await writeLocal(content);
  return content;
}

export function isSiteContentShape(value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;
  const body = value as Record<string, unknown>;
  return (
    Array.isArray(body.merch) &&
    Array.isArray(body.shows) &&
    typeof body.bookingEmail === "string" &&
    typeof body.homeNote === "string" &&
    typeof body.instagram === "string" &&
    typeof body.youtube === "string" &&
    typeof body.spotify === "string" &&
    typeof body.soundcloud === "string" &&
    typeof body.tvVideo === "string" &&
    typeof body.tvNote === "string"
  );
}
