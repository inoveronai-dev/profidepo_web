export type PriceRow = {
  work: string;
  unit: string;
  price: string;
  note?: string;
};

export type PriceCategory = {
  id: string;
  title: string;
  rows: PriceRow[];
  footer?: string;
};

/** Source heading: individual prices for complete reconstructions. */
export const priceIntro =
  "Práce, subdodávky a komplety na kľúč. Pri kompletných rekonštrukciách ponúkame individuálne ceny.";

export const priceCategories: PriceCategory[] = [
  {
    id: "sanacie",
    title: "Sanácie a búracie práce",
    rows: [
      { work: "Demontáž umakartového bytového jadra a rozvodov", unit: "ks", price: "200 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Demontáž bytového jadra s oceľovou konštrukciou", unit: "ks", price: "250 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Demontáž vane / sprchového kútu", unit: "ks", price: "70 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Demontáž kombi WC / umývadla", unit: "ks", price: "18 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Odstránenie drevených/sadrokartónových priečok", unit: "m²", price: "10,00 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Odstránenie tehlovej priečky do 100 mm", unit: "m²", price: "12,00 €", note: "S použitím techniky na rezanie a sekanie. Bez likvidácie odpadu." },
      { work: "Osekanie dlažby a obkladov", unit: "m²", price: "9,00 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Odstránenie podláh (PVC, parkety, plávajúce)", unit: "m²", price: "4,00 €", note: "Bez likvidácie odpadu." },
      { work: "Odstránenie tapiet", unit: "m²", price: "4,00 €", note: "Bez likvidácie odpadu." },
      { work: "Oškrabanie starých náterov", unit: "m²", price: "5,00 €", note: "Na omietku, prípadne na panel, ak omietka nebola." },
      { work: "Oškrabanie starých olejových soklových náterov", unit: "m²", price: "15,00 €", note: "Na omietku, prípadne na panel, ak omietka nebola." },
      { work: "Osekanie plste, lepenky a lepidiel z betónu", unit: "m²", price: "10,00 €", note: "Ručné spracovanie." },
      { work: "Demontáž skrutkovanej zárubne", unit: "ks", price: "18,00 €", note: "Bez likvidácie odpadu." },
      { work: "Vyrezanie zamurovanej zárubne z tehly", unit: "ks", price: "40 €", note: "S použitím techniky na rezanie a sekanie. Bez likvidácie odpadu." },
      { work: "Vyrezanie zaliatej zárubne z panela", unit: "ks", price: "75 €", note: "Pri hrúbke panelu do 6 cm. Pri hrubšej stene cena dohodou. S použitím techniky na rezanie a sekanie. Bez likvidácie odpadu." },
      { work: "Vynesenie stavebnej sutiny alebo dreveného odpadu", unit: "", price: "130,00 €", note: "Vynesenie odpadu z bytu pred bytovku. Práca do 3 hodín. Bez odvozu." },
      { work: "Vynesenie sutiny - príplatok za každé poschodie bez výťahu", unit: "", price: "33,00 €", note: "Vynesenie odpadu v bytovke bez výťahu. Cena za jedno poschodie." },
      { work: "Odvoz a likvidácia stavebného odpadu do 2,5 t", unit: "", price: "200 €", note: "Subdodávkou regionálnym správcom." },
    ],
  },
  {
    id: "rezanie",
    title: "Rezanie, búranie panelu a priečok",
    rows: [
      { work: "Otvor 70 × 203 v paneli 8 cm hrúbky", unit: "", price: "250 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Otvor 70 × 203 v paneli 15 cm hrúbky", unit: "", price: "500 €", note: "S použitím techniky. Bez likvidácie odpadu." },
      { work: "Vybúranie panelo-oceľovej polpriečky pri sporáku v Petržalských bytoch", unit: "", price: "200 €", note: "S použitím techniky na rezanie a sekanie. Bez likvidácie odpadu." },
      { work: "Vyrezanie celého panelu 8 cm hrúbky - za každých 50 cm šírky", unit: "", price: "200 €", note: "50 cm pás od zeme po strop z 8 cm panelu. Bez likvidácie odpadu." },
      { work: "Vyrezanie celého panelu 15 cm hrúbky - za každých 33 cm šírky", unit: "", price: "350 €", note: "33 cm pás od zeme po strop z 15 cm panelu. Bez likvidácie odpadu." },
      { work: "Vynesenie panelovej sutiny", unit: "", price: "130 €", note: "Vynesenie panelov a odpadovej sutiny z bytu pred bytovku. Práca do 3 hodín. Bez odvozu." },
      { work: "Vynesenie panelov - príplatok za každé poschodie bez výťahu", unit: "", price: "60,00 €", note: "Vynesenie panelov v bytovke bez výťahu. Cena za jedno poschodie." },
      { work: "Odvoz a likvidácia panelovej sutiny do 2,5 t", unit: "", price: "250 €", note: "Subdodávkou regionálnym správcom." },
    ],
  },
  {
    id: "murarske",
    title: "Murárske práce",
    rows: [
      { work: "Murovka Ytong / Porfix 5 cm", unit: "m²", price: "15,00 €" },
      { work: "Murovka Ytong / Porfix 7,5 cm", unit: "m²", price: "13,00 €" },
      { work: "Murovka Ytong / Porfix 10 cm", unit: "m²", price: "13,00 €" },
      { work: "Murovka Ytong / Porfix 15 cm", unit: "m²", price: "15,00 €" },
      { work: "Osadenie sklobetónu (sklenené tvárnice)", unit: "ks", price: "5,00 €" },
      { work: "Osadenie podomietkových líšt", unit: "bm", price: "3,50 €" },
      { work: "Špalety (otvory, výklenky okolo okien a dverí) vyrovnávanie", unit: "bm", price: "10,00 €", note: "Vnútorné špalety do 3 cm hrúbky." },
      { work: "Špalety - finálna úprava", unit: "bm", price: "8,00 €", note: "Vnútorné špalety." },
      { work: "Osadenie plastovej parapety", unit: "bm", price: "15,00 €" },
      { work: "Sieťkovanie stien", unit: "m²", price: "8,00 €" },
      { work: "Sieťkovanie stropov", unit: "m²", price: "12,00 €" },
      { work: "Penetrovanie stien a stropov 1x", unit: "m²", price: "0,60 €" },
      { work: "Vyrovnávanie podláh, stien a stropov do 2 cm", unit: "m²", price: "9,50 €" },
      { work: "Vyrovnávanie podláh nivelizovaním", unit: "m²", price: "6,60 €" },
      { work: "Nanesenie cementového poteru do 5 cm", unit: "m²", price: "8,80 €" },
      { work: "Cementový špric na stenu", unit: "m²", price: "2,60 €" },
      { work: "Osadenie oceľovej zárubne", unit: "ks", price: "40,00 €" },
      { work: "Osadenie vaničky kútu, podmurovanie", unit: "ks", price: "80,00 €" },
      { work: "Osadenie vane k obkladu a podmurovanie", unit: "ks", price: "80,00 €" },
      { work: "Obmurovanie vane presnými tvárnicami Ytong", unit: "ks", price: "80,00 €" },
      { work: "Osadenie vane pod obklad (precízne osadenie s podmurovaním)", unit: "ks", price: "110,00 €" },
      { work: "Osadenie púzdra JAP/Eclisse do pripraveného otvoru", unit: "ks", price: "80,00 €" },
      { work: "Omietnutie stavebného púzdra z oboch strán", unit: "ks", price: "330,00 €" },
      { work: "Inak nezaradené, nemerateľné práce", unit: "hod", price: "15,00 €" },
    ],
  },
  {
    id: "omietka",
    title: "Omietka a stierka",
    rows: [
      { work: "Vyrovnávacia omietka pod obklad", unit: "m²", price: "5,90 €" },
      { work: "Hrubá omietka do 20 mm", unit: "m²", price: "7,00 €" },
      { work: "Štuková omietka na steny", unit: "m²", price: "12,00 €" },
      { work: "Štuková omietka na stropy", unit: "m²", price: "16,00 €" },
      { work: "Sanačná omietka", unit: "m²", price: "16,00 €" },
      { work: "Stierka hladká na steny - 2x nános, brúsenie", unit: "m²", price: "13,00 €" },
      { work: "Stierka hladká na stropy - 2x nános, brúsenie", unit: "m²", price: "17,00 €" },
      { work: "Štukové reliéfne obrazce na stenu", unit: "ks", price: "500,00 €", note: "Vrátane lepidla. Práca do 8 hodín." },
    ],
  },
  {
    id: "maliarske",
    title: "Maliarske práce",
    rows: [
      { work: "Náter omietky klasickou bielou oteruvzdornou farbou", unit: "m²", price: "1,33 €", note: "Zväčša sú potrebné 2–3 nátery." },
      { work: "2x Náter impregnovaného (zeleného) sadrokartónu", unit: "m²", price: "4,60 €" },
      { work: "Nástrek technológiou Airless - najvyššia kvalita maľovania", unit: "m²", price: "2,00 €", note: "Zväčša sú potrebné 2 priechody." },
      { work: "Vápnovanie, penetrovanie", unit: "m²", price: "0,70 €" },
      { work: "Impregnovanie kameňa, betónu", unit: "m²", price: "8,00 €", note: "Zväčša sú potrebné na kameň a betón 2–3 nátery." },
      { work: "Náter oceľovej zárubne", unit: "ks", price: "24,00 €" },
    ],
  },
  {
    id: "obklad",
    title: "Pokládka obkladu a dlažby",
    rows: [
      { work: "Mozaika na páse", unit: "m²", price: "40,00 €" },
      { work: "Obklad kuchynský do 20 cm", unit: "m²", price: "25,00 €", note: "Bez lepidla a škárovacej hmoty." },
      { work: "Obklad malý do cca 30 cm", unit: "m²", price: "25,00 €", note: "Bez lepidla a škárovacej hmoty." },
      { work: "Obklad bežných rozmerov okolo cca 60 cm", unit: "m²", price: "25,00 €", note: "Bez lepidla a škárovacej hmoty." },
      { work: "Veľkosť obkladu nad 60 cm", unit: "m²", price: "30,00 €", note: "Bez lepidla a škárovacej hmoty." },
      { work: "Veľkoformátový obklad nad 90 cm", unit: "m²", price: "35,00 €", note: "Bez lepidla a škárovacej hmoty." },
      { work: "Príplatok za montáž dekoru", unit: "ks", price: "10,00 €" },
      { work: "Vykrúženie otvoru do keramického obkladu", unit: "ks", price: "5,50 €" },
      { work: "Vykrúženie otvoru do gressu/mramoru, priamo na stavbe", unit: "ks", price: "8,50 €" },
      { work: "Vykrúženie otvoru vodným lúčom / laserom", unit: "ks", price: "8,00 €", note: "Bez dopravy, subdodávkou." },
      { work: "Príplatok za dlažbu do šikminy, alebo \"H\" uloženie", unit: "m²", price: "10,00 €", note: "Vrátane rezania." },
      { work: "Príplatok za obklad/dlažbu typu Gress", unit: "m²", price: "5,50 €" },
      { work: "Príplatok za obklad/dlažbu z Ukrajiny alebo Číny", unit: "m²", price: "10,00 €" },
      { work: "Montáž rohových líšt na obklad", unit: "bm", price: "8,50 €" },
      { work: "Montáž soklov", unit: "bm", price: "5,00 €" },
      { work: "Škárovanie obkladov a dlažby", unit: "m²", price: "3,30 €" },
      { work: "Kamenné obklady a bridlice na stenu", unit: "m²", price: "25,00 €", note: "Vrátane flexibilného lepidla." },
      { work: "Použitie nivelačného systému Leveling na celú kúpeľňu", unit: "", price: "50,00 €" },
      { work: "Použitie diamantovej techniky na vykružovanie dier a otvorov v obklade", unit: "", price: "150,00 €" },
    ],
  },
  {
    id: "sadrokarton",
    title: "Sadrokartón",
    rows: [
      { work: "Podkrovie s materiálom", unit: "m²", price: "33 €", note: "Práca, RB doska, UD a CD lišty, kotvy a tmel." },
      { work: "Strop s materiálom", unit: "m²", price: "30 €", note: "Práca, RB doska, UD a CD lišty, kotvy a tmel." },
      { work: "Priečka s materiálom", unit: "m²", price: "42 €", note: "Práca, RB doska z oboch strán, lišty a tmel." },
      { work: "Príplatok za vodeodolný sadrokartón", unit: "m²", price: "3,00 €" },
      { work: "Tmelenie akrylátom", unit: "bm", price: "2,00 €" },
    ],
  },
  {
    id: "obluky",
    title: "Výroba oblúkov",
    rows: [
      { work: "Z tvrdeného polystyrénu", unit: "ks", price: "od 53 €", note: "Vrátane sieťky a lepidla." },
      { work: "Nenosný z pórobetónu", unit: "ks", price: "od 60 €", note: "Vrátane sieťky a lepidla." },
    ],
  },
  {
    id: "podlaha",
    title: "Pokládka plávajúcej podlahy",
    rows: [
      { work: "Príprava a vysávanie podkladu", unit: "m²", price: "0,50 €" },
      { work: "Pokládka vinilovej podlahy", unit: "m²", price: "8,00 €" },
      { work: "Pokládka podlahy s lepením pera a drážky", unit: "m²", price: "14,00 €" },
      { work: "Pokládka laminátovej podlahy, click systému", unit: "m²", price: "6,90 €" },
      { work: "Príplatok za pokládku podlahy diagonálne", unit: "m²", price: "5,00 €" },
      { work: "Lištovanie (obvodové lišty)", unit: "bm", price: "5,00 €" },
      { work: "Ukončovanie lišty bez prechodových prvkov (rezanie uhlov)", unit: "ks", price: "5,00 €" },
    ],
  },
  {
    id: "ostatne",
    title: "Ostatné",
    rows: [
      { work: "Osadenie sanity", unit: "hod", price: "50,00 €" },
      { work: "Montáž kúpeľňových doplnkov", unit: "hod", price: "50,00 €" },
      { work: "Demontáž sanity a doplnkov", unit: "hod", price: "25,00 €" },
      { work: "Doprava a preprava osôb", unit: "km", price: "0,85 €", note: "Precenenie každý mesiac podľa ceny PHM." },
      { work: "Doprava a preprava materiálu", unit: "jazda", price: "33,00 €" },
      { work: "Výjazd so zákazníkom na nákup", unit: "hod", price: "15,00 €" },
      { work: "Zameranie, odborné poradenstvo, kalkulácia", unit: "", price: "100,00 €", note: "Poplatok za zameranie bude odrátaný pri fakturácii na konci zákazky." },
    ],
  },
  {
    id: "komplety",
    title: "Orientačné ceny kompletov",
    rows: [
      { work: "Rekonštrukcia bytového jadra bez murovania", unit: "", price: "3 600 €", note: "Panelové bytové jadro typu T v prevedení štandard. Kúpeľňa, WC, kuchyňa, chodba." },
      { work: "Rekonštrukcia bytového jadra typu T vrátane murovania", unit: "", price: "5 000 €", note: "Umakartové bytové jadro typu T v prevedení štandard. Kúpeľňa, WC, kuchyňa, chodba." },
      { work: "Rekonštrukcia panelovej/tehlovej kúpeľne s WC na kľúč, už aj so sanitou", unit: "", price: "5 500 €", note: "Rekonštrukcia panelovej alebo tehlovej kúpeľne s WC. Obklady, dlažba a sanita v kategórii štandard." },
      { work: "Rekonštrukcia bytového jadra na kľúč, už aj so sanitou", unit: "", price: "6 000 €", note: "Rekonštrukcia umakartového jadra s murovaním aj so sanitou. Obklady, dlažba a sanita v kategórii štandard." },
      { work: "Kompletná rekonštrukcia 1i bytu, alebo garsónky, bez sanity a podláh", unit: "", price: "8 500 €", note: "Sanácie, elektroinštalácia, kúpeľňa, stierky, maľovanie." },
      { work: "Kompletná rekonštrukcia 2i bytu, bez sanity, doplnkov a podláh", unit: "", price: "12 500 €", note: "Sanácie, elektroinštalácia, kúpeľňa, stierky, maľovanie." },
      { work: "Kompletná rekonštrukcia 3i bytu, bez sanity, doplnkov a podláh", unit: "", price: "16 000 €", note: "Sanácie, elektroinštalácia, voda, odpad, kúpeľňa, kuchyňa, stierky, špalety, maľovanie." },
    ],
    footer: "Na cenu vplýva spôsob stavby aj materiál, rozloha, konečná úprava stien, zásahy do panelu, upratovanie, likvidácia stavebného odpadu, zúčastnené profesie a počet pracovníkov. Pri rekonštrukcii na kľúč cenu určujú aj obklady, doplnky, sanita, dvere, vypínače a svietidlá. Môžu byť v lacnejšom aj luxusnom prevedení, preto je cena stanovená na štandardné prevedenie.",
  },
];

