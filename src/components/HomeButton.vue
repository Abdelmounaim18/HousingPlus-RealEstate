<script setup>
import router from "@/router/index.js";
</script>

<template>
  <button class="back-button" @click="router.push({name: 'home'})">
    <img alt="back icon" src="@/assets/icons/ic_back_grey@3x.png"/>
    Back to overview
  </button>
</template>

<style scoped>
.back-button {
  font-weight: bold;
  font-size: 16px;
  color: var(--text-secondary);
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

}

.back-button img {
  height: 20px;
  margin-right: 10px;
}

@media (max-width: 768px) {
  .back-button {
    display: none;
  }
}

</style>