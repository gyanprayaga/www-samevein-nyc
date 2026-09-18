import {
  newsletterAlreadyCopy,
  newsletterIdle,
  newsletterSuccessCopy,
  type SubscribeState,
} from "@/lib/subscribe-ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(input: {
  email: string;
  company: string;
}): Promise<SubscribeState> {
  const company = input.company.trim();
  const email = input.email.trim();

  if (company) {
    return {
      status: "success",
      message: newsletterSuccessCopy,
      mock: false,
    };
  }

  if (!email) {
    return {
      status: "error",
      message: "Need an email to join the list.",
      mock: false,
    };
  }

  if (!EMAIL_RE.test(email)) {
    return {
      status: "error",
      message: "That doesn’t look like an email.",
      mock: false,
    };
  }

  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    return {
      status: "success",
      message: newsletterSuccessCopy,
      mock: true,
    };
  }

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      tags: ["website"],
      type: "unactivated",
    }),
  });

  if (response.ok) {
    return {
      status: "success",
      message: newsletterSuccessCopy,
      mock: false,
    };
  }

  const text = await response.text();
  const already =
    response.status === 409 ||
    /already/i.test(text) ||
    /exists/i.test(text);

  if (already) {
    return {
      status: "already",
      message: newsletterAlreadyCopy,
      mock: false,
    };
  }

  return {
    status: "error",
    message: "The list didn’t take that just now. Try again in a minute.",
    mock: false,
  };
}

export { newsletterIdle };
