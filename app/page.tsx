'use client'

import { Check, ChevronDown, ChevronUp, MessageCircle, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

type Plan = {
  name: string
  description: string
  fleet: string
  contract: string
  annualPrice: string
  totalPrice: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
//  { name: 'Básico', description: 'Para começar com uma operação enxuta, organizada e eficiente.', fleet: 'Até 10 veículos', contract: '3 anos', annualPrice: 'R$ 24.000', totalPrice: 'R$ 72.000', features: ['Gestão de até 10 veículos', 'Contrato de 3 anos', 'Cobrança anual simplificada', 'Suporte pelo WhatsApp'] },
  { name: 'Essencial', description: 'O equilíbrio ideal entre prazo, previsibilidade e tranquilidade.', fleet: 'Até 50 veículos', contract: '5 anos', annualPrice: 'R$ 24.000', totalPrice: 'R$ 120.000', features: ['Gestão de até 50 veículos', 'Contrato de 5 anos', 'Cobrança anual simplificada', 'Suporte pelo WhatsApp'], popular: true },
  { name: 'Profissional', description: 'Mais capacidade para empresas que precisam crescer com controle.', fleet: 'Até 100 veículos', contract: '10 anos', annualPrice: 'R$ 30.000', totalPrice: 'R$ 300.000', features: ['Gestão de até 100 veículos', 'Contrato de 10 anos', 'Cobrança anual simplificada', 'Suporte prioritário'] },
  { name: 'Premium', description: 'A estrutura completa para operações grandes e sem limite de frota.', fleet: 'veículos ilimitados', contract: '10 anos', annualPrice: 'R$ 44.000', totalPrice: 'R$ 440.000', features: ['Gestão de veículos ilimitados', 'Contrato de 10 anos', 'Cobrança anual simplificada', 'Atendimento dedicado'] },
]

function Brand() {
  return <span className="brand-mark" aria-label="TLGD">TLG<span>D</span></span>
}

export default function Page() {
  const [openPlan, setOpenPlan] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [light, setLight] = useState(false)

  function buyPlan(plan: Plan) {
    const message = `Olá! Tenho interesse no plano ${plan.name} da TLGD. Frota: ${plan.fleet}. Contrato: ${plan.contract}. Valor anual: ${plan.annualPrice}. Valor total: ${plan.totalPrice}. Gostaria de saber mais.`
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
            <a href="#planos" className={`hidden rounded-full px-5 py-2.5 text-sm font-semibold transition sm:block ${dark ? 'bg-white text-black hover:bg-[#4da3ff]' : 'bg-[#15171a] text-white hover:bg-[#4da3ff]'}`}>Ver planos</a>
          </div>
        </div>
      </header>

      <section className={`hero-bg px-6 pb-24 pt-24 text-center md:pb-28 md:pt-28 ${light ? 'hero-light' : ''}`}>
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-[#4da3ff]">Planos TLGD</p>
        <h1 className="mx-auto max-w-4xl text-5xl font-light tracking-[-0.06em] md:text-8xl">Veja o lucro real da sua operação</h1>
        <p className={`mx-auto mt-7 max-w-xl text-base leading-7 md:text-lg ${light ? 'text-black/65' : 'text-white/65'}`}>Acompanhe seus gastos com combustível e manutenção preventiva para tomar decisões melhores e aumentar a rentabilidade do seu negócio.</p>
      </section>

      <section id="planos" className="mx-auto max-w-[1180px] px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-sm font-semibold text-[#4da3ff]">Escolha como trabalhar</p><h2 className="mt-2 text-3xl font-light tracking-tight md:text-4xl">Planos claros, sem surpresas.</h2></div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="text-xs font-semibold text-[#4da3ff]">Tabela oficial TLGD</span>
            <span className={`rounded-full px-4 py-2 text-sm ${dark ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/60'}`}>Contratos anuais</span>
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
              className={`relative flex flex-col overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(77,163,255,0.18)] motion-reduce:transition-none ${selectedPlan === plan.name ? 'scale-[1.02] animate-[plan-pop_450ms_ease-out] shadow-[0_20px_55px_rgba(77,163,255,0.28)]' : ''} ${dark ? 'border-white/10 bg-[#141619]' : 'border-black/10 bg-white'} ${plan.popular ? 'ring-2 ring-[#4da3ff]' : ''}`}>
              {plan.popular && <div className="bg-[#4da3ff] py-2 text-center text-[11px] font-bold uppercase tracking-widest text-[#221006]">Mais popular</div>}
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="text-2xl font-medium tracking-tight">{plan.name}</h3>
                <p className={`mt-4 min-h-[78px] text-sm leading-6 ${dark ? 'text-white/55' : 'text-black/55'}`}>{plan.description}</p>
                <div className="mt-7 min-h-[112px]">
                  <p className={`text-xs uppercase tracking-wider ${dark ? 'text-white/45' : 'text-black/45'}`}>Valor anual</p>
                  <p className="mt-1 text-3xl font-light tracking-tight">{plan.annualPrice}</p>
                  <p className={`mt-2 text-xs ${dark ? 'text-white/40' : 'text-black/40'}`}>Total do contrato: {plan.totalPrice}</p>
                </div>
                <div className={`mb-1 grid grid-cols-2 gap-2 rounded-xl p-3 text-xs ${dark ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div><span className={`block ${dark ? 'text-white/40' : 'text-black/40'}`}>Frota</span><strong className="mt-1 block font-medium">{plan.fleet}</strong></div>
                  <div><span className={`block ${dark ? 'text-white/40' : 'text-black/40'}`}>Contrato</span><strong className="mt-1 block font-medium">{plan.contract}</strong></div>
                </div>
                <button onClick={() => buyPlan(plan)} className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${plan.popular ? 'bg-[#4da3ff] text-[#221006] hover:bg-[#78bbff]' : dark ? 'border border-white/20 hover:bg-white hover:text-black' : 'border border-black/20 hover:bg-black hover:text-white'}`}><MessageCircle data-icon="inline-start" /> Comprar agora</button>
                <div className={`mt-8 border-t pt-6 ${dark ? 'border-white/10' : 'border-black/10'}`}><p className="text-sm font-semibold">O que está incluído:</p><ul className={`mt-4 flex flex-col gap-3 overflow-hidden transition-all ${expanded ? 'max-h-96' : 'max-h-[112px]'}`}>{plan.features.map((feature) => <li key={feature} className={`flex gap-2 text-sm leading-5 ${dark ? 'text-white/55' : 'text-black/55'}`}><Check className="mt-0.5 shrink-0 text-[#4da3ff]" />{feature}</li>)}</ul><button onClick={() => setOpenPlan(expanded ? null : plan.name)} className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#4da3ff]">{expanded ? 'Ver menos' : 'Ver benefícios'}{expanded ? <ChevronUp /> : <ChevronDown />}</button></div>
              </div>
            </article>
          })}
        </div>
      </section>

      <section id="beneficios" className={`border-y px-6 py-20 text-center ${dark ? 'border-white/10 bg-[#101214]' : 'border-black/10 bg-white'}`}><p className="text-sm font-semibold text-[#4da3ff]">TLGD para o seu negócio</p><h2 className="mt-3 text-3xl font-light">Mais controle para aumentar seu lucro</h2><p className={`mx-auto mt-4 max-w-lg text-sm leading-6 ${dark ? 'text-white/55' : 'text-black/55'}`}>Tenha uma visão clara dos custos da sua operação, identifique oportunidades de economia e planeje a manutenção preventiva com mais segurança.</p></section>
      <footer id="contato" className={`px-6 py-10 text-center text-sm ${dark ? 'bg-[#08090b] text-white/50' : 'bg-[#f5f6f8] text-black/50'}`}><Brand /><p className="mt-3">Fale com a TLGD pelo WhatsApp: +55 21 99588-8049</p></footer>
    </main>
  )
}
