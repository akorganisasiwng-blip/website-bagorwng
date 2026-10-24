import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url"; // <-- Diubah

export const client = createClient({
  projectId: "vy6j0k21",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = createImageUrlBuilder(client); // <-- Diubah

export function urlFor(source: any) {
  return builder.image(source);
}
