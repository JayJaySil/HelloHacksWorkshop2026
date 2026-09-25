import { useState } from 'react'

const types = [
  { name: 'Fire', mark: 'F', color: 'bg-orange-100 text-orange-700' },
  { name: 'Water', mark: 'W', color: 'bg-sky-100 text-sky-700' },
  { name: 'Grass', mark: 'G', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Ground', mark: 'G', color: 'bg-amber-100 text-amber-800' },
]

function App() {
  const [selectedType, setSelectedType] = useState(null)
  const [result, setResult] = useState('')

  function getMatchup(type) {
    // API call will go here; for now, return a placeholder response.
    return `Fake API response: You are fighting a ${type}-type Pokémon.`
  }

  function handleTypeClick(typeName) {
    const response = getMatchup(typeName)
    setResult(response)
    setSelectedType(types.find((type) => type.name === typeName))
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f6f1] px-5 py-10 text-slate-800">
      <div className="w-full max-w-md">
        <header className="mb-8 flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-full border-[3px] border-slate-800 bg-white text-xl shadow-[inset_0_-5px_0_#e8e8e8]" aria-hidden="true">◉</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-500">Trainer tools</p>
            <p className="font-bold tracking-tight">Pokémon Battle Assistant</p>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-2 text-sm font-medium text-slate-400">Type matchups · 01</p>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Who are you up against?</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Choose your opponent’s type to see what they’re weak to.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {types.map((type) => {
              const isSelected = selectedType?.name === type.name

              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => handleTypeClick(type.name)}
                  aria-pressed={isSelected}
                  className={`flex min-h-14 touch-manipulation items-center gap-3 rounded-xl border px-4 text-left text-sm font-semibold transition duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${isSelected ? 'border-red-400 bg-red-50 ring-2 ring-red-100' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <span className={`grid size-8 place-items-center rounded-full text-xs font-black ${type.color}`}>{type.mark}</span>
                  {type.name}
                </button>
              )
            })}
          </div>

          <div aria-live="polite" className="mt-5 min-h-16 rounded-xl bg-[#f7f6f1] px-4 py-3">
            {result ? (
              <p className="py-2 text-sm font-medium text-slate-700">{result}</p>
            ) : (
              <p className="py-2 text-sm text-slate-400">Choose a type to reveal its weaknesses.</p>
            )}
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">Know the type. Choose your move.</p>
      </div>
    </main>
  )
}

export default App
