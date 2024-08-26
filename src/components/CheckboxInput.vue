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
        <span class="text-gray-700">{{ option }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    meta: {
      type: Object as PropType<{ options: string[] }>,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (checked: boolean, option: string) => {
      console.log('modelValue: ', props.modelValue)
      const newValue = checked
        ? [...props.modelValue, option]
        : props.modelValue.filter((v) => v !== option)
      emit('update:modelValue', newValue)
    }

    return {
      updateValue
    }
  }
})
</script>
