<template>
  <div v-if="survey.process <= survey.total">
    <h2>{{ `Current Progress: ${survey.process} / ${survey.total}` }}</h2>
    <div>
      <component
        v-for="(question, index) in survey.questions"
        :key="question.id"
        :is="getComponentName(question.type)"
        v-bind="question"
        v-model="answers[index]"
      />
      <button @click="prevPage" :disabled="survey.process === 1">Prev</button>
      <button @click="nextPage">
        {{ survey.process === survey.total ? 'Submit' : 'Next' }}
      </button>
    </div>
  </div>
  <div v-else>You submitted your answers</div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import { ref, onMounted, watch } from 'vue'

export default {
  props: {
    survey: Object,
    switchPage: Function
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
      answers.value = props.survey.questions.map((question) => '')
    }

    initializeAnswers()

    const nextPage = () => {
      props.switchPage('next')
    }

    const prevPage = () => {
      props.switchPage('prev')
    }

    const retake = () => {
      props.switchPage('begin')
    }

    return {
      answers,
      getComponentName,
      nextPage,
      prevPage,
      retake
    }
  }
}
</script>
