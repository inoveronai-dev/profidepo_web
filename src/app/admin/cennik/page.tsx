"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Field,
  Flash,
  PageHeader,
  RowActions,
  TextArea,
  TextInput,
} from "@/components/admin/ui";
import { adminFetch } from "@/lib/admin/api-client";

type PriceRow = { amount: string; unit: string };
type ItemRow = {
  title: string;
  description: string;
  isActive: boolean;
  prices: PriceRow[];
};
type CategoryRow = {
  slug: string;
  title: string;
  note: string;
  isActive: boolean;
  items: ItemRow[];
};

function moveItem<T>(list: T[], index: number, direction: "up" | "down"): T[] {
  const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  const tmp = next[index]!;
  next[index] = next[target]!;
  next[target] = tmp;
  return next;
}

function priceSummary(item: ItemRow) {
  if (!item.prices.length) return "—";
  return item.prices
    .map((p) => (p.unit ? `${p.amount} / ${p.unit}` : p.amount || "—"))
    .join(" · ");
}

export default function AdminPricingPage() {
  const [note, setNote] = useState("");
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [itemQuery, setItemQuery] = useState("");
  const [flash, setFlash] = useState<{ type: "success" | "error"; message: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await adminFetch("/api/admin/pricing");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Načítanie zlyhalo.");
    setNote(data.note || "");
    const nextCategories = (data.categories || []).map(
      (c: {
        slug: string;
        title: string;
        note: string | null;
        isActive: boolean;
        items: {
          title: string;
          description: string;
          isActive: boolean;
          prices: { amount: string; unit: string | null }[];
        }[];
      }) => ({
        slug: c.slug,
        title: c.title,
        note: c.note || "",
        isActive: c.isActive ?? true,
        items: (c.items || []).map((i) => ({
          title: i.title,
          description: i.description,
          isActive: i.isActive ?? true,
          prices: (i.prices || []).map((p) => ({
            amount: p.amount,
            unit: p.unit || "",
          })),
        })),
      }),
    );
    setCategories(nextCategories);
    setSelectedIndex((prev) =>
      nextCategories.length === 0 ? 0 : Math.min(prev, nextCategories.length - 1),
    );
    setExpandedItem(null);
  }, []);

  useEffect(() => {
    load().catch(() => setFlash({ type: "error", message: "Načítanie zlyhalo." }));
  }, [load]);

  const selected = categories[selectedIndex] ?? null;

  const filteredItemIndexes = useMemo(() => {
    if (!selected) return [] as number[];
    const q = itemQuery.trim().toLowerCase();
    return selected.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.prices.some(
            (p) =>
              p.amount.toLowerCase().includes(q) || p.unit.toLowerCase().includes(q),
          )
        );
      })
      .map(({ index }) => index);
  }, [selected, itemQuery]);

  function updateCategory(ci: number, patch: Partial<CategoryRow>) {
    setCategories((prev) => prev.map((c, i) => (i === ci ? { ...c, ...patch } : c)));
  }

  function updateItem(ci: number, ii: number, patch: Partial<ItemRow>) {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === ci
          ? {
              ...c,
              items: c.items.map((item, j) => (j === ii ? { ...item, ...patch } : item)),
            }
          : c,
      ),
    );
  }

  function updatePrice(ci: number, ii: number, pi: number, patch: Partial<PriceRow>) {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === ci
          ? {
              ...c,
              items: c.items.map((item, j) =>
                j === ii
                  ? {
                      ...item,
                      prices: item.prices.map((p, k) => (k === pi ? { ...p, ...patch } : p)),
                    }
                  : item,
              ),
            }
          : c,
      ),
    );
  }

  function selectCategory(index: number) {
    setSelectedIndex(index);
    setExpandedItem(null);
    setItemQuery("");
  }

  function addCategory() {
    setCategories((prev) => {
      const next = [
        ...prev,
        {
          slug: `kategoria-${prev.length + 1}`,
          title: "Nová kategória",
          note: "",
          isActive: true,
          items: [],
        },
      ];
      setSelectedIndex(next.length - 1);
      setExpandedItem(null);
      setItemQuery("");
      return next;
    });
  }

  function removeCategory(ci: number) {
    setCategories((prev) => {
      const next = prev.filter((_, i) => i !== ci);
      setSelectedIndex((current) => {
        if (next.length === 0) return 0;
        if (current > ci) return current - 1;
        if (current === ci) return Math.min(ci, next.length - 1);
        return current;
      });
      setExpandedItem(null);
      return next;
    });
  }

  function addItem(ci: number) {
    setCategories((prev) => {
      const current = prev[ci];
      const nextIndex = current?.items.length ?? 0;
      setExpandedItem(nextIndex);
      return prev.map((c, i) =>
        i === ci
          ? {
              ...c,
              items: [
                ...c.items,
                {
                  title: "Nová položka",
                  description: "",
                  isActive: true,
                  prices: [{ amount: "", unit: "" }],
                },
              ],
            }
          : c,
      );
    });
  }

  function removeItem(ci: number, ii: number) {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === ci ? { ...c, items: c.items.filter((_, j) => j !== ii) } : c,
      ),
    );
    setExpandedItem((current) => {
      if (current === null) return null;
      if (current === ii) return null;
      if (current > ii) return current - 1;
      return current;
    });
  }

  function addPrice(ci: number, ii: number) {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === ci
          ? {
              ...c,
              items: c.items.map((item, j) =>
                j === ii ? { ...item, prices: [...item.prices, { amount: "", unit: "" }] } : item,
              ),
            }
          : c,
      ),
    );
  }

  function removePrice(ci: number, ii: number, pi: number) {
    setCategories((prev) =>
      prev.map((c, i) =>
        i === ci
          ? {
              ...c,
              items: c.items.map((item, j) =>
                j === ii
                  ? {
                      ...item,
                      prices:
                        item.prices.length <= 1
                          ? item.prices
                          : item.prices.filter((_, k) => k !== pi),
                    }
                  : item,
              ),
            }
          : c,
      ),
    );
  }

  async function save() {
    setLoading(true);
    setFlash(null);
    try {
      const payload = {
        note,
        categories: categories.map((c) => ({
          slug: c.slug,
          title: c.title,
          note: c.note || null,
          isActive: c.isActive,
          items: c.items.map((item) => ({
            title: item.title,
            description: item.description,
            isActive: item.isActive,
            prices: item.prices.map((p) => ({
              amount: p.amount,
              unit: p.unit.trim() || null,
            })),
          })),
        })),
      };
      const res = await adminFetch("/api/admin/pricing", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Uloženie zlyhalo.");
      setFlash({
        type: "success",
        message:
          data.message ||
          "Zmeny boli uložené. Web sa aktualizuje (zvyčajne do 1–2 minút).",
      });
      await load();
    } catch (e) {
      setFlash({
        type: "error",
        message: e instanceof Error ? e.message : "Uloženie zlyhalo.",
      });
    } finally {
      setLoading(false);
    }
  }

  const ci = selectedIndex;

  return (
    <div>
      <PageHeader
        title="Cenník"
        description="Vyberte kategóriu vľavo a upravujte len jej položky. Po uložení sa obsah commitne do GitHubu."
      />
      <Flash type={flash?.type || null} message={flash?.message || ""} />

      <Card>
        <Field label="Globálna poznámka">
          <TextArea value={note} onChange={(e) => setNote(e.target.value)} className="min-h-20" />
        </Field>
        <RowActions>
          <Button type="button" variant="secondary" onClick={addCategory}>
            Pridať kategóriu
          </Button>
          <Button type="button" onClick={save} disabled={loading}>
            {loading ? "Ukladám…" : "Uložiť zmeny"}
          </Button>
        </RowActions>
      </Card>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <Card>
            <p className="mb-3 text-xs font-semibold tracking-[0.12em] text-[#42634C] uppercase">
              Kategórie
            </p>
            <div className="mb-3 lg:hidden">
              <select
                className="w-full rounded-lg border border-[#42634C]/25 bg-white px-3 py-2.5 text-sm text-[#2A2E2C]"
                value={selectedIndex}
                onChange={(e) => selectCategory(Number(e.target.value))}
              >
                {categories.map((cat, index) => (
                  <option key={`${cat.slug}-${index}`} value={index}>
                    {cat.title} ({cat.items.length})
                  </option>
                ))}
              </select>
            </div>
            <nav className="hidden max-h-[70vh] space-y-1 overflow-y-auto lg:block" aria-label="Kategórie cenníka">
              {categories.map((cat, index) => {
                const active = index === selectedIndex;
                return (
                  <button
                    key={`${cat.slug}-${index}`}
                    type="button"
                    onClick={() => selectCategory(index)}
                    className={`flex w-full items-start justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-[#1E3A2C] text-white"
                        : "text-[#1E3A2C] hover:bg-[#CEDBCB]/50"
                    }`}
                  >
                    <span className="min-w-0 leading-snug">{cat.title}</span>
                    <span
                      className={`shrink-0 tabular-nums ${active ? "text-white/70" : "text-[#2A2E2C]/50"}`}
                    >
                      {cat.items.length}
                    </span>
                  </button>
                );
              })}
            </nav>
            {categories.length === 0 ? (
              <p className="text-sm text-[#2A2E2C]/65">Zatiaľ žiadne kategórie.</p>
            ) : null}
          </Card>
        </aside>

        <div>
          {!selected ? (
            <Card>
              <p className="text-sm text-[#2A2E2C]/70">
                Pridajte prvú kategóriu, aby ste mohli upravovať položky.
              </p>
            </Card>
          ) : (
            <Card>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-[#1E3A2C]">{selected.title}</h2>
                  <p className="mt-1 text-sm text-[#2A2E2C]/65">
                    {selected.items.length} položiek · slug `{selected.slug}`
                    {!selected.isActive ? " · neaktívna" : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setCategories((prev) => moveItem(prev, ci, "up"));
                      setSelectedIndex((current) => Math.max(0, current - 1));
                    }}
                    disabled={ci === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setCategories((prev) => moveItem(prev, ci, "down"));
                      setSelectedIndex((current) =>
                        Math.min(categories.length - 1, current + 1),
                      );
                    }}
                    disabled={ci === categories.length - 1}
                  >
                    ↓
                  </Button>
                  <Button type="button" variant="danger" onClick={() => removeCategory(ci)}>
                    Zmazať kategóriu
                  </Button>
                </div>
              </div>

              <Field label="Slug (id)">
                <TextInput
                  value={selected.slug}
                  onChange={(e) => updateCategory(ci, { slug: e.target.value })}
                />
              </Field>
              <Field label="Názov">
                <TextInput
                  value={selected.title}
                  onChange={(e) => updateCategory(ci, { title: e.target.value })}
                />
              </Field>
              <Field label="Poznámka kategórie (pätka)">
                <TextArea
                  value={selected.note}
                  onChange={(e) => updateCategory(ci, { note: e.target.value })}
                  className="min-h-20"
                />
              </Field>
              <label className="mb-5 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.isActive}
                  onChange={(e) => updateCategory(ci, { isActive: e.target.checked })}
                />
                Aktívna kategória
              </label>

              <div className="border-t border-[#42634C]/15 pt-4">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div className="min-w-[220px] flex-1">
                    <Field label="Hľadať položku">
                      <TextInput
                        value={itemQuery}
                        onChange={(e) => setItemQuery(e.target.value)}
                        placeholder="Názov, popis alebo cena…"
                      />
                    </Field>
                  </div>
                  <Button type="button" variant="secondary" onClick={() => addItem(ci)}>
                    Pridať položku
                  </Button>
                </div>

                <div className="space-y-2">
                  {filteredItemIndexes.map((ii) => {
                    const item = selected.items[ii]!;
                    const open = expandedItem === ii;
                    return (
                      <div
                        key={ii}
                        className="overflow-hidden rounded-lg border border-[#42634C]/15 bg-[#F3F0E8]/80"
                      >
                        <button
                          type="button"
                          className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                          onClick={() => setExpandedItem(open ? null : ii)}
                          aria-expanded={open}
                        >
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-[#1E3A2C]">
                              {item.title || "Bez názvu"}
                              {!item.isActive ? (
                                <span className="ml-2 text-xs font-normal text-[#2A2E2C]/50">
                                  neaktívna
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 block text-sm text-[#2A2E2C]/70 tabular-nums">
                              {priceSummary(item)}
                            </span>
                          </span>
                          <span className="shrink-0 text-[#42634C]" aria-hidden="true">
                            {open ? "−" : "+"}
                          </span>
                        </button>

                        {open ? (
                          <div className="border-t border-[#42634C]/15 bg-white px-4 py-4">
                            <div className="mb-3 flex flex-wrap gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() =>
                                  updateCategory(ci, {
                                    items: moveItem(selected.items, ii, "up"),
                                  })
                                }
                                disabled={ii === 0}
                              >
                                ↑
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={() =>
                                  updateCategory(ci, {
                                    items: moveItem(selected.items, ii, "down"),
                                  })
                                }
                                disabled={ii === selected.items.length - 1}
                              >
                                ↓
                              </Button>
                              <Button
                                type="button"
                                variant="danger"
                                onClick={() => removeItem(ci, ii)}
                              >
                                Zmazať
                              </Button>
                            </div>
                            <Field label="Názov práce">
                              <TextInput
                                value={item.title}
                                onChange={(e) => updateItem(ci, ii, { title: e.target.value })}
                              />
                            </Field>
                            <Field label="Popis / poznámka">
                              <TextArea
                                value={item.description}
                                onChange={(e) =>
                                  updateItem(ci, ii, { description: e.target.value })
                                }
                                className="min-h-20"
                              />
                            </Field>
                            <label className="mb-3 flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={item.isActive}
                                onChange={(e) =>
                                  updateItem(ci, ii, { isActive: e.target.checked })
                                }
                              />
                              Aktívna položka
                            </label>
                            <p className="mb-2 text-sm font-medium text-[#1E3A2C]">Ceny</p>
                            {item.prices.map((price, pi) => (
                              <div
                                key={pi}
                                className="mb-2 flex flex-wrap items-center gap-2"
                              >
                                <TextInput
                                  className="max-w-[10rem]"
                                  placeholder="Suma"
                                  value={price.amount}
                                  onChange={(e) =>
                                    updatePrice(ci, ii, pi, { amount: e.target.value })
                                  }
                                />
                                <TextInput
                                  className="max-w-[8rem]"
                                  placeholder="Jednotka"
                                  value={price.unit}
                                  onChange={(e) =>
                                    updatePrice(ci, ii, pi, { unit: e.target.value })
                                  }
                                />
                                {item.prices.length > 1 ? (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => removePrice(ci, ii, pi)}
                                  >
                                    Odstrániť
                                  </Button>
                                ) : null}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => addPrice(ci, ii)}
                            >
                              Pridať cenu
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {filteredItemIndexes.length === 0 ? (
                  <p className="mt-3 text-sm text-[#2A2E2C]/65">
                    {itemQuery
                      ? "Žiadna položka nevyhovuje hľadaniu."
                      : "V tejto kategórii zatiaľ nie sú položky."}
                  </p>
                ) : null}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
