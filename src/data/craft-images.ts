/**
 * Craft imagery — order matches `experiences.crafts` in en.json:
 * Tanzanite, Pottery, Weaving, Maasai Beadwork
 *
 * Wikimedia Commons (CC BY-SA): tanzanite, pottery (Bagamoyo); weaving is client-provided
 */
import destArushaPark from "@/assets/destinations/dest-arusha-park.jpg";
import craftWeaving from "@/assets/editorial/craft-weaving.png";
import maasai from "@/assets/editorial/maasai.jpg";

/** ~960px Wikimedia thumbs for card display */
const WIKI = {
  tanzanite:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Tanzanite.jpg/960px-Tanzanite.jpg",
  pottery:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Pottery_at_Kaole_Ruins%2C_Bagamoyo%2C_Pwani.jpg/960px-Pottery_at_Kaole_Ruins%2C_Bagamoyo%2C_Pwani.jpg",
} as const;

export const craftHeroImage = maasai;

export const craftImages = [
  WIKI.tanzanite,
  WIKI.pottery,
  craftWeaving,
  destArushaPark,
] as const;
