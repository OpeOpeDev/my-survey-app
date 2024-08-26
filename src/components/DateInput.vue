<template>
  <div>
    <label>{{ title }}</label>
    <input type="date" v-model="dateValue" />
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

const dateValue = ref(props.modelValue)

watch(dateValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>
