import { getContent } from "@/lib/content";

export const metadata = { title: "Listen" };

export default async function FindUsPage() {
  const content = await getContent();
  const instagram = content.instagram.trim();
  const soundcloud = content.soundcloud.trim();
  const youtube = content.youtube.trim();
  const spotify = content.spotify.trim();

  return (
    <section>
      <h1 className="page-kicker">LISTEN</h1>
      <div className="links">
        {instagram ? (
          <a href={instagram} rel="noreferrer" target="_blank">
            Instagram
          </a>
        ) : (
          <p className="tba">Instagram TBA</p>
        )}
        {youtube ? (
          <a href={youtube} rel="noreferrer" target="_blank">
            YouTube
          </a>
        ) : (
          <p className="tba">YouTube TBA</p>
        )}
        {spotify ? (
          <a href={spotify} rel="noreferrer" target="_blank">
            Spotify
          </a>
        ) : (
          <p className="tba">Spotify TBA</p>
        )}
        {soundcloud ? (
          <a href={soundcloud} rel="noreferrer" target="_blank">
            SoundCloud
          </a>
        ) : (
          <p className="tba">SoundCloud TBA</p>
        )}
      </div>
    </section>
  );
}
