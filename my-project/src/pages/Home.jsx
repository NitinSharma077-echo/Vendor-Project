import { useState } from 'react'

const stages = [
  {
    id: 1,
    title: 'Raw Material Procurement',
    desc: 'Automated PO generation, vendor evaluation, and real-time material tracking from source to store.',
    diagram: 'procurement',
  },
  {
    id: 2,
    title: 'Production Planning',
    desc: 'Intelligent scheduling, capacity planning, and real-time work order management across all production lines.',
    diagram: 'planning',
  },
  {
    id: 3,
    title: 'Shop Floor Operations',
    desc: 'Live monitoring of machines, operators, and output with automated alerts for deviations.',
    diagram: 'shopfloor',
  },
  {
    id: 4,
    title: 'Quality Control',
    desc: 'Automated inspection workflows, defect tracking, and compliance reporting in one place.',
    diagram: 'quality',
  },
  {
    id: 5,
    title: 'Inventory Management',
    desc: 'Real-time stock visibility across warehouses with demand forecasting and auto-replenishment.',
    diagram: 'inventory',
  },
  {
    id: 6,
    title: 'Dispatch & Shipping',
    desc: 'Streamlined order fulfillment, carrier integration, and delivery tracking end-to-end.',
    diagram: 'dispatch',
  },
]

function ProcurementDiagram() {
  return (
    <div className="flex items-center justify-center w-full h-full px-4 py-8 select-none">
      {/* Vendors */}
      <div className="flex flex-col gap-4 mr-6">
        {['Vendor 1', 'Vendor 2', 'Vendor 3'].map((v, i) => (
          <div
            key={v}
            className="w-28 rounded-xl border border-indigo-400/40 bg-indigo-900/50 px-3 py-2.5 flex flex-col gap-1.5"
          >
            <div className="w-6 h-4 rounded bg-indigo-500/60" />
            <div className="w-full h-1.5 rounded bg-indigo-400/40" />
            <div className="w-3/4 h-1.5 rounded bg-indigo-400/30" />
            <p className="text-[11px] text-indigo-300 font-medium mt-0.5">{v}</p>
          </div>
        ))}
      </div>

      {/* Dashed lines to hub */}
      <svg width="80" height="160" className="shrink-0">
        {[27, 80, 133].map((y, i) => (
          <line
            key={i}
            x1="0"
            y1={y}
            x2="80"
            y2="80"
            stroke="#6366f1"
            strokeWidth="1.5"
            strokeDasharray="5,4"
            opacity="0.6"
          />
        ))}
        {[27, 80, 133].map((y, i) => (
          <circle key={i} cx="0" cy={y} r="4" fill="#6366f1" opacity="0.7" />
        ))}
      </svg>

      {/* ERP Hub */}
      <div className="relative mx-4 shrink-0">
        <div className="w-24 h-24 rounded-full border-2 border-indigo-400/60 bg-indigo-800/60 flex flex-col items-center justify-center shadow-lg shadow-indigo-900/50">
          <span className="text-indigo-300 font-bold text-sm">ERP</span>
          <span className="text-indigo-400 text-[10px]">Hub</span>
        </div>
        <div className="absolute inset-0 rounded-full border border-indigo-500/20 scale-125" />
      </div>

      {/* Lines to racks */}
      <svg width="80" height="160" className="shrink-0">
        {[27, 80, 133].map((y, i) => (
          <line
            key={i}
            x1="0"
            y1="80"
            x2="80"
            y2={y}
            stroke="#6366f1"
            strokeWidth="1.5"
            opacity="0.6"
          />
        ))}
      </svg>

      {/* Racks */}
      <div className="flex flex-col gap-4 ml-2">
        {['Rack A', 'Rack B', 'Rack C'].map((r) => (
          <div
            key={r}
            className="w-28 rounded-xl border border-indigo-400/40 bg-indigo-900/50 px-3 py-2.5 flex items-center gap-2"
          >
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-3 h-5 rounded-sm bg-indigo-500/50" />
              ))}
            </div>
            <p className="text-[11px] text-indigo-300 font-medium">{r}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenericDiagram({ stage }) {
  const icons = {
    planning: ['MO-001', 'MO-002', 'MO-003'],
    shopfloor: ['CNC-1', 'CNC-2', 'Lathe'],
    quality: ['Inspect', 'Test', 'Approve'],
    inventory: ['Zone A', 'Zone B', 'Zone C'],
    dispatch: ['Order', 'Pack', 'Ship'],
  }
  const items = icons[stage] || ['Step 1', 'Step 2', 'Step 3']

  return (
    <div className="flex items-center justify-center w-full h-full gap-6 select-none py-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-3">
          <div className="w-20 h-16 rounded-xl border border-indigo-400/40 bg-indigo-900/50 flex items-center justify-center">
            <span className="text-indigo-300 text-xs font-semibold">{item}</span>
          </div>
          {i < items.length - 1 && (
            <div className="absolute translate-x-24 w-8 h-0.5 bg-indigo-500/50" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Home({ darkMode }) {
  const [activeStage, setActiveStage] = useState(0)

  const stage = stages[activeStage]

  return (
    <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* ── Hero Section ── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-28 pb-20 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-20 ${darkMode ? 'bg-indigo-600' : 'bg-indigo-400'}`} />
        </div>

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 ${
          darkMode
            ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300'
            : 'bg-indigo-50 border-indigo-200 text-indigo-700'
        }`}>
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          v4.2 Now Live: AI-Powered Predictive Maintenance
        </div>

        {/* Heading */}
        <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight max-w-4xl mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          The Future of{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
            Manufacturing
          </span>{' '}
          is Here.
        </h1>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl max-w-2xl leading-relaxed mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          One platform to unify your shop floor, inventory, and analytics.
          Decrease downtime by 34% and boost OEE within your first 30 days.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5"
          >
            Start Free Trial
            <span>→</span>
          </a>
          <a
            href="#"
            className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-base border transition-all duration-200 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                : 'border-gray-300 text-gray-700 hover:bg-white hover:border-gray-400 shadow-sm'
            }`}
          >
            Book Live Demo
          </a>
        </div>

        {/* Stats */}
        <div className={`mt-20 flex flex-wrap justify-center gap-12 border-t pt-12 w-full max-w-3xl ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {[
            { value: '34%', label: 'Downtime Reduction' },
            { value: '2.4×', label: 'OEE Improvement' },
            { value: '30 days', label: 'Time to Value' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-4xl font-black mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Manufacturing Process Section ── */}
      <section className="px-6 pb-32 flex flex-col items-center">
        <div className="text-center mb-10">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            End-to-End Workflow
          </p>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            See How It Works
          </h2>
        </div>

        {/* Big dark card */}
        <div
          className="w-full max-w-6xl rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, #0f0f2e 0%, #12123a 50%, #0d0d28 100%)',
            boxShadow: '0 0 80px rgba(99,102,241,0.15), 0 30px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Glow border */}
          <div className="absolute inset-0 rounded-3xl"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.3), transparent 60%)', pointerEvents: 'none' }} />

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">
                ERP Manufacturing — Process {activeStage + 1}/{stages.length}
              </span>
            </div>
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {stages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStage(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === activeStage
                      ? 'w-8 h-2.5 bg-indigo-400'
                      : 'w-2.5 h-2.5 bg-indigo-700 hover:bg-indigo-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-[1fr_320px] min-h-[400px]">
            {/* Diagram */}
            <div className="flex items-center justify-center border-r border-indigo-500/20 p-6 min-h-[340px]">
              {stage.diagram === 'procurement' ? (
                <div className="w-full">
                  <ProcurementDiagram />
                  <p className="text-center text-indigo-400 text-sm font-medium mt-2">Procurement Flow</p>
                </div>
              ) : (
                <div className="w-full">
                  <GenericDiagram stage={stage.diagram} />
                  <p className="text-center text-indigo-400 text-sm font-medium mt-2">{stage.title} Flow</p>
                </div>
              )}
            </div>

            {/* Stage info */}
            <div className="flex flex-col p-6 gap-4">
              <div>
                <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">
                  Stage {activeStage + 1}
                </p>
                <h3 className="text-2xl font-black text-white mb-3">{stage.title}</h3>
                <p className="text-sm text-indigo-200/70 leading-relaxed">{stage.desc}</p>
              </div>

              {/* Stage list */}
              <div className="flex flex-col gap-1.5 mt-2">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(i)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      i === activeStage
                        ? 'bg-indigo-600/30 border border-indigo-500/50 text-white'
                        : 'text-indigo-300/50 hover:text-indigo-200 hover:bg-indigo-800/20'
                    }`}
                  >
                    {i === activeStage && (
                      <span className="inline-block w-4 h-4 mr-2 rounded bg-indigo-500 text-white text-[9px] font-bold align-middle leading-4 text-center">▶</span>
                    )}
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className={`px-6 pb-32 ${darkMode ? '' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Everything You Need
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Powerful tools built for modern manufacturing operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '⚡',
                title: 'Real-time Monitoring',
                desc: 'Live dashboards with sub-second data refresh across all machines and production lines.',
              },
              {
                icon: '🤖',
                title: 'AI Predictive Maintenance',
                desc: 'ML models that predict equipment failures 48 hours in advance, slashing unplanned downtime.',
              },
              {
                icon: '📦',
                title: 'Smart Inventory',
                desc: 'Automated replenishment triggered by real demand signals, not guesswork.',
              },
              {
                icon: '📊',
                title: 'OEE Analytics',
                desc: 'Deep visibility into availability, performance, and quality with drill-down root cause analysis.',
              },
              {
                icon: '🔗',
                title: 'ERP Integrations',
                desc: 'Native connectors for SAP, Oracle, and 50+ systems. No custom dev work required.',
              },
              {
                icon: '🛡️',
                title: 'Compliance & Audit',
                desc: 'Automated audit trails, ISO certifications, and regulatory reporting out of the box.',
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className={`rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 cursor-default ${
                  darkMode
                    ? 'bg-gray-900 border-gray-800 hover:border-indigo-500/50'
                    : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-4">{feat.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feat.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="px-6 pb-32">
        <div
          className="max-w-4xl mx-auto rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-3xl -translate-x-12 translate-y-12" />
          </div>
          <h2 className="text-4xl font-black mb-4 relative z-10">Ready to Transform Your Factory?</h2>
          <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Join 1,200+ manufacturers already running on ERP. Start your free 30-day trial today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a
              href="#"
              className="px-8 py-3.5 rounded-2xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-colors duration-200 shadow-lg"
            >
              Start Free Trial →
            </a>
            <a
              href="#"
              className="px-8 py-3.5 rounded-2xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 px-6 text-center text-sm ${darkMode ? 'border-gray-800 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
        © 2026 ERP. All rights reserved.
      </footer>
    </main>
  )
}
