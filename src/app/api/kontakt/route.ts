import { basinConfirmed } from "@/lib/basin-receipt";
import { contactPayload, readContactFields, validateContact } from "@/lib/contact-fields";

const BASIN_URL = "https://usebasin.com/f/b20343cac836";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const fields = readContactFields(input);
  if (!fields || Object.keys(validateContact(fields)).length > 0) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const payload = contactPayload(fields);
  try {
    const basin = await fetch(BASIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "manual",
      signal: AbortSignal.timeout(12_000),
    });
    const text = await basin.text();
    let body: unknown = null;
    if (text) {
      try {
        body = JSON.parse(text) as unknown;
      } catch {
        body = null;
      }
    }
    if (!basinConfirmed(basin.status, body)) {
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
