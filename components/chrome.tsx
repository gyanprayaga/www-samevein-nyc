"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DOCK = [
  { href: "/touch", label: "BE IN TOUCH" },
  { href: "/merch", label: "MERCH" },
  { href: "/shows", label: "SHOWS" },
] as const;

type ChromeProps = {
  ticker: string[];
  children: ReactNode;
};

export function Chrome({ ticker, children }: ChromeProps) {
  const pathname = usePathname() || "/";
  const items = ticker.length ? ticker : ["Same Vein"];
  const loop = [...items, ...items];
  const merch = pathname === "/merch";

  return (
    <div className={merch ? "shell shell--merch" : "shell"}>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <header className="header">
        <Link className="wordmark" href="/">
          same vein
        </Link>
        <div className="ticker" aria-hidden={false}>
          <div className="ticker__track">
            {loop.map((line, index) => (
              <div className="ticker__item" key={`${line}-${index}`}>
                <span>{line}</span>
                {/* width/height come from the SVG file; wrapper does not override the asset. */}
                <img src="/ticker-arrow.svg" alt="" />
              </div>
            ))}
          </div>
        </div>
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
