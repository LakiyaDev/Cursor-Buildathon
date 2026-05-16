/** Maps incidents.json `order` → timeline slug and /seed image path. */
export const ORDER_TO_SLUG: Record<number, string> = {
  1: "anuradhapura",
  2: "anuradhapura",
  3: "anuradhapura",
  4: "polonnaruwa",
  5: "polonnaruwa",
  6: "mahanuwara",
  7: "mahanuwara",
  8: "wwi",
  9: "wwi",
  10: "wwi",
  11: "wwi",
};

export const ORDER_TO_IMAGE: Record<number, string> = {
  1: "/seed/arahat-mahinda.jpg",
  2: "/seed/battle-vijithapura.jpg",
  3: "/seed/chola-invasion.jpg",
  4: "/seed/parakramabahu.jpg",
  5: "/seed/kalinga-magha.jpg",
  6: "/seed/battle-danture.jpg",
  7: "/seed/kandyan-convention.jpg",
  8: "/seed/franz-ferdinand.jpg",
  9: "/seed/lusitania.jpg",
  10: "/seed/zimmermann-telegram.jpg",
  11: "/seed/treaty-versailles.jpg",
};

export function slugForOrder(order: number): string {
  const slug = ORDER_TO_SLUG[order];
  if (!slug) {
    throw new Error(`No timeline slug for incident order ${order}`);
  }
  return slug;
}

export function imageForOrder(order: number): string {
  const url = ORDER_TO_IMAGE[order];
  if (!url) {
    throw new Error(`No image path for incident order ${order}`);
  }
  return url;
}
