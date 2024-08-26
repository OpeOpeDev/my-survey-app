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

<script>
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
  data() {
    return {
      selectedValue: this.modelValue
    }
  },
  methods: {
    updateValue() {
      this.$emit('update:modelValue', this.selectedValue)
    }
  },
  watch: {
    modelValue(newValue) {
      this.selectedValue = newValue
    }
  }
}
</script>
