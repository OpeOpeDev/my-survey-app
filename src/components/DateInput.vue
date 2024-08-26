<template>
  <div>
    <label>{{ title }}</label>
    <input type="date" v-model="dateValue" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  props: {
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
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const dateValue = ref(props.modelValue)

    watch(dateValue, (newValue) => {
      emit('update:modelValue', newValue)
    })

    return {
      dateValue
    }
  }
}
</script>
