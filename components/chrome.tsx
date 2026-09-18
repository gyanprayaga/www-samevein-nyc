"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IdleTv } from "@/components/idle-tv";

const DOCK = [
  { href: "/newsletter", label: "NEWSLETTER" },
  { href: "/merch", label: "MERCH" },
  { href: "/shows", label: "SHOWS" },
  { href: "/find-us", label: "LISTEN" },
] as const;

export function Chrome({
  instagram,
  tvVideo,
  tvNote,
  children,
}: {
  instagram: string;
  tvVideo: string;
  tvNote: string;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const merch = pathname === "/merch";
  const ig = instagram.trim();

  return (
    <div className={merch ? "shell shell--merch" : "shell"}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="header">
        <Link className="wordmark" href="/">
          same vein
        </Link>
        {ig ? (
          <a
            className="header-ig"
            href={ig}
            rel="noreferrer"
            target="_blank"
          >
            instagram
          </a>
        ) : null}
      </header>
      <main id="content" className="main">
        {children}
      </main>
      <nav className="dock" aria-label="Primary">
        {DOCK.map((item) => {
          const current = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="dock__link"
              aria-current={current ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <IdleTv video={tvVideo} note={tvNote} />
    </div>
  );
}
