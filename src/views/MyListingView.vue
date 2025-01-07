<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useListingStore} from '@/stores/listingStore';
import BackButton from "@/components/HomeButton.vue";
import FormInput from '@/components/FormInput.vue';
import {saveListing, uploadListingImage} from "@/services/listingService.js";

const route = useRoute();
const router = useRouter();
const store = useListingStore();

const isEdit = computed(() => route.name === 'edit');
const listingId = route.params.id;

const formData = ref({
  price: '',
  bedrooms: '',
  bathrooms: '',
  size: '',
  streetName: '',
  houseNumber: '',
  numberAddition: '',
  zip: '',
  city: '',
  constructionYear: '',
  hasGarage: false,
  description: '',
  uploadedImage: null
});

const fileInputRef = ref(null);
const validationErrors = ref({});

/**
 * onMounted lifecycle hook to fetch listing data if in edit mode.
 * If the listing exists and is made by the current user, populate form fields with listing data.
 * If the listing does not exist or is not made by the current user, log an error and navigate to the home page.
 */
const fetchListing = async () => {
  if (isEdit.value) {
    await store.loadListing(listingId);
    const data = store.listing;
    if (data && data.madeByMe) {
      formData.value = {
        price: data.price || '',
        bedrooms: data.rooms.bedrooms || '',
        bathrooms: data.rooms.bathrooms || '',
        size: data.size || '',
        streetName: data.location.street || '',
        houseNumber: data.location.houseNumber || '',
        numberAddition: data.location.houseNumberAddition || '',
        zip: data.location.zip || '',
        city: data.location.city || '',
        constructionYear: data.constructionYear || '',
        hasGarage: data.hasGarage || false,
        description: data.description || '',
        uploadedImage: data.image || null
      };
    } else {
      console.error('Forbidden: You do not have permission to edit this listing.');
      await router.push({name: 'home'});
    }
  }
}

onMounted(fetchListing);

/**
 * Handle the image file upload and set the preview.
 * Reads the selected image file, converts it to a data URL, and sets it to the `formData.uploadedImage` ref variable.
 */
const handleImageUpload = () => {
  const file = fileInputRef.value.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      formData.value.uploadedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

// Remove uploaded image
const removeImage = () => {
  formData.value.uploadedImage = null;
  fileInputRef.value = null;
};

// Triggers browser file input for custom input field
const triggerFileInput = () => {
  fileInputRef.value.click();
};

const validationRules = {
  price: 'Price is required',
  bedrooms: 'Bedrooms are required',
  bathrooms: 'Bathrooms are required',
  size: 'Size is required',
  streetName: 'Street name is required',
  houseNumber: 'House number is required',
  numberAddition: '',
  zip: 'Postal code is required',
  city: 'City is required',
  constructionYear: 'Construction year is required',
  hasGarage: '',
  description: 'Description is required',
  uploadedImage: 'Image is required',
};

/**
 * Updates the `validationErrors` reactive object with error messages for invalid fields.
 * Returns true if all fields are valid, false if invalid.
 *
 * @returns {boolean} - True if the form is valid, false if invalid.
 */
const validateForm = () => {
  validationErrors.value = {};
  Object.entries(validationRules).forEach(([key, message]) => {
    const value = formData.value[key];
    if (!value && message) {
      validationErrors.value[key] = message;
    } else if (typeof value === 'number' && value < 0) {
      validationErrors.value[key] = 'Negative number not allowed';
    }
  });
  return Object.keys(validationErrors.value).length === 0;
};

/**
 * Submits the form data to create or update a house listing.
 * Validates the form, constructs the form data, and sends it to the API.
 * If the form is valid and the submission is successful, the user is redirected to the house detail page.
 *
 */
const submitForm = async () => {
  if (!validateForm()) return;

  const formDataToSend = new FormData();
  Object.entries(formData.value).forEach(([key, value]) => {
    if (key !== 'uploadedImage') {
      formDataToSend.append(key, value);
    }
  });

  try {
    const response = await saveListing(formDataToSend, isEdit.value, listingId);
    const houseId = isEdit.value ? listingId : response.id;

    if (fileInputRef.value.files[0]) {
      await uploadListingImage(houseId, fileInputRef.value.files[0]);
    }
    console.log('House saved successfully:', response);
    await router.push({name: 'house', params: {id: houseId}});
  } catch (error) {
    console.error('Error while creating listing:', error);
  }
};

/**
 * Clears the validation error for a specific field.
 * @param {string} field - The field name to clear the validation error for.
 */
const clearValidationError = (field) => {
  if (validationErrors.value[field]) {
    delete validationErrors.value[field];
  }
};
</script>

<template>
  <div class="background"></div>
  <div class="content" v-bind="$attrs">
    <BackButton/>
    <form class="form-container" @submit.prevent="submitForm">
      <h1>{{ isEdit ? 'Edit listing' : 'Create new listing' }}</h1>
      <FormInput id="streetName" v-model="formData.streetName" :validationError="validationErrors.streetName"
                 label="Street name*"
                 placeholder="Enter the streetname" @clearValidationError="clearValidationError"/>
      <div class="form-group">
        <FormInput id="houseNumber" v-model="formData.houseNumber" :validationError="validationErrors.houseNumber"
                   label="House number*"
                   placeholder="Enter house number" type="number" @clearValidationError="clearValidationError"/>
        <FormInput id="addition" v-model="formData.numberAddition" label="Addition (optional)" placeholder="e.g. A"/>
      </div>
      <FormInput id="postalCode" v-model="formData.zip" :validationError="validationErrors.postalCode"
                 label="Postal code*"
                 placeholder="e.g. 1000 AA" @clearValidationError="clearValidationError"/>
      <FormInput id="city" v-model="formData.city" :validationError="validationErrors.city" label="City*"
                 placeholder="e.g. Amsterdam" @clearValidationError="clearValidationError"/>
      <div :class="['form-item', validationErrors.uploadedImage && 'error']">
        <label for="imageUpload">Upload picture (PNG or JPG)*</label>
        <div class="custom-file-input">
          <input
              id="imageUpload"
              ref="fileInputRef"
              accept="image/png, image/jpeg"
              class="image-input"
              name="image"
              type="file"
              @change="handleImageUpload"
          />
          <div class="image-upload-container" @click="triggerFileInput">
            <img v-if="formData.uploadedImage" :src="formData.uploadedImage" alt="Uploaded Image"
                 class="image-preview"/>
            <img v-else alt="Add Image" class="add-image" src="@/assets/icons/ic_plus_grey@3x.png"/>
            <img
                v-if="formData.uploadedImage"
                alt="remove image"
                class="remove-button"
                src="@/assets/icons/ic_clear_white@3x.png"
                @click.stop="removeImage"
            />
          </div>
        </div>
        <span v-if="validationErrors.uploadedImage" class="error-message">{{ validationErrors.uploadedImage }}</span>
      </div>
      <FormInput id="price" v-model="formData.price" :validationError="validationErrors.price" label="Price*"
                 placeholder="e.g. €150.000"
                 type="number" @clearValidationError="clearValidationError"/>
      <div class="form-group">
        <FormInput id="size" v-model="formData.size" :validationError="validationErrors.size" label="Size*"
                   placeholder="e.g. 60 m2"
                   type="number" @clearValidationError="clearValidationError"/>
        <div :class="['form-item', validationErrors.hasGarage && 'error']">
          <label for="hasGarage">Garage*</label>
          <select id="hasGarage" v-model="formData.hasGarage" class="select">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
          <span v-if="validationErrors.hasGarage" class="error-message">{{ validationErrors.hasGarage }}</span>
        </div>
      </div>
      <div class="form-group">
        <FormInput id="bedrooms" v-model="formData.bedrooms" :validationError="validationErrors.bedrooms"
                   label="Bedrooms*"
                   placeholder="Enter amount"
                   type="number" @clearValidationError="clearValidationError"/>
        <FormInput id="bathrooms" v-model="formData.bathrooms" :validationError="validationErrors.bathrooms"
                   label="Bathrooms*"
                   placeholder="Enter amount"
                   type="number" @clearValidationError="clearValidationError"/>
      </div>
      <FormInput id="constructionYear" v-model="formData.constructionYear"
                 :validationError="validationErrors.constructionYear"
                 label="Construction Year*"
                 placeholder="e.g. 1990" type="number" @clearValidationError="clearValidationError"/>
      <FormInput id="description" v-model="formData.description" :validationError="validationErrors.description"
                 label="Description*"
                 placeholder="Enter description" type="textarea" @clearValidationError="clearValidationError"/>
      <div class="form-submit">
        <button class="btn" type="submit">{{ isEdit ? 'SAVE' : 'POST' }}</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/img_background@3x.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.form-container {
  width: 100%;
  max-width: 450px;
}

.custom-file-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.custom-file-input input[type="file"] {
  display: none;
}

.custom-file-input span {
  font-size: 14px;
  color: var(--text-secondary);
}

.image-upload-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 190px;
  border: dashed #4A4B4C;
  border-radius: 8px;
  cursor: pointer;
}

.remove-button {
  position: absolute;
  top: -16px;
  right: -16px;
  cursor: pointer;
  width: 32px;
  height: 32px;
}

.image-preview {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
}

.add-image {
  width: 50px;
  height: 50px;
}

.form-group {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.form-group .form-item {
  flex: 1;
  width: 40vw;
}

.form-submit {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  width: 45%;
}

@media (max-width: 768px) {
  .background {
    bottom: 0;
    height: 100%;
    background-position: bottom;
    background-attachment: fixed;
  }

  .form-container {
    width: 100%;
    margin: 0 auto;
  }

  .form-group {
    gap: 10px;
  }

  .image-upload-container {
    width: 90px;
    height: 90px;
  }

  .image-preview {
    width: 100px;
    height: 100px;
  }

  .add-image {
    width: 30px;
    height: 30px;
  }

  .btn {
    width: 100%;
  }
}
</style>

