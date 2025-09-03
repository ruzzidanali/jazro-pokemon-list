<template>
  <div class="container py-4">
    <h1 class="mb-3">Pokédex</h1>

    <div class="row g-2 align-items-center mb-3">
      <div class="col-12 col-md-6">
        <input
          type="search"
          class="form-control"
          placeholder="Search by name (e.g. 'char')"
          v-model="store.search"
        />
      </div>
      <div class="col-12 col-md-6 text-md-end">
        <small class="text-muted">Showing {{ store.filteredCards.length }} of {{ store.cards.length }}</small>
      </div>
    </div>

    <div v-if="store.loadingList" class="py-5 text-center">
      <div class="spinner-border" role="status" aria-label="Loading"></div>
      <div class="mt-2 text-muted">Loading Pokémon...</div>
    </div>

    <div v-else class="row g-3">
      <div v-for="p in store.filteredCards" :key="p.name" class="col-6 col-md-4 col-lg-3 col-xl-2">
        <PokemonCard :pokemon="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePokemonStore } from '../stores/pokemon'
import PokemonCard from '../components/PokemonCard.vue'

const store = usePokemonStore()

onMounted(() => {
  store.fetchList()
})
</script>
