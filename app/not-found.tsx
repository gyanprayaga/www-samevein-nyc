import Link from "next/link";

export const metadata = { title: "Missing" };

export default function NotFound() {
  return (
    <section>
      <h1 className="page-kicker">Missing</h1>
      <p className="empty">
        That page isn’t here.{" "}
        <Link href="/">Back home</Link>.
      </p>
    </section>
  );
}
