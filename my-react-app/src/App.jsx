import { useState } from 'react'

const types = [
  { name: 'Fire', mark: 'F', color: 'bg-orange-100 text-orange-700' },
  { name: 'Water', mark: 'W', color: 'bg-sky-100 text-sky-700' },
  { name: 'Grass', mark: 'G', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Ground', mark: 'G', color: 'bg-amber-100 text-amber-800' },
]

function App() {
  const [selectedType, setSelectedType] = useState(null)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function getMatchup(typeName) {
    try {
      const response = await fetch(
        `http://localhost:5001/api/type/${encodeURIComponent(typeName.toLowerCase())}`,
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not load this type matchup.')
      }

      return data
    } catch (error) {
      console.error('Could not get type matchup:', error)
      return { error: error.message || 'Could not connect to the backend.' }
    }
  }

  async function handleTypeClick(typeName) {
    setIsLoading(true)
    setResult(null)
    setSelectedType(types.find((type) => type.name === typeName))

    const response = await getMatchup(typeName)
    setResult(response)
    setIsLoading(false)
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
          <p className="mt-2 text-sm leading-6 text-slate-500">Choose a type to check what it resists and what it is weak to.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {types.map((type) => {
              const isSelected = selectedType?.name === type.name

              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => handleTypeClick(type.name)}
                  disabled={isLoading}
                  aria-pressed={isSelected}
                  className={`flex min-h-14 touch-manipulation items-center gap-3 rounded-xl border px-4 text-left text-sm font-semibold transition duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-wait disabled:opacity-60 ${isSelected ? 'border-red-400 bg-red-50 ring-2 ring-red-100' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`}
                >
                  <span className={`grid size-8 place-items-center rounded-full text-xs font-black ${type.color}`}>{type.mark}</span>
                  {type.name}
                </button>
              )
            })}
          </div>

          <div aria-live="polite" className="mt-5 min-h-16 rounded-xl bg-[#f7f6f1] px-4 py-3">
            {isLoading ? (
              <p className="py-2 text-sm text-slate-500">Checking matchup…</p>
            ) : result?.error ? (
              <p role="alert" className="py-2 text-sm font-medium text-red-600">{result.error}</p>
            ) : result ? (
              <div className="space-y-3 py-1 text-sm">
                <div>
                  <p className="font-semibold text-slate-500">Deals half damage to</p>
                  <p className="mt-1 font-bold capitalize text-slate-800">{result.half_damage_to.join(', ') || 'None'}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-500">Takes double damage from</p>
                  <p className="mt-1 font-bold capitalize text-slate-800">{result.double_damage_from.join(', ') || 'None'}</p>
                </div>
              </div>
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
