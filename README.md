# ProfiDepo

Slovak website for ProfiDepo reconstructions and finishing work. Next.js, TypeScript, and Tailwind.

## Install

```bash
npm install
```

## Local development

```bash
npm run dev -- --hostname 127.0.0.1 --port 43123
```

Open http://127.0.0.1:43123.

## Production build

```bash
npm run build
npm start
```

## Admin (Cenník)

See [ADMIN_SETUP.md](ADMIN_SETUP.md). Pricing content lives in `content/pricing.json` and is edited at `/admin/cennik`.

## Contact form

The homepage form posts the existing fields to `/api/kontakt`. That route checks the values and forwards them to the Basin endpoint in `src/app/api/kontakt/route.ts`. Basin sends the notification to the address configured in that Basin account.

The thank-you message appears only after Basin confirms it received the enquiry. If sending fails, the typed values stay in the form and the page says the enquiry was not sent.

## Known limitations

- Pages send `noindex, nofollow`. `public/robots.txt` disallows all crawlers.
- Chalupy, obklady, murárske práce, and elektro/voda have no project gallery. Those pages use illustrations only.
- The apartment page still shows the caption “Ilustračný záber”.
- The form does not upload files and has no privacy-consent checkbox.
