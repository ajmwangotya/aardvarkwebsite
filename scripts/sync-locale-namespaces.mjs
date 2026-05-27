/**
 * Merges critical namespaces from en.json into de/fr/es/it when missing.
 * Run: node scripts/sync-locale-namespaces.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const localesDir = join(root, "src", "locales");

const NAMESPACES_FROM_EN = [
  "video",
  "officeHours",
  "forms",
  "cookie",
  "whatsapp",
  "mobileCta",
  "trust",
  "booking",
  "faq",
  "migration",
  "safariDetail",
  "featuredJourneys",
  "guestNotes",
  "packagesPage",
  "notFound",
  "featuredPackages",
  "safarisContent",
  "countryPages",
  "legal",
];

const HOME_PARTIAL_KEYS = ["trustJourneys", "destAlt", "signatureDestinations", "servicesQuote", "schedule"];

const ABOUT_PARTIAL_KEYS = [
  "conservationEyebrow",
  "conservationTitle",
  "conservationIntro",
  "conservationProjects",
];

const ITINERARIES_PARTIAL_KEYS = [
  "extensionsEyebrow",
  "extensionsTitle",
  "extensionsDesc",
  "extensionsCta",
  "extensions",
];

/** Localized copy for profile-v11 sections (overrides English fallbacks). */
const LOCALE_OVERRIDES = {
  fr: {
    home: {
      servicesQuote:
        "Nos services sont non seulement totalement fiables et sûrs, mais aussi personnalisés selon vos besoins et préférences. Avec nous, vous pouvez planifier vos vacances en toute confiance.",
      schedule: [
        { time: "05:30", title: "Safari matinal", body: "Thé, café et collations avant le petit-déjeuner, tandis que le soleil se lève sur la savane." },
        { time: "09:00", title: "Petit-déjeuner en brousse", body: "Un copieux petit-déjeuner à l'anglaise ou un charmant pique-nique à l'ombre des acacias." },
        {
          time: "12:00",
          title: "Explorer les paysages tanzaniens",
          body: "Peter Matthiessen écrivait que « tout le paysage semble en alerte ». Chaque observation — du guépard majestueux à la harde d'éléphants — transforme le paysage en une entité vivante.",
        },
        { time: "16:30", title: "Sundowners & coucher de soleil", body: "Un safari de l'après-midi dans la lumière dorée du crépuscule." },
        {
          time: "20:00",
          title: "Feu de camp & repos",
          body: "Après le dîner au camp, nous nous réunissons autour du feu. Au matin, nous partageons l'avis d'Elspeth Huxley : aucun sommeil n'est si parfait que celui troublé — mais non brisé — par le rugissement d'un lion.",
        },
      ],
    },
    about: {
      conservationEyebrow: "Conservation & Communauté",
      conservationTitle: "Voyager en <i>donnant</i>",
      conservationIntro:
        "Aardvark Safaris a été fondé sur la conviction que le tourisme de nature est essentiel à la préservation de la faune et du patrimoine culturel de la Tanzanie. Nous sommes fiers de soutenir les communautés et la conservation à travers l'Afrique de l'Est.",
      conservationProjects: [
        {
          title: "St Lucia Hospice & Orphanage",
          desc: "Fondé par Winfrida Mwangotya (épouse d'Augustine) — soutient les victimes du VIH/SIDA et les orphelins à Arusha. Les voyageurs du circuit nord classique peuvent organiser une visite optionnelle.",
        },
        {
          title: "Projet communautaire Batwa (Ouganda)",
          desc: "À Bwindi, les voyageurs passent du temps avec la communauté pygmée Batwa via le projet de Luke et la fondation Joseph's Hope — préservation culturelle autochtone.",
        },
        {
          title: "Conservation des gorilles",
          desc: "Chaque permis de trekking finance directement la conservation des gorilles de montagne. Les voyageurs Aardvark contribuent à l'une des plus grandes réussites de la conservation.",
        },
        {
          title: "Conservation communautaire",
          desc: "La thèse de Master d'Augustine (Prescott College) portait sur la conservation communautaire dans les villages des corridors fauniques près de Tarangire — recherche qui guide notre approche responsable.",
        },
      ],
    },
    itinerariesPage: {
      extensionsEyebrow: "Extensions safari",
      extensionsTitle: "Prolongez votre <i>voyage</i>",
      extensionsDesc:
        "Ajoutez ces extensions optionnelles à tout itinéraire du nord de la Tanzanie — lycaons et rhinos de Mkomazi, primates en Ouganda, ou la côte aux épices de Zanzibar.",
      extensionsCta: "Voir l'extension",
      extensions: [
        {
          slug: "mkomazi-extension",
          title: "Parc national de Mkomazi",
          duration: "3 jours / 2 nuits",
          desc: "L'un des parcs les moins visités de Tanzanie — lycaons, rhinos, gerenuk, koudous et wilderness loin de la foule du Serengeti.",
        },
        {
          slug: "uganda-extension",
          title: "Ouganda — Gorilles & Chimpanzés",
          duration: "6 jours / 5 nuits",
          desc: "Gorilles de montagne à Bwindi, shoebill à Mabamba Bay, chimpanzés à Kyambura Gorge et lions grimpeurs à Queen Elizabeth NP.",
        },
        {
          slug: "zanzibar-extension-4-day",
          title: "Extension plage Zanzibar",
          duration: "4 jours / 3 nuits",
          desc: "Patrimoine UNESCO de Stone Town, plantations d'épices, colobes rouges de Jozani et snorkelling à Mnemba — la finale parfaite après un safari.",
        },
      ],
    },
    safariDetail: { lodges: "Lodges & camps" },
  },
  de: {
    home: {
      servicesQuote:
        "Unsere Leistungen sind nicht nur vollständig zuverlässig und sicher, sondern auch auf Ihre Bedürfnisse und Vorlieben zugeschnitten. Mit uns können Sie Ihren Urlaub voller Vertrauen planen.",
      schedule: [
        { time: "05:30", title: "Frühmorgendliche Pirschfahrt", body: "Tee, Kaffee und Snacks vor dem Frühstück, während die Sonne über der Savanne aufgeht." },
        { time: "09:00", title: "Frühstück in der Bush", body: "Ein herzhaftes englisches Frühstück oder ein Picknick im Schatten der Akazien." },
        {
          time: "12:00",
          title: "Tansanias Landschaften erkunden",
          body: "Peter Matthiessen schrieb, dass „ganze Landschaften wach erscheinen“. Jede Beobachtung — vom majestätischen Geparden bis zur Elefantenherde — verwandelt die Landschaft in ein lebendiges Erlebnis.",
        },
        { time: "16:30", title: "Sundowner & Sonnenuntergang", body: "Eine Nachmittagspirschfahrt in die goldene Abendstunde." },
        {
          time: "20:00",
          title: "Lagerfeuer & Ruhe",
          body: "Nach dem Abendessen am Camp versammeln wir uns am Feuer. Am Morgen stimmen wir Elspeth Huxley zu: Kein Schlaf ist so perfekt wie der, der — aber nicht gebrochen — vom Brüllen eines Löwen durchzogen wird.",
        },
      ],
    },
    about: {
      conservationEyebrow: "Naturschutz & Gemeinschaft",
      conservationTitle: "Reisen mit <i>Wirkung</i>",
      conservationIntro:
        "Aardvark Safaris wurde auf der Überzeugung gegründet, dass naturnaher Tourismus für den Erhalt der Tierwelt und des kulturellen Erbes Tansanias unerlässlich ist. Wir unterstützen Gemeinschaften und Naturschutz in ganz Ostafrika.",
      conservationProjects: [
        {
          title: "St Lucia Hospice & Orphanage",
          desc: "Gegründet von Winfrida Mwangotya (Augustines Ehefrau) — unterstützt HIV/AIDS-Opfer und Waisen in Arusha. Gäste der Classic Northern Circuit können optional einen Besuch vereinbaren.",
        },
        {
          title: "Batwa Community Project (Uganda)",
          desc: "In Bwindi verbringen Gäste Zeit mit der Batwa-Pygmäen-Gemeinschaft über Lukes Batwa Project und Joseph's Hope Foundation.",
        },
        {
          title: "Gorilla-Schutz",
          desc: "Jede Gorilla-Trekking-Genehmigung finanziert direkt den Schutz der Berggorillas. Aardvark-Gäste tragen zu einer der größten Naturschutz-Erfolgsgeschichten bei.",
        },
        {
          title: "Gemeinschaftsbasierter Naturschutz",
          desc: "Augustines Masterarbeit (Prescott College) behandelte gemeinschaftsbasierten Naturschutz in Wildlife-Korridor-Dörfern nahe Tarangire — Forschung, die unseren verantwortungsvollen Ansatz prägt.",
        },
      ],
    },
    itinerariesPage: {
      extensionsEyebrow: "Safari-Erweiterungen",
      extensionsTitle: "Verlängern Sie Ihre <i>Reise</i>",
      extensionsDesc:
        "Fügen Sie diese optionalen Erweiterungen zu jeder Nordtansania-Route hinzu — Mkomazis Wildhunde und Nashörner, Ugandas Primaten oder Sansibars Gewürzküste.",
      extensionsCta: "Erweiterung ansehen",
      extensions: [
        {
          slug: "mkomazi-extension",
          title: "Mkomazi Nationalpark",
          duration: "3 Tage / 2 Nächte",
          desc: "Einer der am wenigsten besuchten Parks Tansanias — Wildhunde, Nashörner, Gerenuk und offene Wildnis abseits der Serengeti-Massen.",
        },
        {
          slug: "uganda-extension",
          title: "Uganda — Gorillas & Schimpansen",
          duration: "6 Tage / 5 Nächte",
          desc: "Berggorillas in Bwindi, Shoebill in Mabamba Bay, Schimpansen in Kyambura Gorge und baumkletternde Löwen in Queen Elizabeth NP.",
        },
        {
          slug: "zanzibar-extension-4-day",
          title: "Sansibar Strandurlaub",
          duration: "4 Tage / 3 Nächte",
          desc: "Stone Town UNESCO, Gewürzfarmen, Jozani-Rotkolobus und Schnorcheln an Mnemba — das perfekte Safari-Finale.",
        },
      ],
    },
    safariDetail: { lodges: "Lodges & Camps" },
  },
  es: {
    home: {
      servicesQuote:
        "Nuestros servicios no solo son completamente fiables y seguros, sino también personalizados según sus necesidades y preferencias. Con nosotros puede planificar sus vacaciones con confianza.",
      schedule: [
        { time: "05:30", title: "Safari al amanecer", body: "Té, café y aperitivos antes del desayuno mientras el sol se eleva sobre la sabana." },
        { time: "09:00", title: "Desayuno en la búsqueda", body: "Un abundante desayuno inglés o un picnic a la sombra de las acacias." },
        {
          time: "12:00",
          title: "Explorando los paisajes de Tanzania",
          body: "Peter Matthiessen escribió que «todos los paisajes parecen alerta». Cada avistamiento — de un guepardo majestuoso a una manada de elefantes — transforma el paisaje en una entidad viva.",
        },
        { time: "16:30", title: "Sundowners y atardecer", body: "Un safari vespertino hacia la serena hora dorada." },
        {
          time: "20:00",
          title: "Fogata y descanso",
          body: "Tras la cena en el campamento, nos reunimos junto al fuego. Por la mañana coincidimos con Elspeth Huxley: no hay sueño tan perfecto como el agitado — pero no roto — por el rugido de un león.",
        },
      ],
    },
    about: {
      conservationEyebrow: "Conservación y Comunidad",
      conservationTitle: "Viajar que <i>devuelve</i>",
      conservationIntro:
        "Aardvark Safaris se fundó con la convicción de que el turismo basado en la naturaleza es esencial para preservar la vida silvestre y el patrimonio cultural de Tanzania. Apoyamos comunidades y conservación en África Oriental.",
      conservationProjects: [
        {
          title: "St Lucia Hospice & Orphanage",
          desc: "Fundado por Winfrida Mwangotya (esposa de Augustine) — apoya a víctimas del VIH/SIDA y huérfanos en Arusha. Los huéspedes del Classic Northern Circuit pueden organizar una visita opcional.",
        },
        {
          title: "Proyecto comunitario Batwa (Uganda)",
          desc: "En Bwindi, los huéspedes pasan tiempo con la comunidad pigmea Batwa a través del proyecto de Luke y la fundación Joseph's Hope.",
        },
        {
          title: "Conservación de gorilas",
          desc: "Cada permiso de trekking financia directamente la conservación del gorila de montaña. Los huéspedes de Aardvark contribuyen a una de las mayores historias de éxito de la conservación.",
        },
        {
          title: "Conservación comunitaria",
          desc: "La tesis de maestría de Augustine (Prescott College) se centró en la conservación comunitaria en aldeas de corredores faunísticos cerca de Tarangire.",
        },
      ],
    },
    itinerariesPage: {
      extensionsEyebrow: "Extensiones de safari",
      extensionsTitle: "Amplíe su <i>viaje</i>",
      extensionsDesc:
        "Añada estas extensiones opcionales a cualquier itinerario del norte de Tanzania — perros salvajes y rinocerontes en Mkomazi, primates en Uganda o la costa especiada de Zanzíbar.",
      extensionsCta: "Ver extensión",
      extensions: [
        {
          slug: "mkomazi-extension",
          title: "Parque Nacional Mkomazi",
          duration: "3 días / 2 noches",
          desc: "Uno de los parques menos visitados de Tanzania — perros salvajes, rinocerontes, gerenuk y naturaleza abierta lejos de las multitudes del Serengeti.",
        },
        {
          slug: "uganda-extension",
          title: "Uganda — Gorilas y chimpancés",
          duration: "6 días / 5 noches",
          desc: "Gorilas de montaña en Bwindi, shoebill en Mabamba Bay, chimpancés en Kyambura Gorge y leones trepadores en Queen Elizabeth NP.",
        },
        {
          slug: "zanzibar-extension-4-day",
          title: "Extensión playa Zanzíbar",
          duration: "4 días / 3 noches",
          desc: "Patrimonio UNESCO de Stone Town, fincas de especias, colobos rojos de Jozani y snorkel en Mnemba — el final perfecto tras un safari.",
        },
      ],
    },
    safariDetail: { lodges: "Lodges y campamentos" },
  },
  it: {
    home: {
      servicesQuote:
        "I nostri servizi non sono solo completamente affidabili e sicuri, ma anche personalizzati in base alle vostre esigenze e preferenze. Con noi potete pianificare la vostra vacanza con fiducia.",
      schedule: [
        { time: "05:30", title: "Safari all'alba", body: "Tè, caffè e spuntini pre-colazione mentre il sole sorge sulla savana." },
        { time: "09:00", title: "Colazione in bush", body: "Una sostanziosa colazione all'inglese o un picnic all'ombra delle acacie." },
        {
          time: "12:00",
          title: "Esplorare i paesaggi tanzaniani",
          body: "Peter Matthiessen scriveva che «interi paesaggi sembrano vigili». Ogni avvistamento — da un ghepardo maestoso a una mandria di elefanti — trasforma il paesaggio in un'entità viva.",
        },
        { time: "16:30", title: "Sundowner e tramonto", body: "Un safari pomeridiano verso la serena golden hour." },
        {
          time: "20:00",
          title: "Falò e riposo",
          body: "Dopo la cena al campo, ci riuniamo intorno al fuoco. Al mattino concordiamo con Elspeth Huxley: non c'è sonno così perfetto come quello scosso — ma non spezzato — dal ruggito di un leone.",
        },
      ],
    },
    about: {
      conservationEyebrow: "Conservazione e Comunità",
      conservationTitle: "Viaggiare dando <i>valore</i>",
      conservationIntro:
        "Aardvark Safaris è nato dalla convinzione che il turismo naturalistico sia essenziale per preservare la fauna e il patrimonio culturale della Tanzania. Sosteniamo comunità e conservazione in tutta l'Africa orientale.",
      conservationProjects: [
        {
          title: "St Lucia Hospice & Orphanage",
          desc: "Fondato da Winfrida Mwangotya (moglie di Augustine) — sostiene vittime di HIV/AIDS e orfani ad Arusha. Gli ospiti del Classic Northern Circuit possono organizzare una visita opzionale.",
        },
        {
          title: "Progetto comunitario Batwa (Uganda)",
          desc: "A Bwindi, gli ospiti trascorrono tempo con la comunità pigmea Batwa attraverso il progetto di Luke e la fondazione Joseph's Hope.",
        },
        {
          title: "Conservazione dei gorilla",
          desc: "Ogni permesso di trekking finanzia direttamente la conservazione del gorilla di montagna. Gli ospiti Aardvark contribuiscono a una delle più grandi storie di successo della conservazione.",
        },
        {
          title: "Conservazione comunitaria",
          desc: "La tesi di master di Augustine (Prescott College) riguardava la conservazione comunitaria nei villaggi dei corridoi faunistici vicino a Tarangire.",
        },
      ],
    },
    itinerariesPage: {
      extensionsEyebrow: "Estensioni safari",
      extensionsTitle: "Prolungate il vostro <i>viaggio</i>",
      extensionsDesc:
        "Aggiungete queste estensioni opzionali a qualsiasi itinerario del nord Tanzania — licani e rinoceronti a Mkomazi, primati in Uganda o la costa delle spezie a Zanzibar.",
      extensionsCta: "Vedi estensione",
      extensions: [
        {
          slug: "mkomazi-extension",
          title: "Parco Nazionale Mkomazi",
          duration: "3 giorni / 2 notti",
          desc: "Uno dei parchi meno visitati della Tanzania — licani, rinoceronti, gerenuk e wilderness lontano dalla folla del Serengeti.",
        },
        {
          slug: "uganda-extension",
          title: "Uganda — Gorilla e scimpanzé",
          duration: "6 giorni / 5 notti",
          desc: "Gorilla di montagna a Bwindi, shoebill a Mabamba Bay, scimpanzé a Kyambura Gorge e leoni arboricoli a Queen Elizabeth NP.",
        },
        {
          slug: "zanzibar-extension-4-day",
          title: "Estensione spiaggia Zanzibar",
          duration: "4 giorni / 3 notti",
          desc: "Patrimonio UNESCO di Stone Town, piantagioni di spezie, colobo rossi di Jozani e snorkeling a Mnemba — il finale perfetto dopo un safari.",
        },
      ],
    },
    safariDetail: { lodges: "Lodge e campi" },
  },
};

function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = deepMerge({ ...(target[key] ?? {}) }, value);
    } else {
      target[key] = value;
    }
  }
  return target;
}

const en = JSON.parse(readFileSync(join(localesDir, "en.json"), "utf8"));

for (const lang of ["de", "fr", "es", "it"]) {
  const path = join(localesDir, `${lang}.json`);
  const locale = JSON.parse(readFileSync(path, "utf8"));

  for (const ns of NAMESPACES_FROM_EN) {
    if (en[ns] !== undefined) {
      locale[ns] = en[ns];
    }
  }

  if (en.reviews?.items && locale.reviews) {
    locale.reviews.items = en.reviews.items;
    locale.reviews.subdesc = en.reviews.subdesc;
    locale.reviews.basedOn = en.reviews.basedOn;
    locale.reviews.ranking = en.reviews.ranking;
    delete locale.reviews.travellersChoice;
  }

  if (locale.home) {
    for (const key of HOME_PARTIAL_KEYS) {
      if (en.home?.[key]) locale.home[key] = en.home[key];
    }
  }

  if (locale.about) {
    for (const key of ABOUT_PARTIAL_KEYS) {
      if (en.about?.[key]) locale.about[key] = en.about[key];
    }
  }

  locale.itinerariesPage = locale.itinerariesPage ?? {};
  for (const key of ITINERARIES_PARTIAL_KEYS) {
    if (en.itinerariesPage?.[key]) locale.itinerariesPage[key] = en.itinerariesPage[key];
  }

  if (locale.footer && en.footer) {
    for (const key of ["camps", "newsletterDone", "newsletterError", "regionAfrica", "regionNA", "taLine"]) {
      if (en.footer[key]) locale.footer[key] = en.footer[key];
    }
  }
  if (en.destPage) {
    locale.destPage = {
      ...(locale.destPage ?? {}),
      countries: en.destPage.countries,
      countriesEyebrow: en.destPage.countriesEyebrow,
      countriesTitle: en.destPage.countriesTitle,
      circuits: en.destPage.circuits,
      circuitsEyebrow: en.destPage.circuitsEyebrow,
      circuitsTitle: en.destPage.circuitsTitle,
      circuitsDesc: en.destPage.circuitsDesc,
      circuitsViewPackages: en.destPage.circuitsViewPackages,
      circuitsPlanTrip: en.destPage.circuitsPlanTrip,
      parksTitle: en.destPage.parksTitle,
      featuredParksEyebrow: en.destPage.featuredParksEyebrow,
      featuredParksTitle: en.destPage.featuredParksTitle,
      featuredParks: en.destPage.featuredParks,
      groups: en.destPage.groups,
    };
  }

  if (en.itinerariesPage?.extra) {
    locale.itinerariesPage.extra = en.itinerariesPage.extra;
  }

  if (locale.nav && en.nav?.faq) {
    locale.nav.faq = locale.nav.faq ?? en.nav.faq;
  }

  if (LOCALE_OVERRIDES[lang]) {
    deepMerge(locale, LOCALE_OVERRIDES[lang]);
  }

  writeFileSync(path, `${JSON.stringify(locale, null, 2)}\n`, "utf8");
  console.log(`Updated ${lang}.json`);
}

console.log("Done.");
