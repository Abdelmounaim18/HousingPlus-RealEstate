<script setup>
import {useListingStore} from "@/stores/listingStore.js";

const store = useListingStore()
// Clear searchbar input
const clearSearchInput = () => {
  store.search = '';
};
</script>

<template>
  <div class="searchbar">
    <img alt="search icon" class="search-icon" src="@/assets/icons/ic_search@3x.png"/>
    <input v-model="store.search" class="search-input" placeholder="Search for a house"/>
    <img v-if="store.search" alt="clear input" class="clear-icon" src="@/assets/icons/ic_clear@3x.png"
         @click="clearSearchInput"/>
  </div>
</template>

<style scoped>
.searchbar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-right: 10px;
  background-color: var(--tertiary-color-1);
  border-radius: 8px;
  color: var(--tertiary-color-2);
  font-weight: lighter;
  min-width: 30%;
}

.search-input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: "Open Sans", sans-serif;
}

.search-input::placeholder {
  color: var(--tertiary-color-2);
}

.search-icon {
  margin-right: 10px;
  height: 20px;
}

.clear-icon {
  margin-left: 5px;
  height: 18px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .searchbar {
    flex: 1 1 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
}
</style>