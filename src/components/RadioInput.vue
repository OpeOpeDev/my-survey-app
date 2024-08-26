<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ title }}</label>
    <div class="space-y-2">
      <label v-for="option in meta.options" :key="option" class="flex items-center space-x-2">
        <input
          type="radio"
          :value="option"
          v-model="selectedValue"
          @change="updateValue"
          class="form-radio text-blue-500 focus:ring-blue-500"
        />
        <span class="text-gray-700">{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  meta: { options: string[] }
  title: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValue.value = newValue
  }
)

const updateValue = () => {
  emit('update:modelValue', selectedValue.value)
}
</script>
