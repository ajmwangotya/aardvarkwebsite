/**
 * Guest-book entries — handwritten comments from travellers.
 * Add scanImage (e.g. "/guest-notes/july-2024.jpg") when you have photos of the paper pages.
 */
export type GuestNote = {
  id: string;
  quote: string;
  attribution: string;
  trip?: string;
  location?: string;
  date?: string;
  /** Path under /public for a scan of the original handwritten page */
  scanImage?: string;
  rotation?: number;
};

export const GUEST_NOTES: GuestNote[] = [
  {
    id: "note-1",
    quote:
      "Emmanuel — you made every sunrise feel like our first. The leopard at dawn, the picnic under the acacia… we will be back.",
    attribution: "Sarah & James",
    trip: "Northern Migration",
    location: "London",
    date: "Oct 2024",
    rotation: -2.5,
  },
  {
    id: "note-2",
    quote:
      "Best honeymoon we could have imagined. Seamless from Arusha to Zanzibar. Thank you for the care.",
    attribution: "David & Anna",
    trip: "Serengeti & Zanzibar",
    location: "California, USA",
    date: "Sep 2024",
    rotation: 1.8,
  },
  {
    id: "note-3",
    quote:
      "Uhuru at sunrise — worth every step. Your team on the mountain were family.",
    attribution: "Marcus W.",
    trip: "Kilimanjaro — Northern Circuit",
    location: "Berlin",
    date: "Aug 2024",
    rotation: -1.2,
  },
  {
    id: "note-4",
    quote:
      "Our children still draw elephants every day. You turned a holiday into a story they will tell forever.",
    attribution: "The Raman family",
    trip: "Family Safari",
    location: "Toronto",
    date: "Jul 2024",
    rotation: 2.2,
  },
  {
    id: "note-5",
    quote:
      "Local, genuine, unforgettable. Ngorongoro at first light — speechless. Already planning our return.",
    attribution: "James O.",
    trip: "Classic Northern Circuit",
    location: "Dublin",
    date: "Jun 2024",
    rotation: -1.8,
  },
];
