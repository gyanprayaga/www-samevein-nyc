# www-samevein-nyc

Public site for Same Vein — Brooklyn five-piece. Hosted on **Vercel**. Registrar and DNS stay on Vercel too.

Wordmark, gray home placeholder, and a four-item dock (Newsletter / Merch / Shows / Listen) follow the Figma public chrome. The home “eyes” video is still a gray box on purpose; the note lives in `data/content.json`.

## Local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Dev server binds `0.0.0.0:4317`.

Local admin password fallback: **`samevein`** (override with `ADMIN_PASSWORD`).

## Vercel env

Set these in the Vercel project:

| Variable | Purpose |
| --- | --- |
| `BUTTONDOWN_API_KEY` | Newsletter signup via Buttondown |
| `ADMIN_PASSWORD` | Shared password for `/admin` |
| `BLOB_READ_WRITE_TOKEN` | Optional. Private Blob object `same-vein/content.json` |

No Postgres. No Clerk. No OAuth. No user table.

## Newsletter (Buttondown)

`/touch` uses a custom form (no embed). Join posts to a server action and to `POST /api/newsletter` (also re-exported at `/api/subscribe`).

- Double opt-in: subscribers are created as `unactivated`. They are not on the list until they confirm the email.
- Honeypot field `company` is in the DOM, visually off-screen. A filled honeypot returns success copy and never calls Buttondown.
- Without `BUTTONDOWN_API_KEY`, signup still returns success plus `mock: true` and a “Local mock — no Buttondown key” note.

On the sending domain (the Vercel hostname you use for mail):

- SPF, DKIM, and DMARC must be set so confirmation mail lands.
- Set a human reply-to in Buttondown (a person, not a no-reply).

Do not compose campaigns in `/admin`. That page is a JSON editor only.

## Content: Blob vs local JSON

- If `BLOB_READ_WRITE_TOKEN` is set, reads/writes go to a **private** Vercel Blob object at `same-vein/content.json` (no random suffix, overwrite allowed). First miss seeds Blob from the committed file.
- Otherwise the site uses `data/content.json`.
- Blob writes also try the local file and ignore `EROFS` on Vercel.

## Merch

Not a store. Grid of pieces; click opens `mailto:` to `bookingEmail` with a subject and a short body. No cart, payments, or embeds.

`/merch` uses `public/merch-pigeons.jpg` (Figma pigeon still) plus a light white wash so type stays readable. Dock is ~94% `#d9d9d9`.

## Admin

`/admin` is password-gated (`/admin/login`). Session cookie `sv_admin` is HMAC-SHA256 of `sv-admin-session` using the password as the key. httpOnly, SameSite lax, 14 days, secure in production. Checked in the page and API routes — not Edge middleware.
