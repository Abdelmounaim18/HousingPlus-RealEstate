<script setup>
import {computed} from "vue";
import router from "@/router/index.js";
import ListingActions from "@/components/ListingActions.vue";

const props = defineProps({
  listing: {
    type: Object,
    required: true,
  },
  extraClass: {
    type: String,
    default: ""
  }
});

/**
 * Computed property to format the price of the listing as a currency string.
 *
 * @returns {string} - The formatted price string.
 */
const formattedPrice = computed(() => {
  return new Intl.NumberFormat('nl-NL', {style: 'currency', currency: 'EUR'}).format(props.listing.price);
});

</script>

<template>
  <div :class="['card', extraClass]" @click="router.push({name: 'house', params: {id: props.listing.id}})">
    <div v-if="props.listing.madeByMe" class="listing-actions" @click.stop>
      <ListingActions :listingId="props.listing.id"/>
    </div>
    <img :src="props.listing.image" alt="" class="card-image">
    <div class="card-body">
      <h2>{{ props.listing.location.street }} {{
          props.listing.location.houseNumber
        }}{{ props.listing.location.houseNumberAddition }}</h2>
      <p>{{ formattedPrice }}</p>
      <p class="listing-location">{{ props.listing.location.zip }} {{ props.listing.location.city }}</p>
      <div class="listing-details">
        <span><img alt="bedrooms" src="@/assets/icons/ic_bed@3x.png"/> {{ props.listing.rooms.bedrooms }}</span>
        <span><img alt="bathrooms" src="@/assets/icons/ic_bath@3x.png"/> {{ props.listing.rooms.bathrooms }}</span>
        <span><img alt="size" src="@/assets/icons/ic_size@3x.png"/> {{ props.listing.size }} m²</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 12px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.05), 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  height: 100%;
}

.card-body {
  flex: 1;
  text-align: left;
  margin-left: 20px;
}

.card-body h2 {
  margin: 0;
}

.card-body p {
  margin: 5px 0;
  font-size: 16px;
}

.listing-location {
  color: var(--tertiary-color-2);
}

.listing-details span {
  margin-right: 10px;
  font-size: 16px;
  color: var(--secondary-color);
}

.listing-details img {
  margin-right: 5px;
  height: 16px;
}

.listing-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.listing-actions img {
  background: none;
  border: none;
  cursor: pointer;
  height: 18px;
  padding: 4px;
}

.card-image {
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
}

.recommended .card-image {
  width: 6rem;
  height: 6rem;
}

.recommended h2,
.recommended p,
.recommended span {
  font-size: 14px;
}

@media (max-width: 768px) {
  .listing-details span {
    font-size: 12px;
  }
}
</style>
