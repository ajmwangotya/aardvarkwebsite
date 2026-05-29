export type SafariDay = { title: string; body: string };
export type Waypoint = { name: string; lat: number; lng: number };
export type Safari = {
  slug: string;
  title: string;
  duration: string;
  intro: string;
  route: string;
  days: SafariDay[];
  waypoints?: Waypoint[];
  /** Short chips for cards and hero panels */
  highlights?: string[];
  lodges?: string[];
  bestSeason?: string;
  included?: string[];
  excluded?: string[];
  region?: "Tanzania" | "Uganda" | "Rwanda" | "Zanzibar";
};

/** Standard inclusions across brochure itineraries (Terms §5.3). */
const STD_INCLUDED = [
  "4WD safari vehicle with pop-up roof and English-speaking driver-guide",
  "All accommodation and meals per itinerary",
  "National park and conservation area entrance fees",
  "Government taxes and intra-country airport taxes",
  "Mineral water on all game drives",
  "Flying Doctor Society emergency evacuation membership",
  "Pre-departure information on East Africa history, culture, and ecology",
] as const;

const STD_EXCLUDED = [
  "International flights and departure taxes",
  "Passport and visa fees",
  "Travel and medical insurance (strongly recommended)",
  "Excess baggage charges",
  "Personal items (drinks, laundry, calls, room service)",
  "Gratuities / tips for guides and lodge staff",
  "Optional activities priced separately (balloon flights, village visits, night drives where not included)",
  "Hospital costs (Flying Doctor covers transport only)",
] as const;

// Shared coordinates for common stops
const PT = {
  arusha: { name: "Arusha", lat: -3.3869, lng: 36.683 },
  kilimanjaro: { name: "Kilimanjaro (JRO)", lat: -3.4291, lng: 37.0745 },
  arushaNP: { name: "Arusha National Park", lat: -3.249, lng: 36.84 },
  tarangire: { name: "Tarangire", lat: -3.8333, lng: 36.0 },
  manyara: { name: "Lake Manyara", lat: -3.5833, lng: 35.8333 },
  ngorongoro: { name: "Ngorongoro Crater", lat: -3.1667, lng: 35.5833 },
  empakaai: { name: "Empakaai Crater", lat: -3.245, lng: 35.832 },
  oldupai: { name: "Oldupai Gorge", lat: -2.99, lng: 35.351 },
  serengetiC: { name: "Central Serengeti", lat: -2.4333, lng: 34.8333 },
  serengetiN: { name: "Northern Serengeti", lat: -1.85, lng: 34.85 },
  serengetiS: { name: "Southern Serengeti (Ndutu)", lat: -2.95, lng: 35.0 },
  mara: { name: "Mara River", lat: -1.55, lng: 34.95 },
  mkomazi: { name: "Mkomazi NP", lat: -4.166, lng: 38.083 },
  zanzibarStone: { name: "Stone Town, Zanzibar", lat: -6.165, lng: 39.2026 },
  zanzibarN: { name: "North Zanzibar", lat: -5.72, lng: 39.3 },
  nyerere: { name: "Nyerere National Park", lat: -8.0, lng: 37.5 },
  // Rwanda & Uganda
  kigali: { name: "Kigali", lat: -1.9441, lng: 30.0619 },
  nyungwe: { name: "Nyungwe Forest", lat: -2.5, lng: 29.25 },
  volcanoes: { name: "Volcanoes NP (Kinigi)", lat: -1.47, lng: 29.53 },
  entebbe: { name: "Entebbe / Kampala", lat: 0.045, lng: 32.443 },
  mabamba: { name: "Mabamba Bay", lat: 0.115, lng: 32.32 },
  mbarara: { name: "Mbarara", lat: -0.61, lng: 30.658 },
  bwindi: { name: "Bwindi Forest", lat: -1.05, lng: 29.65 },
  qenp: { name: "Queen Elizabeth NP", lat: -0.2, lng: 30.05 },
  // Kilimanjaro Northern Circuit
  mtiMkubwa: { name: "Mti Mkubwa", lat: -3.0, lng: 37.21 },
  shira1: { name: "Shira 1", lat: -3.066, lng: 37.21 },
  shira2: { name: "Shira 2", lat: -3.07, lng: 37.27 },
  moir: { name: "Moir Hut", lat: -3.054, lng: 37.305 },
  buffalo: { name: "Buffalo Camp", lat: -3.02, lng: 37.34 },
  thirdCave: { name: "Third Cave", lat: -3.02, lng: 37.41 },
  schoolHut: { name: "School Hut", lat: -3.057, lng: 37.395 },
  uhuru: { name: "Uhuru Peak", lat: -3.0758, lng: 37.3533 },
  mweka: { name: "Mweka Gate", lat: -3.21, lng: 37.355 },
};

export const safaris: Safari[] = [
  {
    "slug": "serengeti-northern-migration",
    "title": "Serengeti Northern Migration",
    "duration": "12 Days / 11 Nights",
    "region": "Tanzania",
    "bestSeason": "July–October for Mara River crossings; June–July for Grumeti River",
    "lodges": [
      "Mt. Meru Hotel (Arusha)",
      "Kichuguu Camp, Tarangire (2 nights)",
      "Ngorongoro Sopa Lodge",
      "Pamoja Tented Lodge (central Serengeti)",
      "Mara Mara Kati Kati (northern Serengeti, 3 nights)",
      "Ngorongoro Farm House",
    ],
    "highlights": [
      "Night game drive at Tarangire",
      "Lake Manyara tree-climbing lions",
      "Five full days in the Serengeti",
      "Mara River crossing spectacle",
      "Oldupai Gorge museum",
    ],
    "included": [...STD_INCLUDED, "Night game drive at Tarangire"],
    "excluded": [...STD_EXCLUDED],
    "intro": "The northern part of Tanzania is renowned for its stunning landscapes and rich wildlife experiences. This region encompasses several world-famous parks and conservation areas. Here are some luxurious sample itineraries focused on the northern circuit, combining iconic destinations with high-end accommodations and exclusive experiences.",
    "route": "Arusha · Tarangire · Ngorongoro · Serengeti",
    "days": [
      {
        "title": "DAY 1:Karibu! Safari begins!",
        "body": "A representative from Aardvark Safaris Tanzania will meet and greet you as soon as you arrive at Kilimanjaro International Airport and take you to the Mt. Meru Hotel, for your overnight. Arusha, nestled in the shadow of majestic Mount Meru, is a dynamic, fast- growing town and a famed embarkation point for Tanzania safaris. Because of its altitude (roughly 4,600 feet above sea level), Arusha is blessed with a pleasant climate, perfect for the coffee plantations that surround it."
      },
      {
        "title": "DAY 2 &3: Tarangire National Park",
        "body": "Staying two nights at the amazing Kichuguu Camp, built in 2017 and rated Excel- lent on TripAdvisor. You’ll love the service, the food, the surrounding wildness, the eco- friendly design. Here we will have the rare opportunity to do a night game drive, a privi- lege that few safari goers can get today. We’ll look for nocturnal mammals that few see (for example, civet, genet, African porcupine, maybe even the odd aardvark) and preda- tors during their most-active periods. Lions and leopards at night are completely differ- ent from the snoozing animals to be found in mid-day. We feel that a night drive could well be among the finest highlights of your entire safari. Kichuguu Camp"
      },
      {
        "title": "DAY 4: Driving to Lake Manyara.",
        "body": "This small but productive park includes the western wall of the Great Rift Valley and lies at 3,150-feet altitude. It is noted for its high elephant population and tree-climbing lions. Flamingos, pelicans, storks, and hippos inhabit the lakeshore; which is surrounded by groundwater forest, with fig, palm, tama- rind, and baobab trees hosting blue and vervet monkeys, baboons, hornbills, and much more. We may encounter bushbucks, waterbucks, giraffes (some surprisingly dark), im- pala, perhaps even a monitor lizard. Over- night: Ngorongoro Sopa Lodge"
      },
      {
        "title": "DAY 5: Ngorongoro Crater.",
        "body": "Brace yourself for a trip back into the Pleistocene! Today we’ll explore one of the world’s largest calderas, 10-11 miles in diameter and 2500 feet deep. This diverse ecosystem of forests, swamps, grasslands, and lakes supports lion, cheetah, serval, hyena, three kinds of jackal, zebra, rhino, hippo, elephant, and thousands of antelopes, including the massive eland. Because poaching is not a problem here, rare black rhinos and elephants with enormous tusks are present. It’s also a birding hotspot. Walt has recorded over 100 species of birds in a day even when most of our time has been watching big mammals! Ngorongoro Sopa Lodge."
      },
      {
        "title": "DAY 6 - 10 : Serengeti National Park.",
        "body": "Five full days in the fabled Serengeti, one of the most productive and important wildlife areas in the world. With its vast rolling plains, dramatic outcrops of Precambrian rocks (kopjes), flat-topped acacias, crocodile- and hippo-inhabited rivers lined with riverine gallery forests, and huge herds of animals, the Serengeti is about the ultimate in “wild Africa.” The famous “Great Migration” of wildebeest, zebra, and oth- er grazing herbivores is one of the last mass movements of animals still taking place on earth. We could not be here at a better time of year! There is a lot of history here—both human and animal—and you will be enriched and informed by our guides. We’ll spend our first night at Pamoja Tented Lodge (or equivalent) in the central Serengeti, which is noted for leopards, hippo pools, and the Maasai Kopjes. Then we’ll proceed north for three nights at Mara Mara Kati Kati Tented Camp, which should be close to the heart of the migration, and we will venture to some areas of extraordinary beauty where large predators thrive. With good luck, we hope to see the herds undertaking the treacherous crossing of the Mara River. Camping in the Serengeti surrounded by the exotic sounds of wild Africa is truly an in-tents experience!"
      },
      {
        "title": "DAY 11: Serengeti, Oldupai Gorge, Crater Highlands.",
        "body": "After our final breakfast in the Serengeti, we’ll drive across the plains, ascending again into the high- lands of the Ngorongoro Conservation Area, a World Heritage Site dedicated to the peaceful union of pastoralism, conservation of natural resources, and responsible tourism. We will stop to visit Oldupai (or Olduvai) Gorge, world-renowned for the discoveries of early hominids made by archaeologists Mary and Louis Leakey. We will visit the wonderful museum here and, if time permits, explore the gorge where the discoveries were made."
      },
      {
        "title": "DAY 12: Arusha.",
        "body": "Today we drive back to Arusha for a visit to the Cultural Heritage Center (wonderful wildlife art gallery and excellent shopping, including for precious Tanzanite jewelry), a scrumptious buffet lunch, and some time to rest and prepare for your trip home that evening or for continuation to Mkomazi National Park for those doing the extension. Day rooms or overnight at Mt. Meru Hotel., depending on your plans."
      }
    ],
    "waypoints": [PT.arusha, PT.tarangire, PT.manyara, PT.ngorongoro, PT.serengetiC, PT.serengetiN, PT.mara, PT.oldupai, PT.arusha]
  },
  {
    "slug": "wildlife-wonders-of-tanzania",
    "title": "Wildlife Wonders of Tanzania",
    "duration": "11 Days / 10 Nights",
    "region": "Tanzania",
    "bestSeason": "January–February (calving, south Serengeti); June–October (dry season, north Serengeti)",
    "lodges": ["Mt. Meru Hotel", "Lion's Paw Camp (Ngorongoro, 3 nights)", "Serengeti tented camp (5 nights)", "Mt. Meru Hotel (final night)"],
    "highlights": [
      "Five full days Serengeti including wildebeest calving",
      "Empakaai Crater walk with armed ranger",
      "Two-day Ngorongoro exploration",
      "Cultural Heritage Centre visit",
    ],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "intro": "The northern part of Tanzania is renowned for its stunning landscapes and rich wildlife experiences. This region encompasses several world-famous parks and conservation areas. Here are some luxurious sample itineraries focused on the northern circuit, combining iconic destinations with high-end accommodations and exclusive experiences.",
    "route": "Arusha · Tarangire · Ngorongoro · Serengeti",
    "days": [
      {
        "title": "DAY 1: Arusha, Tanzania.",
        "body": "Soon as you arrive at Kilimanjaro International Airport and take you to Mt. Meru Hotel, whose gardens attract the colorful birds that East Africa is famous for. Arusha, nestled in the shadow of majestic Mount Meru, Arusha is a dynamic, fast-growing town and a famed embarkation point for Tanzania safaris. Because of its altitude (roughly 4,600 feet above sea level), Arusha is blessed with a pleasant climate, perfect for the coffee plantations that surround it."
      },
      {
        "title": "DAY 2: Tarangire National Park. South of Arusha is Tarangire National Park.",
        "body": "Tarangire park in the dry season is second only to Ngorongoro Crater in its concentrations of large wildlife. Its permanent water sources attract thousands of elephant, giraffe,wildebeest, zebra, gazelle, buffalo, eland, impala, hartebeest, oryx, and warthog, as well as uncommon species such as gerenu k and two species of kudu. These, in turn, attract the predators: lion, leopard, cheetah, and hyena. There are also the small critters (e.g., mongooses, hyraxes, squirrels) and incredible birds. The diverse landscape has open plains, stands of magnificent baobab trees, riverine fore st, acacia parkland, scrub-woodlands, and wetlands. It is truly one of the best areas for birding and for mammal-watching in northern Tanzania."
      },
      {
        "title": "DAY 3: We have a final morning game drive in Tarangire",
        "body": "It will be hard to say good-bye to this fabulous park. We will then drive to the Ngorongoro Crater National Park, a World Heritage Site, and settle into our quarters at lovely Lion’s Paw Camp. On the north rim. The views of the crater from here are stunning, and birdlife is special. Under the lichen-draped Acacia lehai trees, we will see wildflowers, including the Lion’s Paw, so attractive to scintillating sunbirds. Three nights at elegant Lion’s Paw Camp This small but productive park includes the western wall of the Great Rift Valley and lies at 3,150-feet altitude. It is noted for its high elephant population and tree-climbing lions. Flamingos, pelicans, storks, and hippos inhabit the lakeshore; which is surrounded by groundwater forest, with fig, palm, tama- rind, and baobab trees hosting blue and vervet monkeys, baboons, hornbills, and much more. We may encounter bushbucks, waterbucks, giraffes (some surprisingly dark), im- pala, perhaps even a monitor lizard. Over- night: Ngorongoro Sopa Lodge"
      },
      {
        "title": "DAY 4 & 5: Ngorongoro Crater.",
        "body": "Ngorongoro is one of the world’s largest calderas, 10-11 miles in diameter and 2500 feet deep. This diverse ecosystem of forests, swamps, grasslands, and lakes supports lion, cheetah, serval, hyena, jackals, zebra, rhino, hippo, elephant, and thousands of antelopes, including the massive eland. Because poaching is not a problem here, rare black rhinos and elephants with enormous tusks are present. It’s also a birding hotspot, and we are here when Eurasian migrants supplement the diverse resident species. We will spend all day exploring the crater and marveling at its wildlife. The next morning, we’ll visit Empakaai Crater, where we’ll hike through lush forest down to a jewel-like lake to observe birds, butterflies, flowers, and whatever else we can find. It’s a rare opportunity to walk (with an armed guard) in wild Africa! Optional return into the crater in the afternoon. Brace yourself for a trip back into the Pleistocene! Today we’ll explore one of the world’s largest calderas, 10-11 miles in diameter and 2500 feet deep. This diverse ecosystem of forests, swamps, grasslands, and lakes supports lion, cheetah, serval, hyena, three kinds of jackal, zebra, rhino, hippo, elephant, and thousands of antelopes, including the massive eland. Because poaching is not a problem here, rare black rhinos and elephants with enormous tusks are present. It’s also a birding hotspot. Walt has recorded over 100 species of birds in a day even when most of our time has been watching big mammals! Ngorongoro Sopa Lodge."
      },
      {
        "title": "DAY 6 - 10 : Serengeti National Park.",
        "body": "Five full days in the fabled Serengeti, one of the most productive and important wildlife areas in the world. With its vast rolling plains, dramatic outcrops of Precambrian rocks (kopjes), flat-topped acacias, crocodile- and hippo-inhabited rivers lined with riverine gallery forests, and huge herds of animals, the Serengeti is about the ultimate in “wild Africa.” The famous “Great Migration” of wildebeest, zebra, and oth- er grazing herbivores is one of the last mass movements of animals still taking place on earth. We could not be here at a better time of year! There is a lot of history here—both human and animal—and you will be enriched and informed by our guides. We’ll spend our first night at Pamoja Tented Lodge (or equivalent) in the central Serengeti, which is noted for leopards, hippo pools, and the Maasai Kopjes. Then we’ll proceed north for three nights at Mara Mara Kati Kati Tented Camp, which should be close to the heart of the migration, and we will venture to some areas of extraordinary beauty where large predators thrive. With good luck, we hope to see the herds undertaking the treacherous crossing of the Mara River. Camping in the Serengeti surrounded by the exotic sounds of wild Africa is truly an in-tents experience!"
      },
      {
        "title": "DAY 11: Serengeti, Oldupai Gorge, Crater Highlands.",
        "body": "Today we return to Arusha for a visit to the Cultural Heritage Center, lunch. Day rooms at Mt. Meru Hotel. Evening transfer to the airport for those flying out and the begin- ning of hours of reflection on our amazing experiences."
      },
      {
        "title": "DAY 11 : Arusha.",
        "body": "Today we drive back to Arusha for a visit to the Cultural Heritage Center (wonderful wildlife art gallery and excellent shopping, including for precious Tanzanite jewelry), a scrumptious buffet lunch, and some time to rest and prepare for your trip home that evening or for continuation to Mkomazi National Park for those doing the extension. Day rooms or overnight at Mt. Meru Hotel., depending on your plans."
      }
    ],
    "waypoints": [PT.arusha, PT.tarangire, PT.ngorongoro, PT.empakaai, PT.serengetiC, PT.serengetiN, PT.arusha]
  },
  {
    "slug": "classic-northern-circuit-safari",
    "title": "Classic Northern Circuit Safari",
    "duration": "10 Days / 9 Nights",
    "region": "Tanzania",
    "bestSeason": "January–February (calving, south Serengeti); can extend to Uganda year-round",
    "lodges": [
      "Mount Meru Hotel (Arusha)",
      "Simba Tented Camp (Tarangire / Lake Burunge)",
      "Ngorongoro Sopa Lodge",
      "Seronera & Ndutu Kati Kati Tented Camps",
      "Ngorongoro Farm House",
    ],
    "highlights": [
      "Arusha NP montane forest & Ngurdoto Crater",
      "Hadzabe hunter-gatherer visit",
      "Datoga metalworkers",
      "Optional St Lucia Hospice & Orphanage visit",
      "Wildebeest & zebra birthing season",
      "Oldupai Gorge",
    ],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "intro": "The northern part of Tanzania is renowned for its stunning landscapes and rich wildlife experiences. This region encompasses several world-famous parks and conservation areas. Here are some luxurious sample itineraries focused on the northern circuit, combining iconic destinations with high-end accommodations and exclusive experiences.",
    "route": "Arusha · Tarangire · Ngorongoro · Serengeti · Extension: Uganda",
    "days": [
      {
        "title": "DAY 1: Arusha, Tanzania. Safari begins!",
        "body": "Karibu! A representative from Aardvark Safaris will meet and greet you as soon as you arrive at Kilimanjaro Inter- national Airport and take you to Mount Meru Hotel, a 4-star hotel in gardens that attract the colorful birds that East Africa is famous for. Arusha, nestled in the shadow of majestic Mount Meru, is a dynamic, fast-growing town and a famed embarkation point for Tanzania safaris. Because of its altitude (roughly 4,600 feet above sea level), Arusha is blessed with a pleasant climate, perfect for the coffee plantations that surround it."
      },
      {
        "title": "DAY 2: Arusha National Park.",
        "body": "We will drive through elegant, sometimes moody with mist, mon- tane forest, watching carefully for baboons and monkeys (including the spectacular Black- &-White Colobus), various forest antelopes, African buffalo, and dozens of species of birds. We will walk to the rim of the Ngurdoto Crater, more accurately a caldera or vol- canic collapse feature. We will scan the caldera floor for wildlife and watch the skies for birds of prey or other aerial masters. From the rim forest, we will proceed through wood- lands and past lakes and marshes, watching for giraffes, waterbucks, kingfishers, and much more. On former lava (volcanic mudflow) deposits are the Momela Lakes, alkaline havens for multitudes of waterbirds, including flamingos, ducks and geese, shorebirds, storks, and ibises. Many visitors to Tanzania head directly to the savannah parks and miss the lush, green beauty and special wildlife of this park, a naturalist’s favorite. In the even- ing, we’ll return to Mount Meru Hotel for a delightful dinner and for a short briefing on details for the next day."
      },
      {
        "title": "DAY3: Tarangire National Park.",
        "body": "South of Arusha is Tarangire National Park. Augus- tine, our co-leader, did his Master’s Degree through Prescott College studying community -based conservation in two villages on a wildlife corridor between two national parks. Tarangire park in the dry season is second only to Ngorongoro Crater in its concentrations of large wildlife. Its permanent water sources attract thousands of elephant, giraffe, wil- debeest, zebra, gazelle, buffalo, eland, impala, hartebeest, oryx, and warthog, as well as uncommon species such as gerenuk and two species of kudu. These, in turn, attract the predators: lion, leopard, cheetah, and hyena. There are also the small critters (e.g., mon- gooses, hyraxes, squirrels) and incredible birds. The diverse landscape has open plains, stands of magnificent baobab trees, riverine forest, acacia parkland, scrub-woodlands, and wetlands. Overnights at the lovely Simba Tented Camp near Lake Burunge, which sometimes has thousands of flamingos. As is always the case, we will have “friendly” birds and mammals, habituated to human presence, at our camps and lodges."
      },
      {
        "title": "DAY 4: Early morning visit to a Hadzabe camp.",
        "body": "The Hadza are true hunter-gatherers, and an early start will give us the best chances to follow them in their daily rhythms, to inter- act with and learn a bit about their hunting and gathering traditions. If time permits, we will visit a Datoga settlement. The Datoga, originally pastoralists similar in many traditions to the Maasai, migrated into this area about 300 years ago, no doubt dis- placing some of the Mbulu or Iraqw people who arrived a few thousand years ago. Most of the Datoga today are farmers specializing in onion plantations, and some are superb metal smiths who make the arrows for the Hadza. Overnight: Ngorongoro Sopa Lodge perched on the rim of amazing Ngorongoro Crater."
      },
      {
        "title": "DAY5: Ngorongoro Crater.",
        "body": "Brace yourself for a trip back into the Pleistocene! Today we’ll explore one of the world’s largest calderas, 10-11 miles in diam- eter and 2500 feet deep. This diverse ecosystem of forests, swamps, grasslands, and lakes supports lion, cheetah, serval, hyena, several kinds of jackal, zeb- ra, rhino, hippo, elephant, and thousands of antelopes. Because poaching is not a problem here, rare black rhinos and elephants with enormous tusks are present. Ngorongoro Sopa Lodge."
      },
      {
        "title": "DAY 6 & 7: Serengeti National Park.",
        "body": "We’ll spend five days in the Serengeti, one of the world’s most important wildlife areas, known for its vast plains, rock outcrops, acacias, rivers, and large animal herds. The trip is timed for the wildebeest and zebra birthing season, attracting predators like lions and cheetahs. Birdwatching will be exceptional, with over 50 species of diurnal birds of prey. We’ll explore the central Serengeti at Seronera Kati Kati Tented Camp, known for leopards and hippo pools, and stay three nights at Ndutu Kati Kati Tented Camp, near the migration heart and large predators. Lake Ndutu offers excellent birdwatching. Camping will provide an immersive experience in the Serengeti’s natural beauty."
      },
      {
        "title": "DAY 8: Serengeti, Oldupai Gorge, Crater Highlands.",
        "body": "After our final breakfast in the Serengeti, we’ll drive east across the plains, ascending again into the highlands of the Ngorongoro Conservation Area, a World Heritage Site dedicated to the peaceful union of pastoralism, conservation of natural resources, and responsible tourism. We will stop to visit Oldupai (or Olduvai) Gorge, world-renowned for the discoveries of early hominids made by archaeologists Mary and Louis Leakey. We will visit the small museum here and explore the gorge where the discoveries were made. For many people, a visit to Oldupai is a pilgrimage to one of the world’s greatest archeo- logical sites, a place where we can vicariously connect with our distant ancestors. We may also visit a Maasai Village. Thereafter, we will drive out of the park to relax at the Ngoron- goro Farm House, whose lovely gardens provide scrumptious produce for this oasis and for some of the remote tented camps. Tonight we will share highlights of the safari as we prepare tomorrow to depart from Arusha."
      },
      {
        "title": "DAY 9: Arusha.",
        "body": "Today we return to Arusha for visit to the Cultural Heritage Center. lunch, and an optional visit to the St Lucia Hospice and Orphanage for victims of HIV/AIDS that was founded by Augustine’s heroic wife, Winfrida. Day rooms at Mount Meru Hotel. Evening transfer to the airport for those fly- ing out of country and the beginning of hours of reflection on our amazing experiences. Those extending to Uganda will have another night at the Mt. Meru Hotel."
      },
      {
        "title": "DAY 10: Arusha, Tanzania.",
        "body": "As the Tanzania safari closes, the Uganda one begins. Continuing participants will enjoy our fine dinner at Mt. Meru Hotel anticipating the adventure ahead in the land of Mountain Gorillas, Chimpanzees, and spectacular birds and mammals. . . . Kampala, Uganda. Folks doing only the Uganda trip will arrive at Entebbe Airport and transfer to the Lake Victoria Serena Resort for overnight and breakfast."
      }
    ],
    "waypoints": [PT.arusha, PT.arushaNP, PT.tarangire, PT.ngorongoro, PT.serengetiC, PT.serengetiN, PT.oldupai, PT.arusha]
  },
  {
    "slug": "exploring-cape-town-victoria-falls-botswana-wildlife-safari-circuit",
    "title": "Cape Town, Victoria Falls & Botswana Wildlife Circuit",
    "duration": "12 Days / 11 Nights",
    "intro": "A southern Africa circuit from Cape Town through Victoria Falls into Botswana's premier wildlife areas — Chobe, Hwange, and the Okavango Delta — combining city, waterfall, and bush in one journey.",
    "route": "Victoria Falls · Chobe · Hwange · Okavango Delta",
    "highlights": [
      "Cape Town & Table Mountain",
      "Victoria Falls rainforest walk",
      "Chobe River boat safari",
      "Hwange elephant herds",
      "Okavango mokoro & walking safaris",
    ],
    "included": [...STD_INCLUDED, "Internal flights between circuit sectors where noted"],
    "excluded": [...STD_EXCLUDED, "Victoria Falls optional activities (helicopter, etc.)"],
    "days": [
      {
        "title": "Day 1–2: Cape Town",
        "body": "Arrive in Cape Town and settle into your hotel at the foot of Table Mountain. Explore the V&A Waterfront, optional cable car to the summit, and the Cape Peninsula — Chapman’s Peak, Boulders Beach penguins, and Cape Point where two oceans meet. Winelands tasting or Robben Island can be woven in depending on your interests."
      },
      {
        "title": "Day 3: Cape Town to Victoria Falls",
        "body": "Fly north to Livingstone (Zambia) or Victoria Falls (Zimbabwe). On arrival, transfer to your lodge near the falls. Optional sunset cruise on the Zambezi, with hippos, crocodiles, and abundant birdlife along the riverbanks."
      },
      {
        "title": "Day 4: Victoria Falls",
        "body": "A full day at Mosi-oa-Tunya — the Smoke that Thunders. Walk the rainforest trails facing the main falls, feel the spray on the bridge, and choose optional activities such as a helicopter flight over the gorge or a visit to Livingstone Island. Evening at leisure."
      },
      {
        "title": "Day 5: Victoria Falls to Chobe",
        "body": "Cross into Botswana for Chobe National Park, famous for one of Africa’s largest elephant populations. Afternoon boat safari on the Chobe River — elephants swimming, buffalo on the banks, and prolific waterbirds at close range."
      },
      {
        "title": "Day 6: Chobe National Park",
        "body": "Morning and afternoon game drives in Chobe’s riverfront sector. Lion, leopard, and wild dog are possible; elephant herds are almost guaranteed. Return to your lodge for sundowners overlooking the river."
      },
      {
        "title": "Day 7: Chobe to Hwange",
        "body": "Travel to Hwange National Park in western Zimbabwe. Hwange’s mix of teak woodland and open vleis supports strong populations of elephant, buffalo, zebra, and predators — including excellent wild dog viewing in season."
      },
      {
        "title": "Day 8: Hwange National Park",
        "body": "Full day exploring Hwange on game drives and at waterholes. The park’s pumped pans attract wildlife in the dry season and make for memorable photography. Overnight at a lodge or tented camp in the park."
      },
      {
        "title": "Day 9: Hwange to Okavango Delta",
        "body": "Fly or drive to the Okavango Delta — a UNESCO wetland of channels, lagoons, and palm islands. Settle into your camp and enjoy a late-afternoon mokoro (dugout canoe) or motorboat excursion into the channels."
      },
      {
        "title": "Day 10: Okavango Delta",
        "body": "A full day in the delta: mokoro glides through papyrus, walks with armed guides on forested islands, and game drives on higher ground for elephant, red lechwe, and predators. Birding is exceptional — from Pel’s fishing owl to African skimmer."
      },
      {
        "title": "Day 11: Okavango Delta",
        "body": "Second delta day to explore a different habitat or repeat your favourite activity. Many camps offer catch-and-release fishing, scenic helicopter flights, or village visits. Sundowners in the bush as the day cools."
      },
      {
        "title": "Day 12: Departure",
        "body": "Morning activity if time allows, then transfer to Maun or Kasane for your onward flight. Extensions to Cape Town, Tanzania, or Zanzibar can be arranged through Aardvark Safaris."
      }
    ],
    "waypoints": [
      { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
      { name: "Victoria Falls", lat: -17.9243, lng: 25.8572 },
      { name: "Chobe NP", lat: -18.6667, lng: 24.5 },
      { name: "Hwange NP", lat: -18.75, lng: 26.5 },
      { name: "Okavango Delta", lat: -19.3, lng: 22.9 }
    ]
  },
  {
    "slug": "northern-circuit-route",
    "title": "Kilimanjaro Northern Circuit Route",
    "duration": "10 Days / 9 Nights",
    "region": "Tanzania",
    "bestSeason": "January–February & June–October (clearest skies and best summit conditions)",
    "highlights": ["Lava Tower acclimatisation", "Buffalo Ridge views", "Gilman's Point sunrise", "Uhuru Peak 5,895m", "Official summit certificate"],
    "included": [
      "4WD airport transfers",
      "Mountain guide & porter team",
      "All camping equipment on mountain",
      "All meals on mountain",
      "Park fees & conservation levy",
      "Rescue fee",
      "Arusha Serena Lodge (start & end nights)",
    ],
    "excluded": [
      "International flights",
      "Visa fees",
      "Personal gear (boots, clothing, poles)",
      "Travel insurance",
      "Tips for mountain crew",
    ],
    "intro": "Mount Kilimanjaro is Africa's highest peak at 5,895 metres — a challenging but accessible trek without technical mountaineering. The Northern Circuit is the most scenic and remote path, passing through five vegetation zones to Uhuru Peak.",
    "route": "Mti Mkubwa · Shira · Moir · Buffalo · School Hut · Uhuru Peak",
    "days": [
      {
        "title": "DAY 1: Arrive Kilimanjaro Airport (JRO) Tanzania.",
        "body": "Elevation: 9,498 ft Hiking Time: 3-4 hoursDistance: 7 km | 4 miles Habitat: Rain Forest. Upon arrival at Kilimanjaro International Airport (JRO), you will be met outside customs area by a driver guide holding a sign board written clearly your booking name and drive to Arusha for overnight at ARUSHA SERENA LODGE."
      },
      {
        "title": "DAY 2: Mti Mkubwa (Big tree Camp)",
        "body": "Elevation: 9,498 ft Hiking Time: 3-4 hours Distance: 7 km | 4 miles Habitat: Rain Forest. We depart Moshi for Londorossi Gate, which takes about 4 hours, where you will complete entry formalities. Then drive to the Lemosho trailhead. Upon arrival at trailhead, we begin hiking through undisturbed forest which winds to the first camp site. Dinner and overnight at MTI MKUBWA (BIGTREE CAMP)."
      },
      {
        "title": "DAY 3: Shira 1 Camp",
        "body": "Elevation: 11,500 ft Hiking Time: 5-6 hours Distance: 8 km | 5 miles Habitat: Heather or moorland. We continue on the trail leading out of the rain forest and into a savannah of tall grasses, heather and volcanic rock draped with lichen beards. As we ascend through the lush rolling hills and cross several streams, we reach the Shira Ridge before dropping gently down to Shira 1 Camp. Here we catch our first glimpse of Kibo across the plateau. Dinner and overnight at SHIRA 1 Camp"
      },
      {
        "title": "DAY 4: Shira 2 Camp",
        "body": "Elevation: 12,500 ft Hiking Time: 3-4 hours Distance: 10 km | 4 miles Habitat: HeatherWe explore the Shira Plateau. It is a gentle walk east on moorland meadows towards Shira 2 Camp. The heath zone displays abundant wildflowers and unique Senecio trees. Dinner and overnight at SHIRA 2 CAMP."
      },
      {
        "title": "DAY 5 : Moir Hut",
        "body": "Elevation: 13,580 ft Hiking Time: 7 hours Distance: 7 km | 4 miles Habitat: Alpine Desert We continue to the east up a ridge and then head southeast to Lava Tower for lunch – a 300ft tall volcanic rock formation at the elevation of 15,190ft. Then we divert from the main trail to Moir Hut, a little used site on the base of Lent Hills. A variety of walks are available on Lent Hills making this an excellent acclimatization opportunity. Shira Plateau is one of the highest plateaus on earth. Dinner and overnight at MOIR HUT"
      },
      {
        "title": "DAY 6: Buffalo Camp",
        "body": "Elevation: 13,200 ft Hiking Time: 5-7 hours Distance: 12 km | 7 miles Habitat: Alpine DesertWe trek out of Moir Valley with a moderately steep climb, then hike to the summit of Lent Hills before returning to the main trail. The path crosses a rock field and gently undulates before reaching Buffalo Camp. This section of the trail offers great views across the plains that lie north of Kilimanjaro and stretch out to the Kenyan/Tanzanian border. Dinner and overnight at BUFALO CAMP."
      },
      {
        "title": "DAY 7: Third Cave",
        "body": "Elevation: 12,700 ft Hiking Time: 5-7 hoursDistance: 8 km | 5 milesHabitat: Heather As we head up Buffalo Ridge, the terrain becomes increasingly sparse. This route is rarely travelled and we will enjoy its mountain wilderness feel. We trek through remote valleys on to the northern slopes of Kilimanjaro until we arrive at Third Cave. Dinner and Overnight at THIRD CAVE."
      },
      {
        "title": "DAY 8: School Hut",
        "body": "Elevation: 15,600 ft Hiking Time: 4-5 hours Distance: 5 km | 3 miles Habitat: Alpine Desert We climb steadily up and over the “Saddle,” which sits between Kibo and Mawenzi. We continue on to our camp, School Hut. Once here we rest, enjoy an early dinner to prepare for the summit day."
      },
      {
        "title": "DAY 9: Uhuru Peak to Mweka Camp",
        "body": "Elevation: 19,341 ft to 10,065 ft Hiking Time: 13 hours Habitat: Arctic to Rain forest Very early in the morning (around midnight), we begin our push to the summit. This is the most mentally and physically challenging portion of the trek. The wind and cold at this elevation and time of day can be extreme. We ascend in the darkness for several hours while taking frequent, but short, breaks. At Gilman’s point (18,600 ft), you will be rewarded with the most magnificent sunrise you are ever likely to see coming over Mawenzi Peak. Finally, we arrive at Uhuru Peak- the highest point on Mount Kilimanjaro and the continent of Africa. From the summit, we now make our descent continuing straight down to the Mweka Hut camp site, stopping at Barafu for lunch. The trail is very rocky and can be quite hard on the knees; trekking poles are helpful. Mweka Camp is situated in the upper forest and mist or rain can be expected in the late afternoon. Later in the evening, we enjoy our last dinner on the mountain and a well-earned sleep."
      },
      {
        "title": "DAY 10: Mweka Gate",
        "body": "Elevation: 5,380 ft Hiking Time: 3-4 hours Distance: 10 km | 6 miles Habitat: Rain Forest. On our last day, we continue the descent to Mweka Gate and collect the summit certificates. At lower elevations, it can be wet and muddy. From the gate, we continue another hour to Mweka Village. A vehicle will meet us at Mweka Village to drive us back to the hotel in Arusha and overnight at ARUSHA SERENA LODGE."
      }
    ],
    "waypoints": [PT.kilimanjaro, PT.arusha, PT.mtiMkubwa, PT.shira1, PT.shira2, PT.moir, PT.buffalo, PT.thirdCave, PT.schoolHut, PT.uhuru, PT.mweka]
  },
  {
    "slug": "iconic-tanzania",
    "title": "Iconic Tanzania: Quick Escape to Tarangire, Ngorongoro & Serengeti",
    "duration": "4 Days / 3 Nights",
    "intro": "The northern part of Tanzania is renowned for its stunning landscapes and rich wildlife experiences. This region encompasses several world-famous parks and conservation areas. Here are some luxurious sample itineraries focused on the northern circuit, combining iconic destinations with high-end accommodations and exclusive experiences.",
    "route": "Tarangire · Ngorongoro · Serengeti",
    "highlights": ["Baobab woodlands of Tarangire", "Ngorongoro Crater Big Five", "Central Serengeti plains"],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "days": [
      {
        "title": "Day 1: Arrival & Tarangire National Park",
        "body": "Morning: Depart from Arusha and drive to Tarangire National Park, known for its iconic baobab trees and large elephant herds. Afternoon: Enjoy a game drive, spotting diverse wildlife like zebras, wildebeest, and lions near the Tarangire River. Evening: Overnight at a lodge or camp near Tarangire."
      },
      {
        "title": "Day 2: Ngorongoro Crater Exploration",
        "body": "Morning: Head to Ngorongoro Conservation Area and descend into the world-famous Ngorongoro Crater. Afternoon: Explore the lush crater floor on a game drive, where you may see the Big Five—lions, elephants, rhinos, buffalo, and leopards. Evening: Overnight at a lodge or camp on the rim of the crater."
      },
      {
        "title": "Day 3: Serengeti National Park (Central)",
        "body": "Morning: Drive from Ngorongoro to the Serengeti, passing through the highlands with scenic views of the savannah. Afternoon: Enjoy a game drive in the central Serengeti, observing vast herds, predators, and diverse birdlife. Evening: Overnight at a lodge or tented camp in the central Serengeti."
      },
      {
        "title": "Day 4: Serengeti & Return to Arusha",
        "body": "Morning: Early morning game drive in the Serengeti, capturing the sunrise and spotting active predators. Midday: Start the journey back to Arusha, with an optional flight for those seeking a faster return. Evening: Arrive in Arusha for onward travel or departure."
      }
    ],
    "waypoints": [PT.arusha, PT.tarangire, PT.ngorongoro, PT.serengetiC, PT.arusha]
  },
  {
    "slug": "crater-savannah",
    "title": "Crater Savannah",
    "duration": "2 Days / 1 Night",
    "intro": "A focused northern Tanzania escape pairing Tarangire's baobab woodlands with the wildlife-rich floor of Ngorongoro Crater — ideal when time is short but you want iconic game viewing.",
    "route": "Ngorongoro · Serengeti",
    "highlights": ["Tarangire elephant herds", "Ngorongoro Crater rim overnight"],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "days": [
      {
        "title": "Day 1: Arrival & Tarangire National Park",
        "body": "Morning: Depart from Arusha and drive to Tarangire National Park, renowned for its ancient baobab trees and large elephant herds. Afternoon: Enjoy a game drive along the Tarangire River, spotting wildlife such as zebras, wildebeest, lions, and various bird species. Evening: Overnight at a lodge or camp near Tarangire."
      },
      {
        "title": "Day 2: Tarangire National Park & ​​Transfer to Ngorongoro",
        "body": "Morning: Start the day with a game drive in Tarangire, capturing more of the park’s unique wildlife and scenic landscapes. Afternoon: Depart for the Ngorongoro Conservation Area, enjoying scenic views along the way. Evening: Overnight at a lodge or camp on the rim of Ngorongoro Crater, preparing for an early descent into the crater the following day."
      }
    ],
    "waypoints": [PT.arusha, PT.tarangire, PT.ngorongoro, PT.serengetiC]
  },
  {
    "slug": "quick-escape",
    "title": "Quick Escape",
    "duration": "2 Days / 1 Night",
    "intro": "A compact overnight circuit to the Ngorongoro Crater rim and floor — maximum wildlife in minimum time, with scenic highland drives and the Big Five on the crater floor.",
    "route": "Tarangire · Ngorongoro",
    "highlights": ["Ngorongoro Crater rim views", "Crater floor Big Five game drive"],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "days": [
      {
        "title": "Day 1: Arrival & Transfer to Ngorongoro Conservation Area",
        "body": "Morning: Depart from Arusha and enjoy a scenic drive to the Ngorongoro Conservation Area. Afternoon: Arrive at the Ngorongoro Crater rim, where you’ll have time to take in the breathtaking views from above and perhaps enjoy a short nature walk in the surrounding area. Evening: Overnight at a lodge or camp on the crater rim, with an early start planned for the next day."
      },
      {
        "title": "Day 2: Ngorongoro Crater Exploration & Return to Arusha",
        "body": "Morning: Descend into the Ngorongoro Crater for a half-day game drive on the crater floor, where you may spot the Big Five, along with hippos, zebras, flamingos, and a range of other wildlife in this diverse habitat. Afternoon: After a picnic lunch, begin your journey back to Arusha with memories of an unforgettable crater experience. Evening: Arrive in Arusha for onward travel or departure."
      }
    ],
    "waypoints": [PT.arusha, PT.tarangire, PT.ngorongoro]
  },
  {
    "slug": "day-tour",
    "title": "Day Tour",
    "duration": "1 Day",
    "intro": "A full-day descent into Ngorongoro Crater from Arusha — one of Africa's most concentrated wildlife arenas in a single unforgettable day.",
    "route": "One-day descent into the Crater",
    "highlights": ["Full-day Ngorongoro Crater descent", "Rhino, lion & flamingo on the crater floor"],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "days": [
      {
        "title": "Day 1: Ngorongoro Crater full-day safari",
        "body": "Early departure from Arusha to the Ngorongoro Conservation Area. Descend into the crater for a full-day game drive on the floor — rhino, elephant, lion, flamingos on the lakes, and dense herds of zebra and wildebeest. Picnic lunch inside the crater before returning to Arusha in the evening."
      }
    ],
    "waypoints": [PT.arusha, PT.ngorongoro]
  },
  {
    "slug": "serengeti-southern-migration-zanzibar",
    "title": "Serengeti Southern Migration & Zanzibar Beach Holiday",
    "duration": "8 Days + Optional Zanzibar Extension",
    "region": "Tanzania",
    "bestSeason": "January–March (calving, south Serengeti + Zanzibar shoulder season)",
    "lodges": ["Legendary Lodge (Arusha)", "Serengeti Kusini (3 nights)", "Namiri Camp (2 nights)", "Sandriver Lodge, Nyerere (2 nights)", "Park Hyatt Zanzibar (extension)"],
    "highlights": [
      "Southern Serengeti calving season",
      "Big cat concentration at Namiri",
      "Nyerere boat safaris & walking safaris",
      "Optional Zanzibar beach extension",
    ],
    "included": [...STD_INCLUDED, "Internal charter flights on fly-in sectors"],
    "excluded": [...STD_EXCLUDED],
    "intro": "Combine the southern Serengeti's calving season and the wild beauty of Nyerere National Park with a relaxing beach extension on the spice island of Zanzibar.",
    "route": "Arusha · Serengeti Kusini · Namiri · Nyerere · Zanzibar",
    "days": [
      { "title": "DAY 1: Arusha", "body": "Arrive at Kilimanjaro International Airport, met by your Aardvark representative and transferred to Legendary Lodge for overnight." },
      { "title": "DAY 2: Fly to Serengeti", "body": "Fly into the southern Serengeti. Overnight at Serengeti Kusini, in the heart of the southern shortgrass plains and the calving grounds of the great migration." },
      { "title": "DAYS 3 & 4: Serengeti Kusini", "body": "Two full days exploring the southern Serengeti — vast herds of wildebeest and zebra, attendant predators, and exceptional birdlife on the open plains." },
      { "title": "DAY 5: Drive to East Central Serengeti", "body": "Transfer to East Central Serengeti and check in at Namiri Camp, an area renowned for big cats — particularly cheetah." },
      { "title": "DAY 6: East Central Serengeti", "body": "A full day of game-viewing from Namiri Camp, with lions, leopards and cheetah at the heart of the experience." },
      { "title": "DAY 7: Fly to Nyerere National Park", "body": "Fly south to Nyerere (formerly Selous), Africa's largest game reserve. Overnight at Sand Rivers Lodge on the Rufiji River." },
      { "title": "DAY 8: Nyerere National Park", "body": "Game drives, boat safaris on the Rufiji and walking safaris from Sand Rivers Lodge — Nyerere at its very best." },
      { "title": "ZANZIBAR · DAY 1: Fly to Zanzibar", "body": "Fly across to the spice island. Transfer and overnight at the Hyatt Zanzibar in Stone Town." },
      { "title": "ZANZIBAR · DAY 2: Excursions in Zanzibar", "body": "Spice tour, Stone Town heritage walk, or simply unwind on the turquoise coast. Overnight at Hyatt Zanzibar." }
    ],
    "waypoints": [PT.arusha, PT.serengetiS, PT.serengetiC, PT.nyerere, PT.zanzibarStone, PT.zanzibarN]
  },
  {
    "slug": "mkomazi-extension",
    "title": "Mkomazi National Park Extension",
    "duration": "4 Days / 3 Nights",
    "region": "Tanzania",
    "bestSeason": "June–October (dry season wildlife viewing)",
    "highlights": ["Rhino sanctuary visit", "Wild dog reintroduction project", "Gerenuk & kudu", "Bush breakfast at Dindera Dam"],
    "included": [...STD_INCLUDED],
    "excluded": [...STD_EXCLUDED],
    "intro": "An off-the-beaten-track extension into Mkomazi National Park, home to the Mkomazi Rhino Sanctuary and African Wild Dog reintroduction project — a quiet, uncrowded alternative to Tanzania's famous parks.",
    "route": "Arusha · Mkomazi · Arusha",
    "days": [
      { "title": "DAY 1: Drive to Mkomazi", "body": "Drive east from Arusha to Mkomazi and begin to experience the wildlife of Mkomazi National Park. Settle into camp this evening." },
      { "title": "DAY 2: Explore Mkomazi National Park", "body": "A full day of exploration and discovery in the park, including a visit to the rhino and wild dog projects. With a small group you'll have great flexibility in what you do." },
      { "title": "DAY 3: Uncharted Territory", "body": "Exploring uncharted territory by day, spotting gerenuk, kudu, and many more game animals." },
      { "title": "DAY 4: Day in Arusha & Departure", "body": "Drive back to Arusha with options for a relaxing day in town before flying out that night." }
    ],
    "waypoints": [PT.arusha, PT.mkomazi, PT.arusha]
  },
  {
    "slug": "uganda-extension",
    "title": "Uganda Extension — Gorillas, Chimpanzees & Shoebill",
    "duration": "6 Days / 5 Nights",
    "intro": "A natural extension to any Tanzania safari: track mountain gorillas in Bwindi, search for the prehistoric Shoebill in Mabamba's papyrus swamps, and trek chimpanzees in the primate capital of the world.",
    "route": "Entebbe · Mabamba · Mbarara · Bwindi · Queen Elizabeth NP · Kampala",
    "highlights": ["Mountain gorilla trek", "Shoebill at Mabamba", "Chimpanzees & tree-climbing lions"],
    "included": [...STD_INCLUDED, "Gorilla permit (when booked as part of extension)"],
    "excluded": [...STD_EXCLUDED],
    "days": [
      { "title": "DAY 1: Flight to Uganda", "body": "Met by our Aardvark representative on arrival in Entebbe and transferred to the Lake Victoria Serena Resort, whose gardens of indigenous plants attract butterflies and resident and migratory birds — Splendid Starling, Pied and Woodland Kingfishers, Black-headed Gonolek and more." },
      { "title": "DAY 2: Kampala to Mabamba Bay – Mbarara", "body": "After breakfast, proceed to Mabamba Bay on Lake Victoria where papyrus swamps support over 260 bird species, including the rare Shoebill. Enter the swamps by boat with local guides to look for Shoebill, Palm-nut Vulture, jaçanas, Pygmy Goose, Goliath Heron and more. Continue to Mbarara, arriving in late evening. Igongo Cultural Center Hotel. Transit time 4–5 hours." },
      { "title": "DAY 3: Gorilla Tracking in Bwindi Forest", "body": "An early breakfast and briefing at park HQ, then venture into the steep, often muddy Bwindi forest in search of a habituated group of mountain gorillas. It may take 2–8 hours to reach the gorillas, after which you have a glorious hour of observation and photography. Gorilla tourism provides funds that aid in their conservation." },
      { "title": "DAY 4: Bwindi to Queen Elizabeth National Park", "body": "Drive to Queen Elizabeth National Park, pausing for a short game drive in the Ishasha Sector, well-known for tree-climbing lions. Afternoon boat cruise on the Kazinga Channel — crocs, hippos, waterbucks, Uganda kob, elephants, buffalo, plus flamingoes, herons, ibises, storks, pelicans, the African Fish Eagle and more. Mweya Safari Lodge." },
      { "title": "DAY 5: Game Drive & Chimpanzee Trekking", "body": "Early game drive on the Kasenyi plains for elephant, leopard, lion, buffalo, warthog and Uganda kob. Afternoon chimpanzee tracking in the Kyambura Gorge — chimps, L'Hoest monkey, black-and-white colobus, red-tailed monkey, olive baboon and more. Mweya Safari Lodge." },
      { "title": "DAY 6: Return to Kampala", "body": "After breakfast, head back through scenic Uganda countryside to Kampala / Entebbe Airport, with a warm lunch along the way. Connect with international flights or overnight in the area. Transit time 6–7 hours depending on stops." }
    ],
    "waypoints": [PT.entebbe, PT.mabamba, PT.mbarara, PT.bwindi, PT.qenp, PT.entebbe]
  },
  {
    slug: "northern-tanzania-wildlife-safari",
    title: "Northern Tanzania Wildlife Safari",
    duration: "9 Days / 8 Nights",
    region: "Tanzania",
    lodges: [
      "Gran Melia Hotel (Arusha)",
      "Tarangire Safari Lodge (2 nights)",
      "Kubu Kubu Tented Lodge (Serengeti)",
      "Lion's Paw (Ngorongoro rim, 2 nights)",
      "Mount Meru Hotel (final night)",
    ],
    bestSeason: "May–October (dry); Jan–Feb for migration birthing in the south",
    highlights: ["Great Migration focus", "Tarangire night drive", "Ngorongoro Crater full day", "Expert guide Augustine"],
    included: [...STD_INCLUDED],
    excluded: [...STD_EXCLUDED, "Balloon flights", "Village visits"],
    intro:
      "The Great Migration of the Serengeti is one of the world's most spectacular wildlife phenomena. This safari concentrates on wildlife-rich Tarangire, Serengeti, and Ngorongoro so you spend more time observing and less time travelling — with expert leadership that turns sightings into stories.",
    route: "Arusha · Tarangire · Serengeti · Ngorongoro · Arusha",
    days: [
      {
        title: "DAY 1: Karibu! Safari begins",
        body: "Meet at Kilimanjaro International Airport (JRO) and transfer to Gran Melia Hotel in Arusha. Nestled below Mount Meru at roughly 4,600 ft, Arusha enjoys a pleasant climate — the classic embarkation point for northern Tanzania safaris.",
      },
      {
        title: "DAY 2: Arusha to Tarangire National Park",
        body: "After breakfast, drive to Tarangire — in the dry season second only to Ngorongoro for concentrations of wildlife. Permanent water draws elephant, giraffe, wildebeest, zebra, predators, and exceptional birdlife across baobab-studded landscapes. Optional night game drive for nocturnal species.",
      },
      {
        title: "DAY 3: Full day in Tarangire",
        body: "A full day inside Tarangire National Park. Dinner and overnight at Tarangire Safari Lodge.",
      },
      {
        title: "DAYS 4–5: Tarangire to Serengeti National Park",
        body: "Three full days in the fabled Serengeti — rolling plains, kopjes, riverine forest, and vast herds. Time to observe behaviour, not just tick species. Your guide enriches every encounter with context on ecology and history. Dinner and overnight at Kubu Kubu Tented Lodge.",
      },
      {
        title: "DAY 6: Serengeti to Ngorongoro Highlands",
        body: "After an early breakfast, game drive en route to Ngorongoro Conservation Area. Overnight at Lion's Paw on the crater rim.",
      },
      {
        title: "DAY 7: Ngorongoro Crater full-day game drive",
        body: "Explore one of the world's largest calderas — forests, swamps, grasslands, and lakes supporting lion, cheetah, rhino, elephant, and thousands of antelope. Rare black rhino and big-tusked elephants are highlights. Overnight at Lion's Paw.",
      },
      {
        title: "DAY 8: Ngorongoro Highlands to Arusha",
        body: "After breakfast, depart for Arusha and Mount Meru Hotel for overnight.",
      },
      {
        title: "DAY 9: Departure",
        body: "After lunch, transfer to the airport for your onward flight home.",
      },
    ],
    waypoints: [PT.arusha, PT.tarangire, PT.serengetiC, PT.ngorongoro, PT.arusha],
  },
  {
    slug: "uganda-gorillas-chimps-7-day",
    title: "7-Day Uganda Gorillas & Chimps Trek",
    duration: "7 Days / 6 Nights",
    region: "Uganda",
    highlights: ["Two gorilla treks", "Chimp tracking", "Tree-climbing lions", "Batwa community"],
    included: [
      "Flights Arusha–Kigali",
      "All airport transfers and accommodation",
      "Gorilla permits (as selected)",
      "Chimp permits and all park fees",
      "4WD ground transport with English-speaking Ugandan guide",
      "Mineral water, juices & fruits",
      "Last-day Kigali lunch",
    ],
    excluded: ["Beers, wines, tips"],
    intro:
      "A primate-rich circuit through Rwanda and Uganda: mountain gorillas in Bwindi (one or two treks), chimpanzees in Queen Elizabeth, tree-climbing lions in Ishasha, and cultural time with Batwa communities — in comfortable 4×4 Land Cruisers with an English-speaking Ugandan guide.",
    route: "Kigali · Bwindi · Queen Elizabeth NP · Kigali",
    days: [
      {
        title: "DAY 1: Arrive Kigali",
        body: "Welcome at Kigali International Airport, transfer to Kigali Des Mille Collines Hotel overlooking the city. Briefing and warm welcome.",
      },
      {
        title: "DAY 2: Kigali to Bwindi",
        body: "After breakfast, transfer via the Katuna border to northern Bwindi Impenetrable National Park. Hot lunch en route. Dinner and briefing at Buhoma Community Haven Lodge.",
      },
      {
        title: "DAY 3: First gorilla trekking",
        body: "Full gorilla trek in Bwindi with park rangers. Certificate on success. Afternoon Batwa community visit — Luke's Batwa Project. Overnight Buhoma Community Haven Lodge.",
      },
      {
        title: "DAY 4: Second gorilla trek or birding",
        body: "Second trek with a different gorilla family, or optional birding along the Buhoma Valley with a senior local birder. Batwa visit with Joseph's Hope Foundation. Overnight Buhoma Community Haven Lodge.",
      },
      {
        title: "DAY 5: Bwindi to Queen Elizabeth NP",
        body: "Transfer via Ishasha sector searching for tree-climbing lions. Check in at Park View Safari Lodge. Evening game drive.",
      },
      {
        title: "DAY 6: Chimps & Kazinga boat cruise",
        body: "Morning chimp tracking in Kyambura Gorge or Kalinzu Forest. Afternoon two-hour boat cruise on Kazinga Channel — hippos, crocs, elephants, and rich birdlife. Park View Safari Lodge.",
      },
      {
        title: "DAY 7: Return to Kigali & depart",
        body: "Leisurely breakfast, border formalities, lunch in Kigali, and airport drop-off.",
      },
    ],
    waypoints: [PT.kigali, PT.bwindi, PT.qenp, PT.kigali],
  },
  {
    slug: "uganda-holiday-8-day",
    title: "8-Day Uganda Holiday Tour",
    duration: "8 Days / 7 Nights",
    region: "Uganda",
    highlights: ["Shoebill at Mabamba", "Dual gorilla permits", "Mweya Safari Lodge", "Chimps & boat cruise"],
    included: [
      "All airport transfers",
      "Mabamba shoebill birding & boat",
      "2 gorilla permits (Bwindi)",
      "Chimp permit",
      "4WD open-roof safari car hire & fuel",
      "All park entrance fees",
      "Kazinga Channel boat cruise",
      "Warm lunches on transfer days",
      "Mineral water in vehicle",
      "All meals full board (vegetarian available)",
      "English-speaking driver-guide",
      "7 nights accommodation",
      "Departure airport drop",
    ],
    excluded: ["International flights & visa", "Souvenir shopping", "Tips"],
    intro:
      "A super-luxury Uganda holiday from Entebbe: shoebill birding on Lake Victoria, the Equator, two gorilla treks in Bwindi, tree-climbing lions, chimpanzees, and a sunset boat on the Kazinga Channel — with open-roof 4×4 transport and top-tier lodge accommodation throughout.",
    route: "Entebbe · Mabamba · Bwindi · Queen Elizabeth NP · Entebbe",
    days: [
      {
        title: "DAY 1: Arrive Entebbe",
        body: "Meet and greet at Entebbe Airport. Transfer to Lake Victoria Serena Resort (approx. 30 minutes).",
      },
      {
        title: "DAY 2: Mabamba shoebill & drive to Mbarara",
        body: "Early start for Mabamba shoebill birding by boat. Continue past the Uganda Equator with hot lunch at Equator Coffee Point. Overnight Ingongo Cultural Hotel.",
      },
      {
        title: "DAY 3: Drive to Bwindi",
        body: "Relaxed breakfast, then drive south to Bwindi. Hot lunch en route. Overnight Silverback Safari Lodge.",
      },
      {
        title: "DAY 4: First gorilla trek",
        body: "Early briefing at Buhoma, porter support, full gorilla trekking experience with picnic lunch. Optional afternoon community walk. Silverback Safari Lodge.",
      },
      {
        title: "DAY 5: Second gorilla trek",
        body: "Second trek with a different gorilla family group. Picnic lunch and optional community walk. Silverback Safari Lodge.",
      },
      {
        title: "DAY 6: Queen Elizabeth via Ishasha",
        body: "Leisurely breakfast, drive through Ishasha for tree-climbing lions and birding. Hot lunch at Mweya Safari Lodge. Optional evening game drive. Overnight Mweya Safari Lodge.",
      },
      {
        title: "DAY 7: Chimps & Kazinga channel",
        body: "Light breakfast, chimp tracking in Kalinzu Forest. Afternoon guided boat cruise on Kazinga Channel with birding. Mweya Safari Lodge.",
      },
      {
        title: "DAY 8: Return to Entebbe",
        body: "Relaxed breakfast and scenic drive to Entebbe for your international departure (domestic flight option available from Mweya).",
      },
    ],
    waypoints: [PT.entebbe, PT.mabamba, PT.mbarara, PT.bwindi, PT.qenp, PT.entebbe],
  },
  {
    slug: "zanzibar-extension-4-day",
    title: "4-Day Zanzibar Extension",
    duration: "4 Days / 3 Nights",
    region: "Zanzibar",
    highlights: ["Stone Town UNESCO tour", "Spice farm", "Jozani red colobus", "Mnemba snorkelling"],
    included: [
      "Airport transfers and ground transport",
      "Stone Town city tour",
      "Prison Island boat trip",
      "Jozani Forest & spice tour",
      "Excursion lunches",
      "Mnemba Atoll snorkel & dolphin",
      "Site entry fees",
      "Mineral water during tours",
      "Domestic flight Arusha–Zanzibar",
      "1 night Arusha pre-departure (Olerai Lodge / Mt. Meru Hotel) + airport transfer",
    ],
    excluded: ["Tips", "Beverages at hotel", "Visas", "Personal items"],
    intro:
      "The perfect beach finale after a mainland safari: fly from Arusha to Zanzibar for Stone Town heritage, Prison Island tortoises, spice farms, Jozani Forest's red colobus monkeys, and a full day at Mnemba Atoll — with Essque Zalu Beach Resort and Park Hyatt Stone Town.",
    route: "Arusha · Zanzibar · Stone Town · Mnemba · Departure",
    days: [
      {
        title: "DAY 1: Arusha to Zanzibar & Stone Town",
        body: "Fly to Zanzibar. Meet Aardvark representative at Abeid Amani Karume International Airport. Lunch at Park Hyatt, guided Stone Town tour (House of Wonders, Old Fort, Sultan's Palace, markets). Prison Island boat trip for giant Aldabra tortoises. Overnight Essque Zalu Resort.",
      },
      {
        title: "DAY 2: Spice tour & Jozani Forest",
        body: "Morning spice farm tour — sample fresh cloves, vanilla, and nutmeg. Visit Jozani Forest for rare Zanzibar red colobus monkeys. Sunset stroll on Nungwi Beach. Overnight Essque Zalu Beach Resort.",
      },
      {
        title: "DAY 3: Mnemba Atoll",
        body: "Full-day excursion to Mnemba Island — snorkel vibrant coral reefs among green turtles, snapper, Moorish idols, and more. Return for dinner at Essque Zalu.",
      },
      {
        title: "DAY 4: Departure",
        body: "Breakfast and airport transfer for your flight home. Includes one night in Arusha (Olerai Lodge or Mount Meru Hotel) plus airport transfer before the Zanzibar leg.",
      },
    ],
    waypoints: [PT.arusha, PT.zanzibarStone, PT.zanzibarN],
  },
  {
    slug: "rwanda-gorilla-golden-5-day",
    title: "5-Day Rwanda Gorilla & Golden Monkey Trek",
    duration: "5 Days / 4 Nights",
    region: "Rwanda",
    bestSeason: "June–September & December–February (drier trekking)",
    lodges: [
      "Heaven Boutique Hotel (Kigali, 1 night)",
      "Five Volcanoes Boutique Hotel (Volcanoes NP, 3 nights)",
    ],
    highlights: [
      "Mountain gorilla trek in Volcanoes NP",
      "Golden monkey trekking",
      "Kigali city tour & genocide memorial",
      "Gorilla Guardians Village cultural visit",
      "Evening campfire & local dance at the lodge",
    ],
    included: [
      "Airport meet-and-greet, pick-up and drop-off in Kigali",
      "Accommodation and meals per programme (FB at Volcanoes)",
      "Gorilla trekking permit (Rwanda)",
      "Golden monkey trekking permit",
      "4×4 tourist vehicle and ground transfers",
      "English-speaking driver-guide",
      "Community walk to meet local people",
      "Mineral bottled water per person per day",
    ],
    excluded: [
      "International flights and travel insurance",
      "Rwanda visa (apply online in advance)",
      "Beers, wines, and personal drinks",
      "Tips for driver and lodge staff",
    ],
    intro:
      "A compact Rwanda primate circuit from Kigali to the Virunga volcanoes — one mountain gorilla trek, golden monkeys in bamboo forest, and time in the capital before or after your trek. Ideal as a stand-alone trip or combined with Tanzania or Uganda.",
    route: "Kigali · Volcanoes NP · Kigali",
    days: [
      {
        title: "Day 1: Arrive Kigali",
        body: "Welcome at Kigali International Airport and transfer to your hotel on the city heights overlooking Kigali. Meet-and-greet, dinner, and briefing on the days ahead.",
      },
      {
        title: "Day 2: Kigali city tour · Transfer to Volcanoes NP",
        body: "Morning Kigali city tour — local markets, the Genocide Memorial, and other highlights. Lunch break, then a scenic drive (~3 hours) to Volcanoes National Park. Evening campfire and cultural performance at the lodge as you prepare for trekking.",
      },
      {
        title: "Day 3: Gorilla trekking",
        body: "Early breakfast, then briefing at Kinigi park headquarters. Trek with ranger guides to a habituated mountain gorilla family (typically 1–8 hours on foot; one hour with the gorillas). Return to the lodge, then visit the Gorilla Guardians Village for a cultural experience. Dinner and overnight at Five Volcanoes Boutique Hotel.",
      },
      {
        title: "Day 4: Golden monkey trekking",
        body: "Golden monkey trekking in Volcanoes NP — endangered golden-orange primates in bamboo forest (permit required; usually 2–4 hours including one hour of viewing, less strenuous than gorilla trekking). Afternoon at leisure at the lodge.",
      },
      {
        title: "Day 5: Return to Kigali · Departure",
        body: "Transfer to Kigali for your international departure or onward connection (e.g. Kilimanjaro/Arusha for a Tanzania safari extension).",
      },
    ],
    waypoints: [PT.kigali, PT.volcanoes, PT.kigali],
  },
  {
    slug: "rwanda-double-gorilla-golden-8-day",
    title: "8-Day Rwanda · Double Gorilla Trek & Golden Monkeys",
    duration: "8 Days / 7 Nights",
    region: "Rwanda",
    bestSeason: "June–September & December–February",
    lodges: [
      "Four Points by Sheraton Kigali (3 nights, BB)",
      "Ingagi Park View Lodge (4 nights, FB)",
    ],
    highlights: [
      "Two separate mountain gorilla treks (different families)",
      "Golden monkey trekking",
      "Kigali city tour, museum & King's Palace",
      "Gorilla Guardians Village",
      "Jet-lag recovery days in Kigali",
    ],
    included: [
      "All airport pick-ups and transfers",
      "3 nights in Kigali (bed & breakfast) including city tour on Day 3",
      "4 nights at Volcanoes NP (full board)",
      "Two gorilla trekking permits",
      "Golden monkey trekking permit",
      "4×4 transport and English-speaking guide",
      "Community walk",
      "Mineral water daily",
    ],
    excluded: [
      "International flights and travel insurance",
      "Beers, wines, and tips",
    ],
    intro:
      "The classic Rwanda gorilla immersion — time in Kigali to acclimatise, then four nights at Volcanoes National Park for two gorilla treks (different trails/families), golden monkeys, and cultural encounters in the Land of a Thousand Hills.",
    route: "Kigali · Volcanoes NP · Kigali",
    days: [
      {
        title: "Day 1: Arrive Kigali",
        body: "Arrive at Kigali International Airport (any time). Meet your driver at the arrivals hall, transfer to the hotel near the airport for refreshments, dinner, and a full briefing on the programme.",
      },
      {
        title: "Day 2: Rest day in Kigali",
        body: "A relaxed day to recover from travel — spa, swimming pool, and leisure time at the hotel before heading to the mountains.",
      },
      {
        title: "Day 3: Kigali city tour",
        body: "Kigali city tour including the museum, King's Palace, and local markets — experience everyday life in Rwanda's capital. Overnight Kigali.",
      },
      {
        title: "Day 4: Transfer to Volcanoes National Park",
        body: "Morning city sights if missed, then lunch and a ~3-hour drive to Volcanoes NP. Arrive for dinner and overnight at the lodge; campfire and cultural welcome dance.",
      },
      {
        title: "Day 5: First gorilla trek",
        body: "Early transfer to Kinigi for briefing, then trek to your first habituated gorilla family with ranger guides (1–8 hours hiking; one hour with the gorillas). Visit Gorilla Guardians Village, then return to the lodge.",
      },
      {
        title: "Day 6: Second gorilla trek",
        body: "Second briefing and trek to a different gorilla family — same routines, new trail and new group. Return to the lodge for dinner and overnight.",
      },
      {
        title: "Day 7: Golden monkey trekking",
        body: "Golden monkey trekking in Volcanoes NP, then leisure time at the lodge.",
      },
      {
        title: "Day 8: Depart via Kigali",
        body: "Transfer to Kigali for a farewell lunch or dinner in the city, then airport drop-off for your flight home or regional connection.",
      },
    ],
    waypoints: [PT.kigali, PT.volcanoes, PT.kigali],
  },
  {
    slug: "rwanda-nyungwe-double-gorilla-golden-10-day",
    title: "10-Day Rwanda · Nyungwe Chimps, Double Gorilla & Golden Monkeys",
    duration: "10 Days / 9 Nights",
    region: "Rwanda",
    bestSeason: "Year-round; drier months best for trekking",
    lodges: [
      "Marriott Kigali (3 nights, BB)",
      "Nyungwe Top View Hotel (2 nights, FB)",
      "Tiloreza Volcanoes Eco Lodge (4 nights)",
    ],
    highlights: [
      "Chimpanzee tracking & canopy walk at Nyungwe",
      "Two mountain gorilla treks in Volcanoes NP",
      "Golden monkey trekking",
      "Kigali cultural tour",
      "Tea plantations & terraced hills en route",
    ],
    included: [
      "Airport pick-up and final drop-off",
      "3 nights Kigali (BB) with city tour",
      "Nyungwe Forest NP fees and chimp tracking",
      "Two gorilla trekking permits",
      "Golden monkey permit",
      "4 nights Volcanoes area accommodation",
      "4×4 vehicle, driver-guide, community walk",
      "Mineral water daily",
    ],
    excluded: [
      "International flights, visa, insurance",
      "Personal drinks and tips",
    ],
    intro:
      "Rwanda's complete primate journey — Kigali at leisure, chimpanzees and canopy forest at Nyungwe, then Volcanoes National Park for two gorilla treks and golden monkeys among the Virunga volcanoes.",
    route: "Kigali · Nyungwe · Volcanoes NP · Kigali",
    days: [
      {
        title: "Day 1: Arrive Kigali",
        body: "Arrive at Kigali International Airport. Meet your driver, transfer to the hotel for dinner and a full programme briefing.",
      },
      {
        title: "Day 2: Rest in Kigali",
        body: "Recovery day at the hotel — spa, pool, and rest after your international flight.",
      },
      {
        title: "Day 3: Kigali city tour",
        body: "City tour — museum, King's Palace, markets, and insight into Rwandan culture and history.",
      },
      {
        title: "Day 4: Drive to Nyungwe Forest",
        body: "Scenic transfer through terraced hills and tea plantations to Nyungwe Forest National Park. Check in at Nyungwe Top View Hotel.",
      },
      {
        title: "Day 5: Chimp tracking & canopy walk",
        body: "Morning chimpanzee tracking from park headquarters, then an afternoon nature walk on the canopy trail through the forest.",
      },
      {
        title: "Day 6: Transfer to Volcanoes NP",
        body: "After breakfast, drive to Volcanoes National Park (~3 hours). Evening at Tiloreza Volcanoes Eco Lodge with campfire and cultural welcome.",
      },
      {
        title: "Day 7: First gorilla trek",
        body: "Briefing at Kinigi, then trek to your first gorilla family (1–6+ hours). Overnight at the lodge.",
      },
      {
        title: "Day 8: Second gorilla trek",
        body: "Second trek to a different gorilla family — new trail, new group, same unforgettable hour with the mountain gorillas.",
      },
      {
        title: "Day 9: Golden monkey trekking",
        body: "Golden monkey trek in Volcanoes NP, then relax at the lodge.",
      },
      {
        title: "Day 10: Depart Kigali",
        body: "Transfer to Kigali for lunch or dinner in the city, then airport drop-off.",
      },
    ],
    waypoints: [PT.kigali, PT.nyungwe, PT.volcanoes, PT.kigali],
  },
];

export const getSafari = (slug: string) => safaris.find(s => s.slug === slug);
