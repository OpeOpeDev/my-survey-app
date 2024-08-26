<template>
  <div>
    <label>{{ title }}</label>
    <div>
      <label v-for="option in meta.options" :key="option">
        <input type="radio" :value="option" v-model="selectedValue" @change="updateValue" />
        <span>{{ option }}</span>
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
