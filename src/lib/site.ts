export const phone = {
  display: "0951 487 087",
  href: "tel:+421951487087",
} as const;

export const social = {
  facebook: {
    href: "https://www.facebook.com/profile.php?id=100089064138109",
    name: "ProfiDepo na Facebooku",
    label: "Facebook",
  },
  instagram: {
    href: "https://www.instagram.com/profidepo/",
    name: "ProfiDepo na Instagrame",
    label: "Instagram",
  },
} as const;

export const contactPerson = "Pavol Brček";

export const contactEmail = "bytove@gmail.com";

export function contactMailto(): string | null {
  const email = contactEmail.trim();
  return email ? `mailto:${email}` : null;
}

export const nav = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "/cennik", label: "Cenník" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const services = [
  {
    title: "Rekonštrukcie bytov a domov",
    text: "Kompletné aj čiastočné premeny vášho bývania.",
    src: "/photos/sluzby/01-rekonstrukcie-bytov.webp",
    width: 1400,
    height: 846,
    alt: "Béžová kuchyňa so vstavanými rúrami a drevenou stenou s televízorom.",
    position: "center center",
    icon: "house",
    href: "/sluzby/rekonstrukcie-bytov-a-domov",
  },
  {
    title: "Kúpeľne a bytové jadrá",
    text: "Rozvody, obklady a sanita v jednom celku.",
    src: "/photos/sluzby/02-kupelne.webp",
    width: 1254,
    height: 1254,
    alt: "Biela kúpeľňa s okrúhlym podsvieteným zrkadlom, čiernou batériou a umývadlom na doske.",
    position: "center 45%",
    icon: "shower",
    href: "/sluzby/kupelne-a-bytove-jadra",
  },
  {
    title: "Renovácie chalúp",
    text: "Tradičný charakter a pohodlie na každý deň.",
    src: "/photos/sluzby/03-chalupy-ilustracna.webp",
    width: 1400,
    height: 1050,
    alt: "Jedáleň v chalúpke s dreveným stolom, zeleným oknom a kachľovou pecou.",
    position: "center 42%",
    icon: "cottage",
    href: "/sluzby/renovacie-chalup",
  },
  {
    title: "Obklady, dlažby a podlahy",
    text: "Príprava podkladu a precízna pokládka.",
    src: "/photos/sluzby/04-dlazby-ilustracna.webp",
    width: 1400,
    height: 1050,
    alt: "Ruky v rukaviciach ukladajú veľkú sivú dlaždicu do lepidla.",
    position: "center 62%",
    icon: "layers",
    href: "/sluzby/obklady-dlazby-a-podlahy",
  },
  {
    title: "Murárske a dokončovacie práce",
    text: "Omietky, stierky, maľovanie a sadrokartón.",
    src: "/photos/sluzby/05-murarske-prace-ilustracna.webp",
    width: 1400,
    height: 1050,
    alt: "Ruka s hladidlom nanáša béžovú omietku na stenu.",
    position: "42% center",
    icon: "trowel",
    href: "/sluzby/murarske-a-dokoncovacie-prace",
  },
  {
    title: "Elektroinštalácie a vodoinštalácie",
    text: "Nové rozvody vody, odpadu a elektriny.",
    src: "/photos/sluzby/06-rozvody-ilustracna.webp",
    width: 1400,
    height: 1050,
    alt: "Ruky v rukaviciach uťahujú kľúčom biele a mosadzné vodovodné rozvody.",
    position: "center center",
    icon: "utilities",
    href: "/sluzby/elektroinstalacie-a-vodoinstalacie",
  },
] as const;

export const photos = [
  {
    src: "/photos/obyvacka.png",
    caption: "Obývačka",
    alt: "Obývačka s krbom, dreveným stolom a pohovkou",
    position: "center 62%",
  },
  {
    src: "/photos/kuchyna.png",
    caption: "Kuchyňa",
    alt: "Kuchyňa s jedálenským stolom, žltými stoličkami a bielou linkou",
    position: "center 40%",
  },
  {
    src: "/photos/kupelna-led.png",
    caption: "Kúpeľňa",
    alt: "Kúpeľňa s okrúhlym podsvieteným zrkadlom a umývadlom",
    position: "center 48%",
  },
  {
    src: "/photos/kupelna-seda.png",
    caption: "Kúpeľňa",
    alt: "Kúpeľňa so sivobielym obkladom, vaňou a umývadlom",
    position: "center center",
  },
] as const;

/** Milliseconds from one transition start to the next. */
export const SLIDE_VISIBLE_MS = 4000;
/** Crossfade length. It overlaps the start of the next interval. */
export const SLIDE_FADE_MS = 500;
