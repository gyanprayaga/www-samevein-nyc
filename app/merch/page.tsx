import { getContent } from "@/lib/content";
import { merchMailto } from "@/lib/merch-mail";

export const metadata = { title: "Merch" };

export default async function MerchPage() {
  const content = await getContent();
  const items = content.merch;

  if (!items.length) {
    return (
      <section>
        <h1 className="page-kicker">MERCH</h1>
        <p className="empty">
          Nothing in the bin yet. Pieces are listed here — write us, no cart.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-kicker">MERCH</h1>
      <div className="merch-grid">
        {items.map((item) => (
          <a
            className="merch-card"
            key={item.id}
            href={merchMailto(content.bookingEmail, item.name, item.price)}
          >
            <div className="merch-card__frame">
              {item.image ? (
                // Dynamic merch art from content JSON.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" />
              ) : null}
            </div>
            <p className="merch-card__name">{item.name}</p>
            <p className="merch-card__price">{item.price || "TBA"}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
