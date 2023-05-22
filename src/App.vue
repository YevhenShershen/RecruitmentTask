<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-row class="d-flex align-center justify-center">
    <v-col cols="12" sm="8" md="6">
      <header>
        <div class="wrapper">
          <nav class="d-flex justify-center">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/admin">Admin</RouterLink>
          </nav>
        </div>
      </header>
    </v-col>
  </v-row>
  <RouterView />
</template>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
