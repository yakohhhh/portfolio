/* =============================================================================
 *  POST /api/contact : envoie le message du formulaire par email (Resend).
 *
 *  Variables d'environnement (Vercel > Settings > Environment Variables) :
 *    RESEND_API_KEY   (obligatoire)  clé API Resend
 *    CONTACT_TO       (optionnel)    destinataire, par défaut aymanmazroui@proton.me
 *    CONTACT_FROM     (optionnel)    expéditeur, par défaut onboarding@resend.dev
 *                                    → à remplacer par contact@aymanmazroui.dev
 *                                      une fois le domaine vérifié dans Resend
 *
 *  Protections : contrôle de l'origine, honeypot anti-bot, délai minimal de
 *  saisie, limites de taille, validation de l'email, échappement HTML et
 *  limitation de débit par IP (au mieux, en mémoire de l'instance).
 * ========================================================================== */

const TO = process.env.CONTACT_TO || 'aymanmazroui@proton.me'
const FROM = process.env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>'

const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?aymanmazroui\.dev$/,
  /^https:\/\/ayman-mazroui(-[a-z0-9-]+)?\.vercel\.app$/,
  /^http:\/\/localhost(:\d+)?$/,
]

const LIMITS = { name: 100, email: 200, message: 5000 }
const MIN_FILL_MS = 2500
const RATE = { windowMs: 10 * 60 * 1000, max: 5 }
const hits = new Map<string, number[]>()

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max) : ''

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE.max
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin') || ''
  if (!ALLOWED_ORIGINS.some((re) => re.test(origin))) return json(403, { error: 'forbidden' })

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return json(429, { error: 'rate_limited' })

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'invalid_json' })
  }

  // Honeypot : champ invisible que seuls les robots remplissent.
  if (clean(body.website, 200)) return json(200, { ok: true })
  // Formulaire envoyé trop vite pour être humain.
  const startedAt = Number(body.startedAt)
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) return json(200, { ok: true })

  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const message = clean(body.message, LIMITS.message)
  const lang = body.lang === 'en' ? 'en' : 'fr'

  if (!name || !message) return json(400, { error: 'missing_fields' })
  if (!/^[^\s@<>()]+@[^\s@<>()]+\.[^\s@<>()]{2,}$/.test(email)) return json(400, { error: 'invalid_email' })

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('RESEND_API_KEY manquante')
    return json(500, { error: 'not_configured' })
  }

  const html = `
    <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#121214">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#67676f">Portfolio · aymanmazroui.dev (${lang.toUpperCase()})</p>
      <h2 style="margin:0 0 16px;font-size:20px">Nouveau message de ${escapeHtml(name)}</h2>
      <p style="margin:0 0 16px"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <div style="white-space:pre-wrap;padding:16px;border-radius:12px;background:#f4f4f6">${escapeHtml(message)}</div>
      <p style="margin:16px 0 0;font-size:13px;color:#67676f">Répondez directement à cet email pour écrire à ${escapeHtml(name)}.</p>
    </div>`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio : message de ${name}`,
      text: `${message}\n\n${name} <${email}>`,
      html,
    }),
  })

  if (!res.ok) {
    console.error('Resend error', res.status, await res.text().catch(() => ''))
    return json(502, { error: 'send_failed' })
  }
  return json(200, { ok: true })
}

export function GET() {
  return json(405, { error: 'method_not_allowed' })
}
