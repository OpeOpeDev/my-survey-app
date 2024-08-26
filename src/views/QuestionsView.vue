<template>
  <div>
    <h2>Questions below</h2>

    <div>
      <component
        v-for="(question, index) in survey.questions"
        :key="question.id"
        :is="getComponentName(question.type)"
        v-bind="question"
        v-model="answers[index]"
        class="mb-4"
      />
    </div>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import { ref, onMounted, watch } from 'vue'

export default {
  props: {
    survey: Object
  },
  components: {
    TextInput
  },
  setup(props) {
    const answers = ref([])

    const getComponentName = (type) =>
      ({
        text: 'TextInput'
      })[type] || null

    const updateStoreAnswers = () => {
      props.survey.questions.forEach((question, index) => {
        setAnswer(question.id, answers.value[index])
      })
    }

    const initializeAnswers = () => {
      answers.value = ''
    }

    initializeAnswers()

    return {
      answers,
      getComponentName
    }
  }
}
</script>
