export type SubscribeState = {
  status: "idle" | "success" | "already" | "error";
  message: string;
  mock: boolean;
};

export const newsletterIdle: SubscribeState = {
  status: "idle",
  message:
    "Shows, merch, and notes from the band. We don’t sell the list. Privacy: email only, for this newsletter.",
  mock: false,
};

export const newsletterSuccessCopy =
  "Check your email to confirm. You’re not on the list until you tap that link.";

export const newsletterAlreadyCopy =
  "You’re already on the list. We’ll see you at the next one.";

export const newsletterMockNote = "Local mock — no Buttondown key";
