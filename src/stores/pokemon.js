import { defineStore } from 'pinia'
import { getPokemonList, getPokemonDetailsByName, getPokemonSpeciesByName } from '../services/pokeapi'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    list: [],            
    cards: [],           
    detailsCache: {},    
    loadingList: false,
    loadingDetails: false,
    search: '',
    edits: {}            
  }),
  getters: {
    filteredCards(state) {
      const q = state.search.trim().toLowerCase()
      if (!q) return state.cards
      return state.cards.filter(p => p.name.toLowerCase().includes(q))
    }
  },
  actions: {
    async fetchList() {
      if (this.cards.length) return
      try {
        this.loadingList = true
        const results = await getPokemonList(100, 0)
        this.list = results
        const chunks = await Promise.all(results.map(async (r) => {
          const d = await getPokemonDetailsByName(r.name)
          return {
            name: d.name,
            id: d.id,
            sprite: d.sprites.other?.['official-artwork']?.front_default || d.sprites.front_default,
            types: d.types.map(t => t.type.name),
            height: d.height,
            weight: d.weight
          }
        }))
        this.cards = chunks.sort((a, b) => a.id - b.id)
      } finally {
        this.loadingList = false
      }
    },
    async fetchDetails(name) {
      if (this.detailsCache[name]) return this.detailsCache[name]
      try {
        this.loadingDetails = true
        const [details, species] = await Promise.all([
          getPokemonDetailsByName(name),
          getPokemonSpeciesByName(name)
        ])
        const entry = { details, species }
        this.detailsCache[name] = entry
        return entry
      } finally {
        this.loadingDetails = false
      }
    },
    setSearch(value) { this.search = value },
    updatePokemonInfo(name, payload) {
      this.edits[name] = { ...(this.edits[name] || {}), ...payload }
    }
  },
})
