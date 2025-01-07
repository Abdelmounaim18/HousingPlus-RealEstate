import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_ENDPOINT, headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY,
    },
});

/**
 * Fetch all listings from the API.
 * @returns {Promise<Array>} - Array containing all fetched listings.
 * @throws {Error} - If the fetch operation fails.
 */
export const fetchListings = async () => {
    try {
        const response = await apiClient.get('/houses');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch listings:', error.message);
        throw error;
    }
};

/**
 * Fetch a single listing from the API based on the listing ID.
 * @param {number|string} id - The ID of the listing to fetch.
 * @returns {Promise<Object>} - The fetched listing.
 * @throws {Error} - If the fetch operation fails.
 */
export const fetchListing = async (id) => {
    try {
        const response = await apiClient.get(`/houses/${id}`);
        return response.data[0];
    } catch (error) {
        console.error(`Failed to fetch listing with id ${id}:`, error.message);
        throw error;
    }
};

/**
 * Create or update a listing.
 * @param {Object} formData - The form data for the listing.
 * @param {boolean} isEdit - Flag to determine if it's in edit mode.
 * @param {number|string} [listingId] - The ID of the listing to update.
 * @returns {Promise<Object>} - The response data from the API.
 * @throws {Error} - If the operation fails.
 */
export const saveListing = async (formData, isEdit, listingId) => {
    try {
        let response;
        if (isEdit) {
            response = await axios.post(`${import.meta.env.VITE_ENDPOINT}/houses/${listingId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 'X-Api-Key': import.meta.env.VITE_API_KEY,
                },
            });
        } else {
            response = await axios.post(`${import.meta.env.VITE_ENDPOINT}/houses`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 'X-Api-Key': import.meta.env.VITE_API_KEY,
                },
            });
        }

        return response.data;
    } catch (error) {
        console.error('Error while saving listing:', error.message);
        throw error;
    }
};

/**
 * Upload an image for a listing.
 * @param {number|string} houseId - The ID of the listing.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<void>}
 * @throws {Error} - If the upload fails.
 */
export const uploadListingImage = async (houseId, imageFile) => {
    try {
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);

        await axios.post(`${import.meta.env.VITE_ENDPOINT}/houses/${houseId}/upload`, imageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data', 'X-Api-Key': import.meta.env.VITE_API_KEY,
            },
        });
    } catch (error) {
        console.error('Error while uploading image:', error.message);
        throw error;
    }
};

/**
 * Delete a listing from the API based on the listing ID.
 * @param {number|string} listingId - The ID of the listing to delete.
 * @returns {Promise<Object>} - The response data from the API.
 * @throws {Error} - If the delete operation fails.
 */
export const deleteListing = async (listingId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_ENDPOINT}/houses/${listingId}`, {
            headers: {
                'X-Api-Key': import.meta.env.VITE_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete listing:', error.message);
        throw error;
    }
};
