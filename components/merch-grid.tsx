"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { merchMailto } from "@/lib/merch-mail";
import type { MerchItem } from "@/lib/types";

export function MerchGrid({
  items,
  bookingEmail,
}: {
  items: MerchItem[];
  bookingEmail: string;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const selected = items.find((item) => item.id === openId) ?? null;

  return (
    <>
      <div className="merch-grid">
        {items.map((item) => (
          <button
            type="button"
            className="merch-card"
            key={item.id}
            onClick={() => setOpenId(item.id)}
          >
            <div className="merch-card__frame">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" />
              ) : null}
            </div>
            <p className="merch-card__name">{item.name}</p>
            <p className="merch-card__price">{item.price || "TBA"}</p>
          </button>
        ))}
      </div>
      <Dialog.Root
        open={Boolean(selected)}
        onOpenChange={(next) => {
          if (!next) setOpenId(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="merch-dialog__overlay" />
          {selected ? (
            <Dialog.Content className="merch-dialog" aria-describedby={undefined}>
              <Dialog.Title className="merch-dialog__title">
                {selected.name}
              </Dialog.Title>
              <div className="merch-dialog__frame">
                {selected.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={selected.image} alt="" />
                ) : null}
              </div>
              <p className="merch-dialog__price">{selected.price || "TBA"}</p>
              <p className="merch-dialog__copy">
                No cart. Write us if you want this piece.
              </p>
              <a
                className="merch-dialog__buy"
                href={merchMailto(
                  bookingEmail,
                  selected.name,
                  selected.price,
                )}
              >
                Purchase
              </a>
              <Dialog.Close className="merch-dialog__close" type="button">
                Close
              </Dialog.Close>
            </Dialog.Content>
          ) : null}
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
