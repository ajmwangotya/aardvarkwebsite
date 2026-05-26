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
  fromPrice?: string;
  priceNote?: string;
  bestSeason?: string;
  included?: string[];
  excluded?: string[];
  region?: "Tanzania" | "Uganda" | "Zanzibar";
};

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
  // Uganda
  kigali: { name: "Kigali", lat: -1.9441, lng: 30.0619 },
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
    "bestSeason": "Jul–Oct for Mara River crossings; Jan–Mar for southern calving",
    "fromPrice": "From USD 8,500 pp",
    "priceNote": "Sharing basis, luxury camps, season-dependent — request a detailed quote.",
    "included": ["Private 4×4 and professional guide", "Park and conservation fees", "Accommodation and meals per itinerary", "Airport transfers in Tanzania"],
    "excluded": ["International flights", "Visas and vaccinations", "Travel insurance", "Tips and personal expenses", "Optional balloon safari"],
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
    "intro": "The northern part of Tanzania is renowned for its stunning landscapes and rich wildlife experiences. This region encompasses several world-famous parks and conservation areas. Here are some luxurious sample itineraries focused on the northern circuit, combining iconic destinations with high-end accommodations and exclusive experiences.",
    "route": "Victoria Falls · Chobe · Hwange · Okavango Delta",
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
    "title": "Northern Circuit Route",
    "duration": "10 Days / 9 Nights",
    "intro": "Mount Kilimanjaro is an iconic landmark in Tanzania and Africa’s highest mountain, rising approximately 5,895 meters (19,341 feet) above sea level. It’s known as a “freestanding” mountain due to its isolated prominence, unlike most mountains, which are part of larger ranges. Here’s an overview of the mountain and what makes it unique:",
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
    "duration": "",
    "intro": "",
    "route": "Ngorongoro · Serengeti",
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
    "duration": "",
    "intro": "",
    "route": "Tarangire · Ngorongoro",
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
    "duration": "",
    "intro": "",
    "route": "One-day descent into the Crater",
    "days": [
      {
        "title": "DAY 1:Karibu! Safari begins!",
        "body": "A representative from Aardvark Safaris Tanzania will meet and greet you as soon as you arrive at Kilimanjaro International Airport and take you to the Mt. Meru Hotel, for your overnight. Arusha, nestled in the shadow of majestic Mount Meru, is a dynamic, fast- growing town and a famed embarkation point for Tanzania safaris. Because of its altitude (roughly 4,600 feet above sea level), Arusha is blessed with a pleasant climate, perfect for the coffee plantations that surround it."
      }
    ],
    "waypoints": [PT.arusha, PT.ngorongoro]
  },
  {
    "slug": "serengeti-southern-migration-zanzibar",
    "title": "Serengeti Southern Migration & Zanzibar Beach Holiday",
    "duration": "8 Days + Optional Zanzibar Extension",
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
    "waypoints": [PT.arusha, PT.serengetiS, PT.serengetiC, PT.nyerere, PT.zanzibarStone]
  },
  {
    "slug": "mkomazi-extension",
    "title": "Mkomazi National Park Extension",
    "duration": "4 Days / 3 Nights",
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
    fromPrice: "USD 9,067",
    priceNote: "Per person · land safari only (excludes international flights)",
    highlights: ["Great Migration focus", "Tarangire night drive", "Ngorongoro Crater", "Expert naturalist guiding"],
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
    fromPrice: "USD 4,500",
    priceNote: "From per person (dual gorilla trek option) · Kigali start",
    highlights: ["Two gorilla treks", "Chimp tracking", "Tree-climbing lions", "Batwa community"],
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
    fromPrice: "USD 6,250",
    priceNote: "Per person (2 travellers) · super-luxury lodges, meals inclusive",
    highlights: ["Shoebill at Mabamba", "Dual gorilla permits", "Mweya Safari Lodge", "Chimps & boat cruise"],
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
    fromPrice: "USD 3,255",
    priceNote: "Per person · includes domestic flight Arusha–Zanzibar",
    highlights: ["Stone Town UNESCO tour", "Spice farm", "Jozani red colobus", "Mnemba snorkelling"],
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
];

export const getSafari = (slug: string) => safaris.find(s => s.slug === slug);
