"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DOCK = [
  { href: "/touch", label: "BE IN TOUCH" },
  { href: "/merch", label: "MERCH" },
  { href: "/shows", label: "SHOWS" },
] as const;

export function Chrome({
  instagram,
  children,
}: {
  instagram: string;
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
    </div>
  );
}
