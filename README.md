# Pokédex (Vue 3 + Pinia + Bootstrap)

A simple responsive Pokédex that:
- Fetches 100 Pokémon from PokeAPI
- Shows a card grid (name, official image, short info)
- Has search/filter by name
- Navigates to a full details page
- Shows loaders while fetching
- Uses Pinia for state (list, details cache, and *editable* user info like nickname/favorite/notes)
- Fully responsive (Bootstrap 5.3)

## Tech
- Vue 3 (Vite)
- Pinia
- Axios
- Bootstrap 5.3

## Run locally
1. Clone the repository
   ```bash
   git clone https://github.com/ruzzidanali/jazro-pokemon-list.git
   cd jazro-pokemon-list
2. Install dependencies
   ```bash
   npm install
3. Run the development server
   ```bash
   npm run dev
4. Build for production
   ```bash
   npm run build
5. Preview the production
   ```bash
   npm run preview
