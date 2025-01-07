<script setup>
import {computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import {useListingStore} from "@/stores/listingStore";
import NotFound from "@/components/NotFound.vue";
import ListingActions from "@/components/ListingActions.vue";
import HomeButton from "@/components/HomeButton.vue";
import ListingCard from "@/components/ListingCard.vue";

const route = useRoute();
const store = useListingStore();

/**
 * Fetch listing data including all listings, a specific listing by ID, and recommended listings.
 * Checks if listings are already in the store to avoid unnecessary API calls.
 *
 * @returns {Promise<void>} - Fetched listing data
 *
 */
const fetchListingData = async () => {
  if (store.listings.length === 0) {
    await store.loadListings();
  }
  await store.loadListing(route.params.id);
  store.fetchRecommendedListings();
};

onMounted(fetchListingData);

/**
 * Watch for changes in the route and fetch listing data when the route changes.
 */
watch(route, fetchListingData);

const listing = computed(() => store.listing);
const recommendedListings = computed(() => store.recommendedListings);

const formattedPrice = computed(() => {
  if (listing.value) {
    return new Intl.NumberFormat('nl-NL').format(listing.value.price);
  }
  return null;
});
</script>

<template>
  <HomeButton/>
  <div v-if="listing && listing.location">
    <div class="container" v-bind="$attrs">
      <div class="main">
        <div class="card">
          <img :alt="listing.location.street" :src="listing.image" class="card-image"/>
          <div class="card-body">
            <div class="card-header">
              <h1>{{ listing.location.street }} {{
                  listing.location.houseNumber
                }}{{ listing.location.houseNumberAddition }}</h1>
              <span v-if="listing.madeByMe">
                <ListingActions :listingId="listing.id"/>
              </span>
            </div>
            <span class="details">
              <img alt="location" src="@/assets/icons/ic_location@3x.png"/>
              {{ listing.location.zip }} {{ listing.location.city }}
            </span>
            <div>
              <span class="details">
                <img alt="price" src="@/assets/icons/ic_price@3x.png"/>
                {{ formattedPrice }}
              </span>
              <span class="details">
                <img alt="size" src="@/assets/icons/ic_size@3x.png"/>
                {{ listing.size }} m²
              </span>
              <span class="details">
                <img alt="construction year" src="@/assets/icons/ic_construction_date@3x.png"/>
                Built in {{ listing.constructionYear }}
              </span>
            </div>
            <div>
              <span class="details">
                <img alt="bedrooms" src="@/assets/icons/ic_bed@3x.png"/>
                {{ listing.rooms.bedrooms }}
              </span>
              <span class="details">
                <img alt="bathrooms" src="@/assets/icons/ic_bath@3x.png"/>
                {{ listing.rooms.bathrooms }}
              </span>
              <span class="details">
                <img alt="garage" src="@/assets/icons/ic_garage@3x.png"/>
                {{ listing.hasGarage ? "Yes" : "No" }}
              </span>
            </div>
            <div class="description">
              {{ listing.description }}
            </div>
          </div>
        </div>
      </div>
      <aside class="sidebar">
        <div class="recommendations">
          <h2>Recommended for you</h2>
          <div v-for="recommended in recommendedListings" :key="recommended.id" class="recommended-card">
            <ListingCard :listing="recommended" extraClass="recommended"/>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div v-else>
    <NotFound/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.main {
  flex-direction: column;
  width: 65%;
}

.sidebar {
  width: 30%;
  z-index: 1;
}

.card {
  background-color: white;
  width: 100%;
  position: relative;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.card-header h1 {
  margin: 4px 8px 0 20px;
}

.card-image {
  width: 100%;
  object-position: center;
}

.details {
  margin-left: 20px;
  color: var(--text-secondary);
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 590;
}

.details img {
  margin-right: 5px;
  height: 16px;
}

.description {
  color: var(--text-secondary);
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  padding: 20px;
}

.recommendations {
  margin: 10px;
}

.recommended-card {
  width: 100%;
  display: flex;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    padding-bottom: 10%;
  }

  .main {
    width: 100%;
  }

  .sidebar {
    width: 100%;
    order: 2;
  }


  .card-body {
    background-color: white;
    border-radius: 20px 20px 0 0;
    padding: 20px 10px 0 10px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    position: relative;
    margin-top: -50px;
    z-index: 2;
  }

  .details, .description {
    font-size: 14px;
    margin-left: 10px;
  }

  .card-header h1 {
    font-size: 18px;
    margin: 4px 8px 0 10px;
  }

  .details img {
    height: 14px;
  }

  .description {
    padding: 10px 0;
  }
}
</style>
