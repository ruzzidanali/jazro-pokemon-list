<template>
  <div class="container py-4" v-if="data">
    <div class="row g-4">
      <div class="col-12 col-lg-5">
        <div class="card shadow-sm border-0">
          <div class="ratio ratio-1x1 bg-light d-flex align-items-center justify-content-center">
            <img :src="artwork" :alt="data.details.name" class="img-fluid p-3">
          </div>
          <div class="card-body">
            <h2 class="card-title text-capitalize">
              {{ displayName }}
              <span v-if="edit.favorite" class="ms-2 badge text-bg-warning">★ Favorite</span>
            </h2>
            <div class="d-flex flex-wrap gap-2 mb-2">
              <span v-for="t in data.details.types" :key="t.slot + t.type.name" class="badge text-bg-primary text-capitalize">
                {{ t.type.name }}
              </span>
              <span v-for="t in (edit.customTypes || [])" :key="'custom-'+t" class="badge text-bg-secondary text-capitalize">
                {{ t }}
              </span>
            </div>
            <p class="text-muted mb-0">ID: #{{ data.details.id }}</p>
            <p class="text-muted mb-0">Height: {{ (data.details.height/10).toFixed(1) }} m</p>
            <p class="text-muted mb-0">Weight: {{ (data.details.weight/10).toFixed(1) }} kg</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h3 class="h5 mb-3">About</h3>
            <p class="mb-3">{{ flavorText }}</p>

            <div class="row mb-3">
              <div class="col-sm-6">
                <strong>Base Experience:</strong> {{ data.details.base_experience }}
              </div>
              <div class="col-sm-6">
                <strong>Abilities:</strong>
                <span class="text-capitalize">
                  {{ data.details.abilities.map(a => a.ability.name).join(', ') }}
                </span>
              </div>
            </div>

            <div class="mb-3">
              <strong>Stats:</strong>
              <ul class="mb-0">
                <li v-for="s in data.details.stats" :key="s.stat.name" class="text-capitalize">
                  {{ s.stat.name }}: {{ s.base_stat }}
                </li>
              </ul>
            </div>

            <hr>

            <h3 class="h5 mb-3">Your Custom Info (Pinia)</h3>
            <form @submit.prevent="saveEdits" class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label">Nickname</label>
                <input v-model="localEdits.nickname" class="form-control" placeholder="e.g., Sparky">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label">Custom Types (comma-separated)</label>
                <input v-model="customTypesStr" class="form-control" placeholder="e.g., shadow, cosmic">
              </div>
              <div class="col-12">
                <label class="form-label">Notes</label>
                <textarea v-model="localEdits.note" class="form-control" rows="3" placeholder="Your notes about this Pokémon"></textarea>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="localEdits.favorite" id="fav">
                  <label class="form-check-label" for="fav">Mark as Favorite</label>
                </div>
              </div>
              <div class="col-12 d-flex gap-2">
                <button class="btn btn-primary" type="submit">Save</button>
                <router-link to="/" class="btn btn-outline-secondary">Back</router-link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container py-5 text-center">
    <div v-if="store.loadingDetails" class="py-5">
      <div class="spinner-border" role="status" aria-label="Loading"></div>
      <div class="mt-2 text-muted">Loading details...</div>
    </div>
    <div v-else>
      <p class="text-muted">Not found.</p>
      <router-link to="/" class="btn btn-outline-primary">Back</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonStore } from '../stores/pokemon'

const route = useRoute()
const name = route.params.name
const store = usePokemonStore()

const data = ref(null)
const localEdits = reactive({ nickname: '', note: '', favorite: false, customTypes: [] })
const customTypesStr = ref('')

const edit = computed(() => store.edits[name] || {})
const displayName = computed(() => edit.value.nickname?.trim() || (data.value?.details?.name ?? name))
const artwork = computed(() => data.value?.details?.sprites?.other?.['official-artwork']?.front_default || data.value?.details?.sprites?.front_default)

const flavorText = computed(() => {
  const entries = data.value?.species?.flavor_text_entries || []
  // pick the first English flavor text
  const en = entries.find(e => e.language.name === 'en')
  return en ? en.flavor_text.replace(/\s+/g, ' ') : 'No description available.'
})

watch(edit, (e) => {
  localEdits.nickname = e.nickname || ''
  localEdits.note = e.note || ''
  localEdits.favorite = !!e.favorite
  localEdits.customTypes = e.customTypes || []
  customTypesStr.value = localEdits.customTypes.join(', ')
}, { immediate: true, deep: true })

async function load() {
  const res = await store.fetchDetails(name)
  data.value = res
}
function saveEdits() {
  const types = customTypesStr.value
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  store.updatePokemonInfo(name, {
    nickname: localEdits.nickname,
    note: localEdits.note,
    favorite: localEdits.favorite,
    customTypes: types
  })
  // Refresh local view from store
  localEdits.customTypes = types
}

onMounted(load)
</script>
