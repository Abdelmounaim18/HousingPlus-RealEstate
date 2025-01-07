<script setup>
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();

const homeIcon = computed(() => {
  return route.name === 'home' || route.name !== 'about'
      ? new URL('@/assets/icons/ic_mobile_navigarion_home_active@3x.png', import.meta.url).href
      : new URL('@/assets/icons/ic_mobile_navigarion_home@3x.png', import.meta.url).href;
});

const aboutIcon = computed(() => {
  return route.name === 'about'
      ? new URL('@/assets/icons/ic_mobile_navigarion_info_active@3x.png', import.meta.url).href
      : new URL('@/assets/icons/ic_mobile_navigarion_info@3x.png', import.meta.url).href;
});
</script>

<template>
  <nav class="tab-bar">
    <RouterLink :to="{ name: 'home' }" class="tab-bar-item">
      <img :src="homeIcon" alt="Home"/>
    </RouterLink>
    <RouterLink :to="{ name: 'about' }" class="tab-bar-item">
      <img :src="aboutIcon" alt="Info"/>
    </RouterLink>
  </nav>
</template>

<style scoped>
.tab-bar {
  display: none;
}

@media (max-width: 768px) {
  .tab-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: #FFF;
    box-shadow: 0 -1px 20px 0 rgba(0, 0, 0, .1);
    padding: 0.5rem 0;
    z-index: 999;
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    font-size: 1.5rem;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }
}
</style>