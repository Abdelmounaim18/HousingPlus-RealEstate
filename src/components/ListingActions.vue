<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useListingStore} from '@/stores/listingStore';
import {deleteListing} from "@/services/listingService.js";

const deleteResponse = ref([]);

const props = defineProps({
  listingId: {
    type: Number,
    required: true
  }
});

const showModal = ref(false);
const router = useRouter();
const store = useListingStore();

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

/**
 * Delete a listing from the API based on the provided listing ID.
 * If the delete operation is successful, the modal is closed, listings refreshed, and the user is redirected to the home page.
 * If the delete operation fails, an error message is logged to the console.
 *
 */
const handleDeleteListing = async () => {
  try {
    deleteResponse.value = await deleteListing(props.listingId);
    console.log('Deleted listing:', deleteResponse);

    closeModal();
    await store.loadListings();
    await router.push({name: 'home'});
  } catch (error) {
    console.error('Failed to delete listing:', error);
  }
};

const editListing = () => {
  router.push({name: 'edit', params: {id: props.listingId}});
};
</script>

<template>
  <div class="listing-actions">
    <img alt="edit" src="@/assets/icons/ic_edit@3x.png" @click="editListing"/>
    <img alt="delete" src="@/assets/icons/ic_delete@3x.png" @click="openModal"/>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Delete listing</h2>
        <p>Are you sure you want to delete this listing? <br> This action cannot be undone.</p>
        <button class="btn delete" @click="handleDeleteListing">YES, DELETE</button>
        <button class="btn cancel" @click="closeModal">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.listing-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
}

.listing-actions img {
  height: 20px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  max-width: 500px;
}

.modal-content button {
  width: 100%;
  margin: 10px 0;
  cursor: pointer;
}

.modal-content p {
  font-size: 16px;
  color: var(--text-secondary);
}

.cancel {
  background-color: var(--text-secondary);
  color: white;
}

@media (max-width: 768px) {
  .listing-actions img {
    height: 16px;
    cursor: pointer;
  }

  .modal-content {
    width: 80%;
    padding: 1rem;
  }

  .modal-content h2 {
    font-size: 18px;
  }

  .modal-content p {
    font-size: 14px;
  }

  .modal-content button {
    width: 70%;
    margin: 5px auto;
  }
}
</style>
