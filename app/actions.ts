"use server";

import { subscribe } from "@/lib/subscribe";
import type { SubscribeState } from "@/lib/subscribe-ui";

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  return subscribe({
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
  });
}
