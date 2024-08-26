<template>
  <div>
    <label>{{ title }}</label>
    <input type="text" :value="modelValue" @input="onInput" :placeholder="meta.placeholder" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  meta: { placeholder: string }
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.value)
}
</script>
