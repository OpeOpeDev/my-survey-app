<template>
  <div>
    <label>{{ title }}</label>
    <div>
      <label v-for="option in meta.options" :key="option">
        <input
          type="checkbox"
          :value="option"
          :checked="modelValue.includes(option)"
          @change="(event) => updateValue(event.target.checked, option)"
        />
        <span>{{ option }}</span>
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
