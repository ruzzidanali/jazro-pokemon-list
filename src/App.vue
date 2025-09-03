<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
    <div class="container">
      <router-link to="/" class="navbar-brand fw-bold">Pokédex</router-link>
    </div>
  </nav>
  <router-view />
  <footer class="border-top py-4 mt-5">
    <div class="container small text-muted">
      Data from <a href="https://pokeapi.co/" target="_blank" rel="noopener">PokeAPI</a>.
    </div>
  </footer>
</template>

<script setup>
</script>

<style>
/* Small aesthetic tweaks */
body { background: #fafafa; }
</style>
