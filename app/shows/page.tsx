import Link from "next/link";
import { formatShowDate, showUtcMs, todayUtcMs } from "@/lib/dates";
import { getContent } from "@/lib/content";
import type { Show } from "@/lib/types";

export const metadata = { title: "Shows" };

function ShowCard({ show }: { show: Show }) {
  return (
    <article className="show">
      <div className="show__poster">
        {show.poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={show.poster} alt="" />
        ) : (
          "poster"
        )}
      </div>
      <div className="show__meta">
        <h2>{show.title}</h2>
        <p>
          {formatShowDate(show.date)}
          {show.time ? ` · ${show.time}` : ""}
        </p>
        {show.ticketsUrl ? (
          <p>
            <a href={show.ticketsUrl} rel="noreferrer" target="_blank">
              Tickets
            </a>
          </p>
        ) : (
          <p>Tickets TBA</p>
        )}
        <p>
          {show.venue}
          {show.neighborhood ? ` · ${show.neighborhood}` : ""}
        </p>
        <p>{show.address}</p>
        {show.with.length ? <p>With {show.with.join(", ")}</p> : null}
        {show.age ? <p>{show.age}</p> : null}
        {show.price ? <p>{show.price}</p> : null}
        {show.note ? <p>{show.note}</p> : null}
      </div>
    </article>
  );
}

export default async function ShowsPage() {
  const content = await getContent();
  const today = todayUtcMs();
  const upcoming = content.shows
    .filter((show) => showUtcMs(show.date) >= today)
    .sort((a, b) => showUtcMs(a.date) - showUtcMs(b.date));
  const past = content.shows
    .filter((show) => showUtcMs(show.date) < today)
    .sort((a, b) => showUtcMs(b.date) - showUtcMs(a.date));

  if (!content.shows.length) {
    return (
      <section>
        <h1 className="page-kicker">SHOWS</h1>
        <p className="empty">
          Nothing on the books. We’ll list dates here and on the{" "}
          <Link href="/newsletter">newsletter</Link>.
        </p>
      </section>
    );
  }

  return (
    <section className="shows">
      <h1 className="page-kicker">SHOWS</h1>
      <div>
        <h2 className="page-kicker">Upcoming</h2>
        {upcoming.length ? (
          upcoming.map((show) => <ShowCard key={show.id} show={show} />)
        ) : (
          <p className="empty">
            No upcoming dates. Watch the newsletter for the next one.
          </p>
        )}
      </div>
      <div>
        <h2 className="page-kicker">Past</h2>
        {past.length ? (
          past.map((show) => <ShowCard key={show.id} show={show} />)
        ) : (
          <p className="empty">No past dates on this list yet.</p>
        )}
      </div>
    </section>
  );
}
