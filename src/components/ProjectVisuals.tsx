import type { ReactNode } from 'react'
import { useInView } from './ui'
import { useContent } from '../i18n'

/* =============================================================================
 *  Illustrations animées des cartes projets (100 % CSS / SVG, sauf le logo
 *  SOF-ELK qui provient du dépôt open source officiel).
 * ========================================================================== */

const i = (n: number) => ({ ['--i' as string]: n })

/* ---------- Portcullis : rapport terminal ---------- */
export function VisualTerminal() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25)
  const services = [
    { name: 'db', image: 'postgres:16', exp: 'HOST', color: 'text-white/60 bg-white/10' },
    { name: 'vaultwarden', image: 'vaultwarden/server:latest', exp: 'INTERNET', color: 'text-[#ff7a8c] bg-[#ff3d5a]/15' },
    { name: 'watchtower', image: 'containrrr/watchtower:1.7.1', exp: 'INTERNAL', color: 'text-[#8fb6ff] bg-[#2f7bff]/15' },
  ]
  const findings = [
    { sev: 'CRITICAL', id: 'PC-001', text: 'Docker socket mounted into watchtower', c: '#ff3d5a' },
    { sev: 'HIGH', id: 'PC-008', text: 'Default POSTGRES_PASSWORD', c: '#ff8a3d' },
    { sev: 'MEDIUM', id: 'PC-011', text: 'vaultwarden bypasses the proxy (:8081)', c: '#ffd23d' },
    { sev: 'LOW', id: 'PC-005', text: 'Mutable `latest` tag', c: '#6ea2ff' },
  ]
  return (
    <div ref={ref} className={`relative flex h-full w-full items-center justify-center overflow-hidden p-5 sm:p-8 ${inView ? 'is-in' : ''}`}>
      <div
        className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff3d5a, transparent 70%)' }}
      />
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-white/35">portcullis · zsh</span>
        </div>
        <div className="seq space-y-2 p-4 font-mono text-[11px] leading-relaxed text-white/75 sm:text-[12px]">
          <p style={i(0)}>
            <span className="text-build-light">$</span> portcullis scan ./homelab
          </p>
          <div style={i(1)} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#ff8a3d]/15 font-display text-xl font-bold text-[#ffab70]">
              C
            </span>
            <span className="text-white/60">
              score <span className="text-white">60/100</span> · 3 services · 4 findings
            </span>
          </div>
          {services.map((s, k) => (
            <div key={s.name} style={i(2 + k)} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-white/85">{s.name}</span>
              <span className="min-w-0 flex-1 truncate text-white/40">{s.image}</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] ${s.color}`}>{s.exp}</span>
            </div>
          ))}
          <div style={i(5)} className="h-px bg-white/[0.06]" />
          {findings.map((f, k) => (
            <div key={f.id} style={i(6 + k)} className="flex items-center gap-2">
              <span className="w-[68px] shrink-0 text-[10px] font-semibold" style={{ color: f.c }}>
                {f.sev}
              </span>
              <span className="text-white/40">{f.id}</span>
              <span className="min-w-0 truncate">{f.text}</span>
            </div>
          ))}
          <p style={i(10)} className="caret text-build-light">
            $
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Latent : secteurs récupérés + timeline ---------- */
export function VisualTimeline() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25)
  const v = useContent().ui.projects.visuals
  // 0 = vide, 1 = effacé, 2 = récupéré
  const cells = Array.from({ length: 84 }, (_, k) => {
    const v = (k * 37 + (k % 7) * 11) % 13
    return v < 4 ? 2 : v < 6 ? 1 : 0
  })
  const rows = [
    { t: '09:41:07', id: '4624', msg: v.latentRows[0], lvl: 'L0' },
    { t: '09:43:52', id: '4688', msg: v.latentRows[1], lvl: 'L1' },
    { t: '09:44:10', id: '7045', msg: v.latentRows[2], lvl: 'L2' },
    { t: '09:47:31', id: '4720', msg: v.latentRows[3], lvl: 'L3' },
    { t: '09:52:03', id: '1102', msg: v.latentRows[4], lvl: 'L0', alert: true },
  ]
  const lvlColor: Record<string, string> = {
    L0: 'bg-[#30d158]/15 text-[#5fe08a]',
    L1: 'bg-[#2f7bff]/15 text-[#8fb6ff]',
    L2: 'bg-[#a35bff]/15 text-[#c79bff]',
    L3: 'bg-[#ff8a3d]/15 text-[#ffab70]',
  }
  return (
    <div ref={ref} className={`relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden p-5 sm:p-8 ${inView ? 'is-in' : ''}`}>
      <div
        className="pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #a35bff, transparent 70%)' }}
      />
      <div className="relative mx-auto w-full max-w-[560px]">
        <p className="mb-2 flex items-center justify-between font-mono text-[11px] text-white/40">
          <span>{v.latentSource}</span>
          <span className="text-[#8fb6ff]">{v.latentCount}</span>
        </p>
        <div className="grid grid-cols-[repeat(21,minmax(0,1fr))] gap-[3px]">
          {cells.map((c, k) => (
            <span
              key={k}
              className={`aspect-square rounded-[2px] ${
                c === 2 ? 'cell-blink bg-[#2f7bff]' : c === 1 ? 'bg-[#ff3d5a]/70' : 'bg-white/[0.06]'
              }`}
              style={c === 2 ? i(k % 12) : undefined}
            />
          ))}
        </div>
      </div>
      <div className="seq relative mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] font-mono text-[11px] sm:text-[12px]">
        {rows.map((r, k) => (
          <div
            key={r.id}
            style={i(k)}
            className={`flex items-center gap-3 border-b border-white/[0.05] px-3.5 py-2 last:border-0 ${
              r.alert ? 'bg-[#ff3d5a]/10' : ''
            }`}
          >
            <span className="text-white/40">{r.t}</span>
            <span className={r.alert ? 'text-[#ff7a8c]' : 'text-white/55'}>{r.id}</span>
            <span className={`min-w-0 flex-1 truncate ${r.alert ? 'text-[#ff9aa8]' : 'text-white/80'}`}>{r.msg}</span>
            <span className={`rounded px-1.5 py-0.5 text-[10px] ${lvlColor[r.lvl]}`}>{r.lvl}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- SOF-ELK : tableau de bord Kibana ---------- */
export function VisualDashboard() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25)
  const bars = [22, 30, 26, 41, 35, 48, 44, 62, 58, 95, 88, 52, 46, 40, 57, 49, 38, 33, 45, 39, 28, 31, 25, 20]
  const ports = [
    { p: '443 / https', v: 92 },
    { p: '22 / ssh', v: 64 },
    { p: '3389 / rdp', v: 41, alert: true },
    { p: '445 / smb', v: 27 },
  ]
  return (
    <div ref={ref} className={`relative flex h-full w-full items-center justify-center overflow-hidden p-5 sm:p-8 ${inView ? 'is-in' : ''}`}>
      <div
        className="pointer-events-none absolute -bottom-20 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #30d158, transparent 70%)' }}
      />
      <div className="relative w-full max-w-[580px] overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0d] shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2.5">
          <span className="rounded-md bg-white px-2 py-1">
            <img
              src="/images/projects/sof-elk-logo.png"
              alt="Logo SOF-ELK"
              loading="lazy"
              className="h-6 w-auto sm:h-8"
            />
          </span>
          <span className="font-mono text-[10px] text-white/35 sm:text-[11px]">NetFlow · Last 24 hours</span>
        </div>
        <div className="space-y-3 p-4">
          <div className="grid grid-cols-3 gap-2 font-mono">
            {[
              { k: 'Events', v: '1.2M' },
              { k: 'Flows', v: '84.3k' },
              { k: 'Src IPs', v: '312' },
            ].map((m) => (
              <div key={m.k} className="rounded-lg bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-white/35">{m.k}</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-white">{m.v}</p>
              </div>
            ))}
          </div>
          <div className="flex h-24 items-end gap-[3px] rounded-lg bg-white/[0.03] p-2.5 sm:h-28">
            {bars.map((h, k) => (
              <span
                key={k}
                className="bar-grow flex-1 rounded-t-[2px]"
                style={{
                  height: `${h}%`,
                  background: k === 9 || k === 10 ? '#ff3d5a' : 'linear-gradient(180deg,#5fe08a,#1f9d55)',
                  opacity: k === 9 || k === 10 ? 1 : 0.75,
                  ...i(k),
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-4">
            <div className="space-y-1.5 font-mono text-[10.5px]">
              {ports.map((p) => (
                <div key={p.p} className="flex items-center gap-2">
                  <span className={`w-20 shrink-0 ${p.alert ? 'text-[#ff7a8c]' : 'text-white/55'}`}>{p.p}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${p.v}%`, background: p.alert ? '#ff3d5a' : '#5fe08a' }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <div
              className="relative h-[72px] w-[72px] rounded-full"
              style={{ background: 'conic-gradient(#5fe08a 0 58%, #2f7bff 58% 82%, #ff8a3d 82% 94%, #ff3d5a 94% 100%)' }}
            >
              <span className="absolute inset-[14px] grid place-items-center rounded-full bg-[#0b0b0d] font-mono text-[9px] text-white/50">
                TCP
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Playbook SOAR : exécution du flux ---------- */
function Node({ children, n, tone = 'neutral', className = '' }: { children: ReactNode; n: number; tone?: 'neutral' | 'build' | 'break' | 'start'; className?: string }) {
  const tones = {
    neutral: 'border-white/10 bg-white/[0.04] text-white/80',
    start: 'border-white/15 bg-white text-black',
    build: 'border-[#2f7bff]/40 bg-[#2f7bff]/12 text-[#a9c6ff]',
    break: 'border-[#ff3d5a]/40 bg-[#ff3d5a]/12 text-[#ffa3b0]',
  }
  return (
    <div className={`node-pulse rounded-xl border px-3 py-2 text-center font-mono text-[10.5px] sm:text-[11.5px] ${tones[tone]} ${className}`} style={i(n)}>
      {children}
    </div>
  )
}

function Connector() {
  return <span className="mx-auto block h-4 w-px bg-white/15" />
}

export function VisualFlow() {
  const f = useContent().ui.projects.visuals.soar
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-5 sm:p-8">
      <div className="dot-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className="relative w-full max-w-[400px]">
        <p className="mb-3 text-center font-mono text-[11px] text-white/35">triage-phishing.yml · Cortex XSOAR</p>
        <Node n={0} tone="start" className="mx-auto w-fit rounded-full px-4">
          ● {f[0]}
        </Node>
        <Connector />
        <Node n={1}>{f[1]}</Node>
        <Connector />
        <Node n={2}>{f[2]}</Node>
        <Connector />
        <Node n={3} className="mx-auto w-fit">
          {f[3]}
        </Node>
        <svg viewBox="0 0 200 20" className="h-5 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M100 0 V8 M50 8 H150 M50 8 V20 M150 8 V20" stroke="rgba(255,255,255,0.15)" fill="none" />
        </svg>
        <div className="grid grid-cols-2 gap-3">
          <Node n={4} tone="break">
            {f[4]}
          </Node>
          <Node n={4} tone="build">
            {f[5]}
          </Node>
        </div>
        <svg viewBox="0 0 200 20" className="h-5 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M50 0 V12 M150 0 V12 M50 12 H150 M100 12 V20" stroke="rgba(255,255,255,0.15)" fill="none" />
        </svg>
        <Node n={5}>{f[6]}</Node>
      </div>
    </div>
  )
}

/* ---------- Écosystème contrôle technique : web + mobile ---------- */
export function VisualDevices() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute -bottom-24 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2f7bff, transparent 70%)' }}
      />
      <div className="absolute left-[8%] top-[14%] h-[72%] w-[72%] overflow-hidden rounded-xl border border-white/10 bg-[#1b1b1f] shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-4 w-1/3 rounded-full bg-white/5" />
        </div>
        <div className="flex h-full">
          <div className="hidden w-1/5 space-y-2 border-r border-white/5 p-3 sm:block">
            {[60, 80, 50, 70, 40].map((w, k) => (
              <div key={k} className={`h-2 rounded-full ${k === 1 ? 'bg-[#2f7bff]' : 'bg-white/10'}`} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex-1 space-y-3 p-4">
            <div className="grid grid-cols-3 gap-2">
              {['#2f7bff', '#30d158', '#ff8a3d'].map((c) => (
                <div key={c} className="rounded-lg bg-white/5 p-2">
                  <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
                  <div className="mt-2 h-3 w-3/4 rounded-full" style={{ background: c, opacity: 0.85 }} />
                </div>
              ))}
            </div>
            <div className="flex h-[38%] items-end gap-1.5 rounded-lg bg-white/[0.03] p-3">
              {[40, 65, 50, 80, 60, 90, 72, 95, 68, 84].map((h, k) => (
                <div
                  key={k}
                  className="flex-1 rounded-t-sm"
                  style={{ height: `${h}%`, background: 'linear-gradient(180deg,#00b2ff,#2f7bff)', opacity: 0.35 + k * 0.06 }}
                />
              ))}
            </div>
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md bg-white/10" />
                <div className="h-2 flex-1 rounded-full bg-white/10" />
                <div className="h-2 w-10 rounded-full bg-[#30d158]/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="float-slow absolute bottom-[8%] right-[8%] h-[64%] aspect-[9/19] rounded-[22px] border border-white/15 bg-black p-1.5 shadow-2xl">
        <div className="relative h-full w-full overflow-hidden rounded-[17px] bg-[#1b1b1f]">
          <div className="mx-auto mt-1.5 h-3 w-1/3 rounded-full bg-black" />
          <div className="space-y-2 p-2.5">
            <div className="h-2 w-2/3 rounded-full bg-white/20" />
            <div className="h-14 rounded-lg" style={{ background: 'linear-gradient(135deg,#2f7bff,#00b2ff)' }} />
            {[0, 1, 2, 3].map((k) => (
              <div key={k} className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded bg-white/10" />
                <div className="h-1.5 flex-1 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------- Conseil de l'Europe : bouclier ---------- */
export function VisualShield() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div
        className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, #ff3d5a, #ff8a3d 40%, transparent 70%)' }}
      />
      <div className="absolute left-1/2 top-1/2 h-[min(60%,300px)] aspect-[5/6] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="shield-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff3d5a" />
              <stop offset="1" stopColor="#ff8a3d" />
            </linearGradient>
          </defs>
          <path
            d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
            fill="rgba(255,61,90,0.08)"
            stroke="url(#shield-g)"
            strokeWidth="0.6"
          />
          <path d="m9 12 2 2 4-4" stroke="url(#shield-g)" strokeWidth="0.9" />
        </svg>
        <div className="absolute inset-x-[12%] top-0 h-full overflow-hidden">
          <div className="scanline h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff8a3d] to-transparent shadow-[0_0_18px_#ff8a3d]" />
        </div>
      </div>
      <div className="absolute bottom-[8%] left-1/2 flex -translate-x-1/2 gap-2 font-mono text-[11px] text-white/45">
        <span className="rounded-full border border-white/10 px-2.5 py-1">Vuln scan</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">Hardening</span>
        <span className="rounded-full border border-white/10 px-2.5 py-1">Compliance</span>
      </div>
    </div>
  )
}

/* ---------- Prochaine release : orbe ---------- */
export function VisualOrb() {
  const soon = useContent().ui.projects.visuals.soon
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 h-[min(56%,320px)] aspect-square -translate-x-1/2 -translate-y-1/2">
        <div className="ring ring-pulse h-full w-full" />
        <div className="ring ring-pulse h-full w-full" style={{ animationDelay: '1.3s' }} />
        <div className="ring ring-pulse h-full w-full" style={{ animationDelay: '2.6s' }} />
        <div className="orb absolute inset-[18%] rounded-full" />
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      </div>
      <p className="shimmer label absolute inset-x-0 bottom-[9%] text-center !tracking-[0.3em]">{soon}</p>
    </div>
  )
}

export const VISUALS = {
  terminal: VisualTerminal,
  timeline: VisualTimeline,
  dashboard: VisualDashboard,
  flow: VisualFlow,
  devices: VisualDevices,
  shield: VisualShield,
  orb: VisualOrb,
}
