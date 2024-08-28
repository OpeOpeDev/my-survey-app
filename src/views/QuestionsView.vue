<template>
  <div class="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
    <div v-if="survey.process <= survey.total">
      <h2 class="text-2xl font-bold mb-4">
        {{ `Current Progress: ${survey.process} / ${survey.total}` }}
      </h2>
      <div class="space-y-6">
        <component
          v-for="(question, index) in survey.questions"
          :key="question.id"
          :is="getComponentName(question.type)"
          v-bind="question"
          v-model="answers[index]"
        />
        <div class="flex justify-between mt-8">
          <button
            @click="prevPage"
            :disabled="survey.process === 1"
            class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            {{ survey.process === survey.total ? 'Submit' : 'Next' }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="text-2xl font-bold mb-4">Survey Completed</h2>
      <div class="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold mb-4">Review Your Answers:</h3>
        <ul class="space-y-4">
          <li v-for="(answer, index) in answers" :key="index" class="border-b pb-2">
            <h4 class="font-medium text-gray-800">{{ survey.questions[index].title }}</h4>
            <p class="text-gray-600 break-words">
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
      </div>
      <div class="flex justify-between mt-8">
        <button
          @click="retake"
          class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Retake
        </button>
        <router-link to="/">
          <button
            @click="retake"
            class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
          >
            Home
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import CheckboxInput from '../components/CheckboxInput.vue'
import DateInput from '../components/DateInput.vue'
import TextAreaInput from '../components/TextAreaInput.vue'
import RadioInput from '../components/RadioInput.vue'
import { useSurveyStore } from '../stores/surveyStore'
import { ref, onMounted, watch } from 'vue'

export default {
  props: {
    survey: Object,
    switchPage: Function
  },
  components: {
    TextInput,
    TextAreaInput,
    CheckboxInput,
    DateInput,
    RadioInput
  },
  setup(props) {
    const answers = ref([])
    const surveyStore = useSurveyStore()

    const getComponentName = (type) =>
      ({
        text: 'TextInput',
        textarea: 'TextAreaInput',
        checkbox: 'CheckboxInput',
        date: 'DateInput',
        radio: 'RadioInput'
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
