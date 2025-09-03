import axios from 'axios'
const API = 'https://pokeapi.co/api/v2'

export async function getPokemonList(limit = 100, offset = 0) {
  const { data } = await axios.get(`${API}/pokemon?limit=${limit}&offset=${offset}`)
  return data.results
}

export async function getPokemonDetailsByName(name) {
  const { data } = await axios.get(`${API}/pokemon/${name}`)
  return data
}

export async function getPokemonSpeciesByName(name) {
  const { data } = await axios.get(`${API}/pokemon-species/${name}`)
  return data
}
