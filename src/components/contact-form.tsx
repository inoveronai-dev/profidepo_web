"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  EMPTY_CONTACT,
  SERVICE_OPTIONS,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "@/lib/contact-fields";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-[#42634C]/20 bg-white px-3 text-[15px] text-[#2A2E2C] outline-none placeholder:text-[#2A2E2C]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C] aria-invalid:border-[#7A3E36]";

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const lock = useRef(false);

  const set =
    (key: keyof ContactFields) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((current) => ({ ...current, [key]: event.target.value }));
      setStatus((current) => (current === "sending" ? current : "idle"));
    };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (lock.current) return;
    const next = validateContact(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("idle");
      return;
    }

    lock.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      const data = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (!response.ok || data?.ok !== true) {
        setStatus("error");
        return;
      }
      setFields(EMPTY_CONTACT);
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      lock.current = false;
    }
  };

  const contactHint = errors.contact ?? "Vyplňte aspoň telefón alebo e-mail.";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="min-w-0 rounded-2xl border border-[#42634C]/15 bg-white p-5 sm:p-7"
      aria-describedby={status === "success" || status === "error" ? "kontakt-stav" : undefined}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kontakt-meno" className="text-sm font-medium text-[#2A2E2C]">
            Meno a priezvisko <span className="text-[#42634C]">*</span>
          </label>
          <input
            id="kontakt-meno"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="Vaše meno"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "kontakt-meno-chyba" : undefined}
            className={`${fieldClass} h-12`}
          />
          {errors.name ? (
            <p id="kontakt-meno-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="kontakt-obec" className="text-sm font-medium text-[#2A2E2C]">
            Obec / mesto
          </label>
          <input
            id="kontakt-obec"
            name="city"
            type="text"
            autoComplete="address-level2"
            value={fields.city}
            onChange={set("city")}
            placeholder="Miesto realizácie"
            aria-invalid={errors.city ? true : undefined}
            aria-describedby={errors.city ? "kontakt-obec-chyba" : undefined}
            className={`${fieldClass} h-12`}
          />
          {errors.city ? (
            <p id="kontakt-obec-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
              {errors.city}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="kontakt-telefon" className="text-sm font-medium text-[#2A2E2C]">
            Telefón
          </label>
          <input
            id="kontakt-telefon"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={fields.phone}
            onChange={set("phone")}
            placeholder="+421 …"
            aria-invalid={errors.phone || errors.contact ? true : undefined}
            aria-describedby="kontakt-kontakt-napoveda"
            className={`${fieldClass} h-12`}
          />
          {errors.phone ? (
            <p id="kontakt-telefon-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="kontakt-email" className="text-sm font-medium text-[#2A2E2C]">
            Email
          </label>
          <input
            id="kontakt-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={set("email")}
            placeholder="vas@email.sk"
            aria-invalid={errors.email || errors.contact ? true : undefined}
            aria-describedby="kontakt-kontakt-napoveda"
            className={`${fieldClass} h-12`}
          />
          {errors.email ? (
            <p id="kontakt-email-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>
      <p
        id="kontakt-kontakt-napoveda"
        className={`mt-1.5 text-sm ${errors.contact ? "text-[#7A3E36]" : "text-[#2A2E2C]/60"}`}
        role={errors.contact ? "alert" : undefined}
      >
        {contactHint}
      </p>

      <div className="mt-4">
        <label htmlFor="kontakt-sluzba" className="text-sm font-medium text-[#2A2E2C]">
          O akú službu máte záujem?
        </label>
        <select
          id="kontakt-sluzba"
          name="service"
          value={fields.service}
          onChange={set("service")}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={errors.service ? "kontakt-sluzba-chyba" : undefined}
          className={`${fieldClass} h-12`}
        >
          <option value="">Vyberte službu</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.service ? (
          <p id="kontakt-sluzba-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
            {errors.service}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor="kontakt-sprava" className="text-sm font-medium text-[#2A2E2C]">
          Čo plánujete prerábať? <span className="text-[#42634C]">*</span>
        </label>
        <textarea
          id="kontakt-sprava"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={set("message")}
          placeholder="Napíšte nám, čo chcete zmeniť a kedy približne plánujete začať."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "kontakt-sprava-chyba" : undefined}
          className={`${fieldClass} min-h-32 resize-y py-3`}
        />
        {errors.message ? (
          <p id="kontakt-sprava-chyba" className="mt-1.5 text-sm text-[#7A3E36]" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-[#42634C] px-5 text-[15px] font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#42634C] disabled:opacity-70"
        >
          {status === "sending" ? "Odosielam…" : "Odoslať dopyt"}
        </button>
        <p className="text-sm leading-relaxed text-[#2A2E2C]/70">
          Odoslaním formulára odošlete dopyt, nie záväznú objednávku.
        </p>
      </div>

      {status === "success" ? (
        <p id="kontakt-stav" role="status" className="mt-4 text-sm leading-relaxed text-[#42634C]">
          Ďakujeme. Dopyt sme prijali a ozveme sa vám.
        </p>
      ) : null}
      {status === "error" ? (
        <p id="kontakt-stav" role="alert" className="mt-4 text-sm leading-relaxed text-[#7A3E36]">
          Dopyt sa nepodarilo odoslať. Údaje ostali vo formulári. Skúste to znova, alebo nám zavolajte.
        </p>
      ) : null}
    </form>
  );
}
