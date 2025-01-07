<script setup>
import {useListingStore} from "@/stores/listingStore.js";

const store = useListingStore()
// Set state sort button
const setSortOption = (option) => {
  store.sortOption = option;
};
</script>

<template>
  <div class="btn-group">
    <button :class="{ active: store.sortOption === 'price' }" @click="setSortOption('price')">Price</button>
    <button :class="{ active: store.sortOption === 'size' }" @click="setSortOption('size')">Size</button>
  </div>
</template>

<style scoped>
.btn-group {
  display: flex;
}

.btn-group button {
  padding: 12px 40px;
  border: none;
  cursor: pointer;
  background-color: var(--tertiary-color-2);
  color: white;
  font-weight: bold;
  width: 100%;
}

.btn-group button:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.btn-group button:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.btn-group button.active {
  background-color: var(--primary-color);
}

@media (max-width: 768px) {
  .btn-group {
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
}
</style>