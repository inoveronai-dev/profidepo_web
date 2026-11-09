import { services } from "@/lib/site";

export const SERVICE_OPTIONS = [
  ...services.map((item) => item.title),
  "Dokončovanie holodomu na finish",
  "Iné / neviem presne",
] as const;

export type ContactFields = {
  name: string;
  city: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<
  Record<"name" | "city" | "phone" | "email" | "contact" | "service" | "message", string>
>;

export const EMPTY_CONTACT: ContactFields = {
  name: "",
  city: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const FIELD_KEYS = ["name", "city", "phone", "email", "service", "message"] as const;

export function isValidPhone(value: string) {
  const trimmed = value.trim();
  if (!/^[+0-9][\d\s()-]+$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function readContactFields(input: unknown): ContactFields | null {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;
  const fields = { ...EMPTY_CONTACT };
  for (const key of FIELD_KEYS) {
    const value = record[key];
    if (value == null) continue;
    if (typeof value !== "string") return null;
    fields[key] = value;
  }
  return fields;
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const message = fields.message.trim();
  if (!name) errors.name = "Zadajte meno a priezvisko.";
  else if (name.length > 120) errors.name = "Meno je príliš dlhé.";
  if (!message) errors.message = "Napíšte, čo plánujete prerábať.";
  else if (message.length > 4000) errors.message = "Správa je príliš dlhá.";

  const phone = fields.phone.trim();
  const email = fields.email.trim();
  if (phone.length > 40) errors.phone = "Zadajte telefón v tvare 09xx xxx xxx alebo +421…";
  if (email.length > 200) errors.email = "Zadajte e-mail v tvare meno@domena.sk.";
  const phoneOk = phone ? isValidPhone(phone) : false;
  const emailOk = email ? isValidEmail(email) : false;

  if (phone && !phoneOk && !errors.phone) {
    errors.phone = "Zadajte telefón v tvare 09xx xxx xxx alebo +421…";
  }
  if (email && !emailOk && !errors.email) {
    errors.email = "Zadajte e-mail v tvare meno@domena.sk.";
  }
  if (!phoneOk && !emailOk && !errors.phone && !errors.email) {
    errors.contact = "Zadajte telefón alebo e-mail, aby sme sa vám vedeli ozvať.";
  }
  if (fields.city.trim().length > 120) {
    errors.city = "Názov obce je príliš dlhý.";
  }
  const service = fields.service.trim();
  if (service && !SERVICE_OPTIONS.includes(service as (typeof SERVICE_OPTIONS)[number])) {
    errors.service = "Vyberte službu zo zoznamu.";
  }
  return errors;
}

export function contactPayload(fields: ContactFields): ContactFields {
  return {
    name: fields.name.trim(),
    city: fields.city.trim(),
    phone: fields.phone.trim(),
    email: fields.email.trim(),
    service: fields.service.trim(),
    message: fields.message.trim(),
  };
}
