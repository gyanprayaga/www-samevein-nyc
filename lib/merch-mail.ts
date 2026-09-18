export function merchMailto(email: string, name: string, price: string): string {
  const subject = `Same Vein merch — ${name}`;
  const body = [
    "Hi Same Vein,",
    "",
    `I’m interested in the ${name}${price ? ` (${price})` : ""}.`,
    "",
    "Name:",
    "How to reach me:",
    "",
  ].join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
