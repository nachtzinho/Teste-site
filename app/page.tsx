'use client'

import { Check, ChevronDown, ChevronUp, MessageCircle, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

type Plan = {
  name: string
  description: string
  price: string
  period: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  { name: 'Essencial', description: 'Para quem está começando e precisa assinar documentos com praticidade.', price: '29', period: '/mês', features: ['Até 5 documentos por mês', 'Assinatura eletrônica simples', 'Acesso pelo celular e computador', 'Suporte via WhatsApp'] },
  { name: 'Profissional', description: 'Para profissionais e pequenas equipes que querem mais agilidade.', price: '59', period: '/mês por usuário', features: ['Até 30 documentos por mês', 'Modelos reutilizáveis', 'Compartilhamento com a equipe', 'Histórico e acompanhamento', 'Suporte prioritário'], popular: true },
  { name: 'Empresarial', description: 'Para empresas que precisam escalar seus acordos com segurança.', price: '99', period: '/mês por usuário', features: ['Documentos ilimitados', 'Fluxos de aprovação', 'Personalização com sua marca', 'Gestão de equipe', 'Atendimento dedicado'] },
  { name: 'Sob medida', description: 'Uma solução personalizada para as necessidades do seu negócio.', price: 'Fale conosco', period: '', features: ['Tudo do plano Empresarial', 'Integrações personalizadas', 'Onboarding especializado', 'Condições comerciais exclusivas'] },
]

function Brand() {
  return <span className="brand-mark" aria-label="TLGD">TLG<span>D</span></span>
}

export default function Page() {
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual')
  const [openPlan, setOpenPlan] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [light, setLight] = useState(false)

  function buyPlan(plan: Plan) {
    const message = `Olá! Tenho interesse no plano ${plan.name} da TLGD${billing === 'annual' ? ' (cobrança anual)' : ' (cobrança mensal)'}. Gostaria de saber mais.`
    window.open(`https://wa.me/5521995888049?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  const dark = !light
  return (
    <main className={`min-h-screen transition-colors duration-300 ${dark ? 'bg-[#08090b] text-white' : 'bg-[#f5f6f8] text-[#15171a]'}`}>
      <header className={`sticky top-0 z-10 border-b backdrop-blur-xl ${dark ? 'border-white/10 bg-[#08090b]/85' : 'border-black/10 bg-white/85'}`}>
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5">
          <Brand />
          <nav className={`hidden items-center gap-9 text-sm md:flex ${dark ? 'text-white/60' : 'text-black/60'}`} aria-label="Navegação principal">
            <a href="#planos" className={dark ? 'text-white' : 'text-black'}>Planos e preços</a>
            <a href="#beneficios" className="transition hover:opacity-100">Benefícios</a>
            <a href="#contato" className="transition hover:opacity-100">Fale conosco</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLight(!light)} aria-label={light ? 'Ativar tema escuro' : 'Ativar tema claro'} className={`flex size-10 items-center justify-center rounded-full border transition ${dark ? 'border-white/15 text-white/75 hover:bg-white/10' : 'border-black/10 text-black/65 hover:bg-black/5'}`}>
              {light ? <Moon data-icon="inline-start" /> : <Sun data-icon="inline-start" />}
            </button>
            <a href="#planos" className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition sm:block ${dark ? 'bg-white text-black hover:bg-[#ff8a3d]' : 'bg-[#15171a] text-white hover:bg-[#ff8a3d]'}`}>Ver planos</a>
          </div>
        </div>
      </header>

      <section className={`hero-bg px-6 pb-24 pt-24 text-center md:pb-28 md:pt-28 ${light ? 'hero-light' : ''}`}>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#ff8a3d]">Planos TLGD</p>
        <h1 className="mx-auto max-w-4xl text-5xl font-light tracking-[-0.06em] md:text-8xl">Simplifique seus acordos</h1>
        <p className={`mx-auto mt-7 max-w-xl text-base leading-7 md:text-lg ${light ? 'text-black/65' : 'text-white/65'}`}>Assine, envie e acompanhe seus documentos de forma simples, segura e sem burocracia.</p>
      </section>

      <section id="planos" className="mx-auto max-w-[1180px] px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold text-[#ff8a3d]">Escolha como trabalhar</p><h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Planos claros, sem surpresas.</h2></div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-xs font-semibold text-[#ff8a3d]">Economize no anual</span>
            <div className={`flex items-center rounded-full p-1 text-sm ${dark ? 'bg-white/10' : 'bg-black/5'}`}>
              <button onClick={() => setBilling('annual')} className={`rounded-full px-5 py-2.5 transition ${billing === 'annual' ? (dark ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-60'}`}>Anual</button>
              <button onClick={() => setBilling('monthly')} className={`rounded-full px-5 py-2.5 transition ${billing === 'monthly' ? (dark ? 'bg-white text-black' : 'bg-black text-white') : 'opacity-60'}`}>Mensal</button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan) => {
            const expanded = openPlan === plan.name
            return <article
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelectedPlan(plan.name)
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Selecionar plano ${plan.name}`}
              className={`relative flex flex-col overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(255,138,61,0.16)] motion-reduce:transition-none ${selectedPlan === plan.name ? 'scale-[1.02] animate-[plan-pop_450ms_ease-out] shadow-[0_20px_55px_rgba(255,138,61,0.24)]' : ''} ${dark ? 'border-white/10 bg-[#141619]' : 'border-black/10 bg-white'} ${plan.popular ? 'ring-2 ring-[#ff8a3d]' : ''}`}>
              {plan.popular && <div className="bg-[#ff8a3d] py-2 text-center text-[11px] font-bold uppercase tracking-widest text-[#221006]">Mais popular</div>}
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="text-2xl font-medium tracking-tight">{plan.name}</h3>
                <p className={`mt-4 min-h-[78px] text-sm leading-6 ${dark ? 'text-white/55' : 'text-black/55'}`}>{plan.description}</p>
                <div className="mt-7 min-h-[80px]">{plan.name === 'Sob medida' ? <p className="text-2xl font-medium leading-8">{plan.price}</p> : <><span className="text-sm">R$ </span><span className="text-5xl font-light tracking-tight">{billing === 'annual' ? Math.round(Number(plan.price) * 0.8) : plan.price}</span><span className={`ml-1 text-xs ${dark ? 'text-white/45' : 'text-black/45'}`}>{plan.period}</span></>}{billing === 'annual' && plan.name !== 'Sob medida' && <p className={`mt-1 text-xs ${dark ? 'text-white/40' : 'text-black/40'}`}>Cobrado anualmente</p>}</div>
                <button onClick={() => buyPlan(plan)} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${plan.popular ? 'bg-[#ff8a3d] text-[#221006] hover:bg-[#ff9f60]' : dark ? 'border border-white/20 hover:bg-white hover:text-black' : 'border border-black/20 hover:bg-black hover:text-white'}`}><MessageCircle data-icon="inline-start" /> Comprar agora</button>
                <div className={`mt-8 border-t pt-6 ${dark ? 'border-white/10' : 'border-black/10'}`}><p className="text-sm font-semibold">O que está incluído:</p><ul className={`mt-4 flex flex-col gap-3 overflow-hidden transition-all ${expanded ? 'max-h-96' : 'max-h-[112px]'}`}>{plan.features.map((feature) => <li key={feature} className={`flex gap-2 text-sm leading-5 ${dark ? 'text-white/55' : 'text-black/55'}`}><Check className="mt-0.5 shrink-0 text-[#ff8a3d]" />{feature}</li>)}</ul><button onClick={() => setOpenPlan(expanded ? null : plan.name)} className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#ff8a3d]">{expanded ? 'Ver menos' : 'Ver benefícios'}{expanded ? <ChevronUp /> : <ChevronDown />}</button></div>
              </div>
            </article>
          })}
        </div>
      </section>

      <section id="beneficios" className={`border-y px-6 py-20 text-center ${dark ? 'border-white/10 bg-[#101214]' : 'border-black/10 bg-white'}`}><p className="text-sm font-semibold text-[#ff8a3d]">TLGD para o seu negócio</p><h2 className="mt-3 text-3xl font-light">Feito para deixar tudo mais simples</h2><p className={`mx-auto mt-4 max-w-lg text-sm leading-6 ${dark ? 'text-white/55' : 'text-black/55'}`}>Escolha o plano ideal e fale com a nossa equipe pelo WhatsApp. A TLGD ajuda você a fechar acordos com mais agilidade.</p></section>
      <footer id="contato" className={`px-6 py-10 text-center text-sm ${dark ? 'bg-[#08090b] text-white/50' : 'bg-[#f5f6f8] text-black/50'}`}><Brand /><p className="mt-3">Fale com a TLGD pelo WhatsApp: +55 21 99588-8049</p></footer>
    </main>
  )
}
