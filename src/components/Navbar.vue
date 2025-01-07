<script setup>
import {RouterLink, useRoute} from "vue-router";
import router from "../router/index.js";
import {computed} from "vue";

const route = useRoute()

const isHomePage = computed(() => route.name === 'home');
const isDetailPage = computed(() => route.name === 'house');
</script>

<template>
  <nav class="navbar">
    <img alt="logo" class="navbar-logo" src="../assets/images/img_logo_HousingPlus@3x.png"/>
    <ul class="navbar-menu">
      <li>
        <RouterLink :to="{ name: 'home' }">Houses</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'about' }">About</RouterLink>
      </li>
    </ul>
    <button class="nav-button" @click="router.push({ name: 'create' })">+</button>
  </nav>
  <nav :class="['navbar-mobile', { 'navbar-mobile-detail': isDetailPage }]">
    <div v-if="isDetailPage" class="navbar-mobile-left">
      <img alt="create" class="nav-button" src="@/assets/icons/ic_back_white@3x.png" @click="router.back()"/>
    </div>
    <div v-else-if="!isHomePage && route.name !== 'about'" class="navbar-mobile-left">
      <img alt="create" class="nav-button" src="@/assets/icons/ic_back_grey@3x.png" @click="router.back()"/>
    </div>
    <div class="navbar-mobile-center">
      <h2>{{ router.currentRoute.value.meta.title }}</h2>
    </div>
    <div v-if="isHomePage" class="navbar-mobile-right">
      <img alt="create" class="nav-button" src="@/assets/icons/ic_plus_grey@3x.png"
           @click="$router.push({ name: 'create' })"/>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #FFF;
  display: flex;
  align-items: center;
  padding: 0 10rem;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.navbar-logo {
  height: 40px;
  border-radius: 15%;
}

.navbar-menu {
  display: flex;
  list-style: none;
  gap: 20px;
}

.navbar-menu li {
  cursor: pointer;
}

.navbar-menu li a {
  text-decoration: none;
  color: var(--tertiary-color-2);
  padding: 1rem;
}

.nav-button {
  display: none;
}

.navbar-mobile {
  display: none;
}

@media (max-width: 768px) {
  .navbar {
    display: none;
  }

  h2 {
    font-size: 18px;
  }

  .navbar-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #FFF;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .navbar-mobile-center {
    display: flex;
    justify-content: center;
    flex-grow: 1;
  }

  .navbar-mobile-center h1 {
    margin: 0;
    padding: 10px;
    font-size: 24px;
  }

  .nav-button {
    display: block;
    height: 20px;
  }

  .navbar-mobile-detail {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    z-index: 10;
    color: #fff;
  }
}
</style>
