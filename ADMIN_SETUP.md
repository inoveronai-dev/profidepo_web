# ProfiDepo – Admin CMS (Cenník)

Architektúra: **Vercel + GitHub only**. Žiadna databáza.

Flow: Admin UI → Vercel API → GitHub commit (`content/pricing.json`) → Vercel redeploy → verejný `/cennik`.

## Env premenné

Skopírujte `.env.example` → `.env.local` a nastavte rovnaké kľúče vo Verceli (Production + Preview):

| Premenná | Účel |
|---|---|
| `APP_URL` | Verejný origin, napr. `https://profidepoweb.vercel.app` |
| `SESSION_SECRET` | Dlhý random secret (≥ 16 znakov) |
| `COOKIE_SECURE` | `true` za HTTPS |
| `ADMIN_EMAIL` | E-mail na login |
| `ADMIN_PASSWORD_HASH` | bcrypt hash z `npm run admin:hash-password` |
| `GITHUB_OWNER` | `inoveronai-dev` |
| `GITHUB_REPO` | `profidepo_web` |
| `GITHUB_BRANCH` | `main` (produkcia) |
| `GITHUB_CONTENT_TOKEN` | Fine-grained PAT, Contents Read+Write, len tento repo |

Nikdy necommitujte secrety. Nikdy nepoužívajte `NEXT_PUBLIC_` pre tokeny.

## Heslo

```bash
npm install
npm run admin:hash-password
# výstup vložte do ADMIN_PASSWORD_HASH (v .env escapujte $ ako \$)
```

## Lokálny vývoj

```bash
cp .env.example .env.local
# vyplňte ADMIN_* a SESSION_SECRET
npm run dev -- --hostname 127.0.0.1 --port 43123
```

Admin: http://127.0.0.1:43123/admin/login

Bez `GITHUB_CONTENT_TOKEN` sa zmeny ukladajú lokálne do `content/pricing.json`.

## Production

1. Vo Verceli nastavte všetky env premenné
2. Vytvorte fine-grained PAT len pre `profidepo_web` (Contents: Read and write)
3. Po save admin vytvorí commit `cms: update pricing`
4. Verejný `/cennik` sa aktualizuje po redeployi (zvyčajne 1–2 min)
