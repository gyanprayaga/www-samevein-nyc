import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";
import { getContent } from "@/lib/content";

export const metadata = { title: "Be in touch" };

export default async function TouchPage() {
  const content = await getContent();
  const youtube = content.youtube.trim();
  const spotify = content.spotify.trim();
  const hasListen = Boolean(youtube || spotify);

  return (
    <section>
      <h1 className="page-kicker">BE IN TOUCH</h1>
      <NewsletterForm />
      {hasListen ? (
        <div className="links" style={{ marginTop: 40 }}>
          {youtube ? (
            <a href={youtube} rel="noreferrer" target="_blank">
              YouTube
            </a>
          ) : null}
          {spotify ? (
            <a href={spotify} rel="noreferrer" target="_blank">
              Spotify
            </a>
          ) : null}
        </div>
      ) : (
        <p className="empty" style={{ marginTop: 40 }}>
          Sound lives on{" "}
          <Link href="/find-us">Find us</Link>
          {content.soundcloud.trim()
            ? " — SoundCloud is up. YouTube and Spotify TBA."
            : "."}
        </p>
      )}
    </section>
  );
}
