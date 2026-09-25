const cors = require('cors')
const express = require('express')

const app = express()
const port = process.env.PORT || 5001

// Allow the Vite frontend to make requests to this backend.
app.use(cors())

// Example: http://localhost:5001/api/type/fire
app.get('/api/type/:name', async (req, res) => {
  const typeName = encodeURIComponent(req.params.name.toLowerCase())
  const pokeApiUrl = `https://pokeapi.co/api/v2/type/${typeName}/`

  try {
    const pokeApiResponse = await fetch(pokeApiUrl)
    const data = await pokeApiResponse.json()

    if (!pokeApiResponse.ok) {
      return res.status(pokeApiResponse.status).json({ message: 'Pokémon type not found.' })
    }

    const { half_damage_to, double_damage_from } = data.damage_relations

    res.json({
      half_damage_to: half_damage_to.map(({ name }) => name),
      double_damage_from: double_damage_from.map(({ name }) => name),
    })
  } catch (error) {
    console.error('Could not fetch Pokémon type:', error)
    res.status(502).json({ message: 'PokéAPI is currently unavailable.' })
  }
})

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`)
})
