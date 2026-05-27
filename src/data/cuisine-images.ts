/**
 * Tanzanian cuisine imagery — order matches `experiences.cuisine` in en.json:
 * Ugali, Nyama Choma, Pilau, Chapati
 *
 * Wikimedia Commons (CC BY-SA) where noted; ugali & pilau use client-provided photos
 */
import cuisineUgali from "@/assets/editorial/cuisine-ugali.png";
import cuisinePilau from "@/assets/editorial/cuisine-pilau.png";

export type CuisineImageSlot = {
  src: string;
  objectPosition?: string;
};

export const cuisineImageSlots: readonly CuisineImageSlot[] = [
  {
    src: cuisineUgali,
    objectPosition: "center 45%",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Jay_nyama_Choma.jpg/1920px-Jay_nyama_Choma.jpg",
    objectPosition: "center 55%",
  },
  {
    src: cuisinePilau,
    objectPosition: "center 38%",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kibao_cha_chapati.jpg/1920px-Kibao_cha_chapati.jpg",
    objectPosition: "center 40%",
  },
] as const;

/** @deprecated Use {@link cuisineImageSlots} */
export const cuisineImages = cuisineImageSlots.map((s) => s.src) as readonly string[];
