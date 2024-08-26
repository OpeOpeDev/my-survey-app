<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ title }}</label>
    <div class="space-y-2">
      <label v-for="option in meta.options" :key="option" class="flex items-center space-x-2">
        <input
          type="checkbox"
          :value="option"
          :checked="modelValue.includes(option)"
          @change="(event) => updateValue(event.target.checked, option)"
          class="form-checkbox h-4 w-4 text-blue-500 focus:ring-blue-500"
        />
        <span class="text-gray-700">{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string[]
  meta: { options: string[] }
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const updateValue = (checked: boolean, option: string) => {
  const newValue = checked
    ? [...props.modelValue, option]
    : props.modelValue.filter((v) => v !== option)
  emit('update:modelValue', newValue)
}
</script>
