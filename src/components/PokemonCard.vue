<template>
  <div class="card h-100 shadow-sm border-0">
    <div class="ratio ratio-1x1 bg-light d-flex align-items-center justify-content-center">
      <img v-if="pokemon.sprite" :src="pokemon.sprite" :alt="pokemon.name" class="img-fluid p-3" loading="lazy">
      <div v-else class="text-muted">No Image</div>
    </div>
    <div class="card-body">
      <h5 class="card-title text-capitalize mb-1">{{ pokemon.name }}</h5>
      <div class="d-flex flex-wrap gap-2 mb-2">
        <span v-for="t in pokemon.types" :key="t" class="badge text-bg-primary text-capitalize">{{ t }}</span>
      </div>
      <p class="card-text small text-muted mb-0">
        ID: #{{ pokemon.id }} · H: {{ (pokemon.height/10).toFixed(1) }} m · W: {{ (pokemon.weight/10).toFixed(1) }} kg
      </p>
    </div>
    <div class="card-footer bg-white border-0">
      <router-link class="btn btn-outline-primary w-100" :to="`/pokemon/${pokemon.name}`">
        View details
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pokemon: {
    type: Object,
    required: true
  }
})
</script>
