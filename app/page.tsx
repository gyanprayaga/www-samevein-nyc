import { getContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();
  return (
    <section>
      <div className="hero__frame">
        <p className="hero__note">{content.homeNote}</p>
      </div>
    </section>
  );
}
