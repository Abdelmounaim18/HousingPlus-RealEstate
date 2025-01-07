<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  modelValue: [String, Number, Boolean],
  label: String,
  id: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false
  },
  validationError: String
});

const emit = defineEmits(['update:modelValue', 'clearValidationError']);

const localValue = ref(props.modelValue);

// Watches for changes and updates value or clears validation error
watch(localValue, (newValue) => {
  emit('update:modelValue', newValue);
  emit('clearValidationError', props.id);
});

watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});
</script>

<template>
  <div v-if="type === 'textarea'" :class="['form-item', validationError && 'error']">
    <label :for="id">{{ label }}</label>
    <textarea
        :id="id"
        v-model="localValue"
        :placeholder="placeholder"
        :required="required"
        v-bind="$attrs"
    ></textarea>
    <span v-if="validationError" class="error-message">{{ validationError }}</span>
  </div>
  <div v-else :class="['form-item', validationError && 'error']">
    <label :for="id">{{ label }}</label>
    <input
        :id="id"
        v-model="localValue"
        :placeholder="placeholder"
        :required="required"
        :type="type"
        v-bind="$attrs"
    />
    <span v-if="validationError" class="error-message">{{ validationError }}</span>
  </div>
</template>

<style>
.form-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 14px;
}

.form-item.error input,
.form-item.error select,
.form-item.error textarea {
  border: 1px solid red;
}

.form-item.error .error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.form-item label {
  margin: 10px 0;
  color: var(--text-secondary);
  font-weight: bold;
}

.form-item input,
.form-item select,
.form-item textarea {
  padding: 18px;
  border: none;
  border-radius: 8px;
  color: var(--text-secondary);
}

.form-item input::placeholder,
.form-item textarea::placeholder {
  color: var(--tertiary-color-2);
}

.form-item textarea {
  resize: none;
  height: 100px;
  font-family: "Open Sans", sans-serif;
}
</style>
