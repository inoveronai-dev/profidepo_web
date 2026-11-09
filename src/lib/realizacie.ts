export type RealizaciaShot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Thumbnail crop anchor. The lightbox still shows the whole file. */
  focus?: string;
};

/** Thumbnail frame: wide photos become 4:3, portraits stop at 3:4, the rest stay natural. */
export function thumbShape(shot: { width: number; height: number }) {
  const ratio = shot.width / shot.height;
  if (ratio > 4 / 3) return { width: 4, height: 3 };
  if (ratio < 3 / 4) return { width: 3, height: 4 };
  return { width: shot.width, height: shot.height };
}

/** First eight stay visible. The rest appear after “Zobraziť ďalšie fotografie”. */
export const REALIZACIE_PREVIEW = 8;

/**
 * Homepage “Naše realizácie”. Source mapping lives in
 * public/photos/realizacie/manifest.json. The first eight follow the
 * requested frames. The later nine keep similar basin details apart.
 */
export const realizacieShots: readonly RealizaciaShot[] = [
  {
    src: "/photos/realizacie/01-obyvacka-seda-pohovka.png",
    width: 1448,
    height: 1086,
    alt: "Obývačka so sivou sedačkou, dreveným stolom a televízorom na nízkej skrinke.",
  },
  {
    src: "/photos/realizacie/02-kuchyna-bezova-laty.png",
    width: 1774,
    height: 887,
    alt: "Béžová kuchyňa s vstavanými rúrami a drevenou latkovou stenou s televízorom.",
    focus: "46% center",
  },
  {
    src: "/photos/realizacie/03-umyvadlo-led-zrkadlo.png",
    width: 1254,
    height: 1254,
    alt: "Biele umývadlo na tmavej doske, čierna batéria a okrúhle zrkadlo s osvetlením.",
  },
  {
    src: "/photos/realizacie/04-chodba-biela-ulozisko.png",
    width: 1672,
    height: 941,
    alt: "Široká chodba s bielym úložným priestorom, rastlinou a lavicou.",
    focus: "40% center",
  },
  {
    src: "/photos/realizacie/05-kuchyna-zlte-stolicky.png",
    width: 941,
    height: 1672,
    alt: "Biela kuchyňa s jedálenským stolom a žltými stoličkami.",
    focus: "center 46%",
  },
  {
    src: "/photos/realizacie/06-sprcha-cierny-ram.png",
    width: 1254,
    height: 1254,
    alt: "Rohový sprchový kút s čiernym rámom a dažďovou hlavicou.",
  },
  {
    src: "/photos/realizacie/07-spalna-ruzove.png",
    width: 1672,
    height: 941,
    alt: "Svetlá spálňa s ružovými doplnkami, posteľou a oknom so žalúziami.",
  },
  {
    src: "/photos/realizacie/08-kreslo-knihovna.png",
    width: 852,
    height: 1846,
    alt: "Sivé kreslo pri drevenej knižnici a bielej komode.",
    focus: "center 36%",
  },
  {
    src: "/photos/realizacie/09-kupelna-drevo-celok.png",
    width: 971,
    height: 1619,
    alt: "Kúpeľňa s drevenou skrinkou, preskleným sprchovým kútom a závesným WC.",
  },
  {
    src: "/photos/realizacie/10-umyvadlo-cierna-misa.png",
    width: 1254,
    height: 1254,
    alt: "Čierne okrúhle umývadlo na tmavej doske a zrkadlo v ozdobnom ráme.",
  },
  {
    src: "/photos/realizacie/11-kupelna-pruhy.png",
    width: 1536,
    height: 1024,
    alt: "Kúpeľňa s pruhovaným obkladom, bielou skrinkou a kúpeľňovým rebríkom.",
  },
  {
    src: "/photos/realizacie/12-spalna-latova-stena.png",
    width: 1672,
    height: 941,
    alt: "Spálňa s drevenou latkovou stenou, televízorom a béžovými závesmi.",
  },
  {
    src: "/photos/realizacie/13-umyvadlo-biela-skrinka.png",
    width: 1254,
    height: 1254,
    alt: "Biela skrinka s čiernou doskou, hranatým umývadlom a čiernou batériou.",
  },
  {
    src: "/photos/realizacie/14-umyvadlo-detail.png",
    width: 1254,
    height: 1254,
    alt: "Detail bieleho hranatého umývadla s čiernou batériou.",
  },
  {
    src: "/photos/realizacie/15-wc-dreveny-obklad.png",
    width: 971,
    height: 1619,
    alt: "Závesné WC pri drevenom obklade a béžovej dlažbe.",
  },
  {
    src: "/photos/realizacie/16-predsien-rastliny.png",
    width: 852,
    height: 1846,
    alt: "Predsieň s rastlinou, bielymi skrinkami a vešiakmi.",
    focus: "center 42%",
  },
  {
    src: "/photos/realizacie/17-kupelna-drevo-sprcha.png",
    width: 971,
    height: 1619,
    alt: "Drevená kúpeľňová skrinka, osvetlené zrkadlo a presklený sprchový kút.",
  },
];
