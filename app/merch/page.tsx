import { MerchGrid } from "@/components/merch-grid";
import { getContent } from "@/lib/content";

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
      <MerchGrid items={items} bookingEmail={content.bookingEmail} />
    </section>
  );
}
