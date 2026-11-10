import pricingJson from "../../content/pricing.json";

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

export type PricingPrice = {
  amount: string;
  unit?: string;
};

export type PricingItem = {
  title: string;
  description: string;
  isActive?: boolean;
  prices: PricingPrice[];
};

export type PricingSection = {
  id: string;
  title: string;
  note?: string;
  isActive?: boolean;
  items: PricingItem[];
};

export type PricingContent = {
  note: string;
  sections: PricingSection[];
};

function formatPrices(prices: PricingPrice[]): { price: string; unit: string } {
  if (!prices.length) return { price: "", unit: "" };
  if (prices.length === 1) {
    return { price: prices[0]!.amount, unit: prices[0]!.unit || "" };
  }
  return {
    price: prices
      .map((p) => (p.unit ? `${p.amount} / ${p.unit}` : p.amount))
      .join(" · "),
    unit: "",
  };
}

/** Public cenník from committed JSON (active sections/items only). */
export function getPricing(): {
  note: string;
  categories: PriceCategory[];
} {
  const data = pricingJson as PricingContent;
  const categories: PriceCategory[] = (data.sections || [])
    .filter((section) => section.isActive !== false)
    .map((section) => ({
      id: section.id,
      title: section.title,
      ...(section.note ? { footer: section.note } : {}),
      rows: (section.items || [])
        .filter((item) => item.isActive !== false)
        .map((item) => {
          const { price, unit } = formatPrices(item.prices || []);
          return {
            work: item.title,
            unit,
            price,
            ...(item.description ? { note: item.description } : {}),
          };
        }),
    }))
    .filter((category) => category.rows.length > 0);

  return {
    note: data.note || "",
    categories,
  };
}
