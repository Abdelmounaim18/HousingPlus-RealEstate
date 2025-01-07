// src/stores/listingStore.js
import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {fetchListing, fetchListings} from '@/services/listingService';

export const useListingStore = defineStore('listingStore', () => {
    const listings = ref([]);
    const listing = ref([]);
    const recommendedListings = ref([]);
    const search = ref('');
    const sortOption = ref('');

    /**
     * Fetch all listings from the API.
     * The fetched listings are stored in the `listings` reactive variable.
     * If the fetch operation fails, an error message is logged to the console.
     * @returns {Promise<void>}
     */
    const loadListings = async () => {
        try {
            listings.value = await fetchListings();
        } catch (error) {
            console.error('Failed to fetch listings:', error.message);
        }
    };

    /**
     * Fetch a single listing from the API based on the listing ID.
     * The fetched listing is stored in the `listing` reactive variable.
     * If the fetch operation fails, an error message is logged to the console.
     * @param {number|string} id - The ID of the listing to fetch.
     * @returns {Promise<void>}
     */
    const loadListing = async (id) => {
        try {
            listing.value = await fetchListing(id);
        } catch (error) {
            console.error(`Failed to fetch listing with id ${id}:`, error.message);
        }
    };

    /**
     * Return search results based on the search query.
     * The search is performed on the street, city, and/or zip code of the listings.
     * If no search query is provided, all listings are returned.
     * @returns {Array} - The filtered array of listings matching the search query.
     */
    const searchResults = computed(() => {
        if (!search.value) {
            return listings.value;
        }
        return listings.value.filter(
            (listing) =>
                listing.location.street.toLowerCase().includes(search.value.toLowerCase()) ||
                listing.location.city.toLowerCase().includes(search.value.toLowerCase()) ||
                listing.location.zip.includes(search.value)
        );
    });

    /**
     * Return listings sorted based on the specified sort option.
     * The listings can be sorted by price or size and is applied to the search results.
     * @returns {Array} - The sorted array of listings.
     */
    const sortedResults = computed(() => {
        return searchResults.value.slice().sort((x, y) => {
            if (sortOption.value === 'price') {
                return x.price - y.price;
            } else if (sortOption.value === 'size') {
                return x.size - y.size;
            }
            return 0;
        });
    });

    /**
     * Fetch recommended listings based on the sort option ('price' or 'size').
     * The function first filters the listings based on the specified criteria and then
     * ensures that at least three recommendations are returned by adding random listings.
     * @param {string} [sortOption='price'] - The criterion to sort and filter the recommended listings.
     */
    const fetchRecommendedListings = (sortOption = 'price') => {
        if (!listing.value) return;

        if (sortOption === 'price') {
            recommendedListings.value = listings.value.filter(
                (item) => Math.abs(item.price - listing.value.price) < 50000 && item.id !== listing.value.id
            );
        } else if (sortOption === 'size') {
            recommendedListings.value = listings.value.filter(
                (item) => Math.abs(item.size - listing.value.size) < 50 && item.id !== listing.value.id
            );
        }

        if (recommendedListings.value.length < 3) {
            const additionalListings = listings.value
                .filter((item) => item.id !== listing.value.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3 - recommendedListings.value.length);
            recommendedListings.value = [...recommendedListings.value, ...additionalListings];
        }
    };

    return {
        listings,
        listing,
        fetchRecommendedListings,
        recommendedListings,
        search,
        loadListings,
        loadListing,
        searchResults,
        sortedResults,
        sortOption,
    };
});
