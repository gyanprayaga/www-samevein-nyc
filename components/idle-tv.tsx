"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const IDLE_MS = 15_000;

type IdleTvProps = {
  video: string;
  note: string;
};

export function IdleTv({ video, note }: IdleTvProps) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const src = video.trim();

  const clear = useCallback(() => {
    if (timer.current != null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const arm = useCallback(() => {
    if (pathname.startsWith("/admin")) return;
    clear();
    timer.current = window.setTimeout(() => setOpen(true), IDLE_MS);
  }, [clear, pathname]);

  useEffect(() => {
    if (open || pathname.startsWith("/admin")) {
      clear();
      return;
    }
    arm();
    const onActivity = () => arm();
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("pointermove", onActivity);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("scroll", onActivity, true);
    window.addEventListener("wheel", onActivity, { passive: true });
    return () => {
      clear();
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("scroll", onActivity, true);
      window.removeEventListener("wheel", onActivity);
    };
  }, [arm, clear, open, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || pathname.startsWith("/admin")) return null;

  const youtube = /youtu(\.be|be\.com)/i.test(src);

  return (
    <div
      className="tv-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Music video"
      onClick={() => setOpen(false)}
    >
      <div
        className="tv"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="tv__antennas" aria-hidden="true">
          <span className="tv__rod tv__rod--left" />
          <span className="tv__rod tv__rod--right" />
        </div>
        <div className="tv__body">
          <div className="tv__bezel">
            <div className="tv__screen">
              {src && youtube ? (
                <iframe
                  className="tv__frame"
                  src={src}
                  title="Same Vein music video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : src ? (
                <video className="tv__frame" src={src} autoPlay controls playsInline />
              ) : (
                <p className="tv__placeholder">{note}</p>
              )}
            </div>
          </div>
          <div className="tv__knobs" aria-hidden="true">
            <span />
            <span />
          </div>
        </div>
        <div className="tv__stand" aria-hidden="true" />
        <button className="tv__close" type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}
