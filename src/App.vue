<script setup>
import {RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";
import Tapbar from "@/components/Tapbar.vue";
</script>

<template>
  <header>
    <Navbar/>
  </header>
  <main class="app-content">
    <RouterView/>
  </main>
  <footer>
    <Tapbar/>
  </footer>
</template>

<style>
.app-content {
  margin: 6rem 10rem;
}

@media (max-width: 768px) {
  .app-content {
    margin: 0;
  }
}
</style>
