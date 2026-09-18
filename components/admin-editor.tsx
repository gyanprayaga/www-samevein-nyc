"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { MerchItem, Show, SiteContent } from "@/lib/types";

function emptyShow(): Show {
  return {
    id: `show-${Date.now()}`,
    title: "",
    date: "",
    time: "",
    venue: "",
    address: "",
    neighborhood: "",
    with: [],
    ticketsUrl: "",
    poster: "",
    age: "",
    price: "",
    note: "",
  };
}

function emptyMerch(): MerchItem {
  return {
    id: `merch-${Date.now()}`,
    name: "",
    price: "TBA",
    image: "",
  };
}

export function AdminEditor({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function save() {
    setPending(true);
    setError("");
    setStatus("");
    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const body = await response.json().catch(() => ({}));
    setPending(false);
    if (!response.ok) {
      setError(body.error || "Could not save.");
      return;
    }
    setStatus("Saved. Public pages will pick this up on the next load.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <section className="admin">
      <h1 className="page-kicker">Admin</h1>
      <p className="empty">
        Site JSON only. This is not a mail composer — campaigns stay in
        Buttondown.
      </p>
      <div className="row">
        <button type="button" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </div>
      {status ? <p role="status">{status}</p> : null}
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}

      <label>
        Booking email
        <input
          value={content.bookingEmail}
          onChange={(e) =>
            setContent({ ...content, bookingEmail: e.target.value })
          }
        />
      </label>
      <label>
        Home note
        <textarea
          value={content.homeNote}
          onChange={(e) => setContent({ ...content, homeNote: e.target.value })}
        />
      </label>
      <label>
        Instagram
        <input
          value={content.instagram}
          onChange={(e) =>
            setContent({ ...content, instagram: e.target.value })
          }
        />
      </label>
      <label>
        SoundCloud
        <input
          value={content.soundcloud}
          onChange={(e) =>
            setContent({ ...content, soundcloud: e.target.value })
          }
        />
      </label>
      <label>
        YouTube
        <input
          value={content.youtube}
          onChange={(e) => setContent({ ...content, youtube: e.target.value })}
        />
      </label>
      <label>
        Spotify
        <input
          value={content.spotify}
          onChange={(e) => setContent({ ...content, spotify: e.target.value })}
        />
      </label>

      <label>
        Idle TV note
        <textarea
          value={content.tvNote}
          onChange={(e) => setContent({ ...content, tvNote: e.target.value })}
        />
      </label>
      <label>
        Idle TV video URL
        <input
          value={content.tvVideo}
          onChange={(e) => setContent({ ...content, tvVideo: e.target.value })}
        />
      </label>
      <h2 className="page-kicker">Merch</h2>
      {content.merch.map((item, i) => (
        <div className="admin-block" key={item.id}>
          <label>
            Name
            <input
              value={item.name}
              onChange={(e) => {
                const merch = [...content.merch];
                merch[i] = { ...item, name: e.target.value };
                setContent({ ...content, merch });
              }}
            />
          </label>
          <label>
            Price
            <input
              value={item.price}
              onChange={(e) => {
                const merch = [...content.merch];
                merch[i] = { ...item, price: e.target.value };
                setContent({ ...content, merch });
              }}
            />
          </label>
          <label>
            Image URL
            <input
              value={item.image}
              onChange={(e) => {
                const merch = [...content.merch];
                merch[i] = { ...item, image: e.target.value };
                setContent({ ...content, merch });
              }}
            />
          </label>
          <button
            type="button"
            onClick={() =>
              setContent({
                ...content,
                merch: content.merch.filter((_, j) => j !== i),
              })
            }
          >
            Remove piece
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setContent({ ...content, merch: [...content.merch, emptyMerch()] })
        }
      >
        Add merch
      </button>

      <h2 className="page-kicker">Shows</h2>
      {content.shows.map((show, i) => (
        <div className="admin-block" key={show.id}>
          {(
            [
              ["title", "Title"],
              ["date", "Date (YYYY-MM-DD)"],
              ["time", "Time"],
              ["venue", "Venue"],
              ["address", "Address"],
              ["neighborhood", "Neighborhood"],
              ["ticketsUrl", "Tickets URL"],
              ["poster", "Poster URL"],
              ["age", "Age"],
              ["price", "Price"],
              ["note", "Note"],
            ] as const
          ).map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                value={show[key]}
                onChange={(e) => {
                  const shows = [...content.shows];
                  shows[i] = { ...show, [key]: e.target.value };
                  setContent({ ...content, shows });
                }}
              />
            </label>
          ))}
          <label>
            With (comma separated)
            <input
              value={show.with.join(", ")}
              onChange={(e) => {
                const shows = [...content.shows];
                shows[i] = {
                  ...show,
                  with: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                };
                setContent({ ...content, shows });
              }}
            />
          </label>
          <button
            type="button"
            onClick={() =>
              setContent({
                ...content,
                shows: content.shows.filter((_, j) => j !== i),
              })
            }
          >
            Remove show
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setContent({ ...content, shows: [...content.shows, emptyShow()] })
        }
      >
        Add show
      </button>
    </section>
  );
}
