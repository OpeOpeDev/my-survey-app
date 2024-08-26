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
  <div v-else>
    <h2>Survey Completed</h2>
    <div>
      <h3>Review Your Answers:</h3>
      <ul>
        <li v-for="(answer, index) in answers" :key="index">
          <h4>{{ survey.questions[index].label }}</h4>
          <p>
            <span v-if="Array.isArray(answer) && answer.length">
              {{ answer.join(', ') }}
            </span>
            <span v-else-if="!Array.isArray(answer) && answer">
              {{ answer }}
            </span>
            <span v-else>No answer provided</span>
          </p>
        </li>
      </ul>
      <button @click="retake">Retake</button>
      <router-link to="/">
        <button @click="retake">Home</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import { useSurveyStore } from '../stores/surveyStore'
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
    const surveyStore = useSurveyStore()

    const getComponentName = (type) =>
      ({
        text: 'TextInput'
      })[type] || null

    const updateStoreAnswers = () => {
      props.survey.questions.forEach((question, index) => {
        surveyStore.setAnswer(question.id, answers.value[index])
      })
    }

    const initializeAnswers = () => {
      answers.value = props.survey.questions.map(
        (question) => surveyStore.getAnswer(question.id) || (question.type === 'checkbox' ? [] : '')
      )
    }

    initializeAnswers()
    updateStoreAnswers()

    onMounted(() => {
      initializeAnswers()
      updateStoreAnswers()
    })

    watch(() => props.survey.process, initializeAnswers)

    const nextPage = () => {
      updateStoreAnswers()
      props.switchPage('next')
    }

    const prevPage = () => {
      updateStoreAnswers()
      props.switchPage('prev')
    }

    const retake = () => {
      surveyStore.clearAnswers()
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
