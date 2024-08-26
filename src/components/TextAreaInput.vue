<template>
  <div class="mb-4">
    <label :for="title" class="block text-gray-700 text-sm font-bold mb-2">{{ title }}</label>
    <textarea
      v-model="textValue"
      :placeholder="meta.placeholder"
      @input="updateValue"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  meta: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const textValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    textValue.value = newValue
  }
)

const updateValue = (event) => {
  textValue.value = event.target.value
  emit('update:modelValue', textValue.value)
}
</script>
