<template>
  <div>
    <label>{{ title }}</label>
    <input type="text" :value="modelValue" @input="onInput" :placeholder="meta.placeholder" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    meta: {
      type: Object as PropType<{ placeholder: string }>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('update:modelValue', input.value)
    }
  }
})
</script>
