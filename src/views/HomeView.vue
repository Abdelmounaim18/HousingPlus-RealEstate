<script setup>
import ListingCard from "@/components/ListingCard.vue";
import {onMounted} from 'vue';
import {useListingStore} from '@/stores/listingStore';
import NotFound from "@/components/NotFound.vue";
import router from "@/router/index.js";
import SearchBar from "@/components/SearchBar.vue";
import SortOptions from "@/components/SortOptions.vue";

const store = useListingStore();

onMounted(() => {
  store.loadListings();
  store.listing = [];
});
</script>

<template>
  <div class="content">
    <header>
      <div class="toolbar">
        <h1 class="title">Houses</h1>
        <button class="btn btn-create" @click="router.push({ name: 'create' })"><span>+</span> CREATE NEW</button>
      </div>
      <div class="toolbar search-sort">
        <SearchBar class="search-bar"/>
        <SortOptions class="sort-options"/>
      </div>
    </header>
    <main>
      <!--  All & Filtered listings  -->
      <h2 v-if="store.search" class="results">{{ store.sortedResults.length }} results found</h2>
      <div v-if="store.sortedResults.length > 0" v-bind="$attrs">
        <div v-for="listing in store.sortedResults" :key="listing.id">
          <ListingCard :listing="listing"/>
        </div>
      </div>
      <!--  No results message  -->
      <div v-else>
        <NotFound/>
      </div>
    </main>
  </div>
</template>

<style scoped>
.toolbar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 20px;
}

.toolbar.search-sort {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.search-bar {
  flex: 1 1 auto;
  max-width: 200px;
}

.sort-options {
  flex: 0 1 auto;
}

.btn-create span {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    max-width: none;
  }

  .toolbar.search-sort {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-create {
    display: none;
  }

  .title {
    display: none;
  }

  .results {
    padding-left: 10px;
    font-size: 16px;
  }

  .search-bar {
    margin-right: 0;
  }
}
</style>
