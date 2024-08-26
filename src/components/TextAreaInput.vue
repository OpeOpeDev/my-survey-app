<template>
  <div>
    <label :for="title">{{ title }}</label>
    <textarea v-model="textValue" :placeholder="meta.placeholder" @input="updateValue"></textarea>
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
