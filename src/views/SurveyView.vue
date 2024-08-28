<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <QuestionsView :survey="currentSurvey" :switchPage="switchPage" />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import QuestionsView from './QuestionsView.vue'

export default {
  components: { QuestionsView },
  setup() {
    const questions = [
      {
        id: 'q1',
        title: 'What is your name?',
        type: 'text',
        meta: { placeholder: 'Enter your name' }
      },
      { id: 'q2', title: 'When is your birthday?', type: 'date', meta: {} },
      {
        id: 'q3',
        title: 'What is your favorite color?',
        type: 'radio',
        meta: { options: ['Red', 'Green', 'Blue', 'Yellow'] }
      },
      {
        id: 'q4',
        title: 'Which hobbies do you enjoy?',
        type: 'checkbox',
        meta: {
          options: ['Reading', 'Traveling', 'Cooking', 'Sports']
        }
      },
      {
        id: 'q5',
        title: 'Tell us about yourself.',
        type: 'textarea',
        meta: { placeholder: 'Write something about yourself...' }
      }
    ]
    const questionIndices = [0, 2, 5]
    // Indices for the questions to display
    // For example, if `questionIndices = [0, 1, 4, 5]`,
    // the survey will show 5 questions of the `questions` in pages.
    // The first page will have the question at index 0,
    // the second page will show the questions from index 1 to 3,
    // and the last page will show the question at index 4.
    const currentPageIdx = ref(0)

    const currentSurvey = computed(() => {
      const startIdx =
        currentPageIdx.value === questionIndices.length - 1
          ? 0 // For review page
          : questionIndices[currentPageIdx.value]

      const endIdx =
        questionIndices[currentPageIdx.value + 1] || questionIndices[questionIndices.length - 1]
      return {
        process: currentPageIdx.value + 1,
        total: questionIndices.length - 1,
        questions: questions.slice(startIdx, endIdx)
      }
    })
    const switchPage = (direction) => {
      switch (direction) {
        case 'next':
          if (currentPageIdx.value < questionIndices.length - 1) {
            currentPageIdx.value++
          }
          break
        case 'prev':
          if (currentPageIdx.value > 0) {
            currentPageIdx.value--
          }
          break
        case 'begin':
          currentPageIdx.value = 0
          break
        default:
          console.warn(`Unknown direction: ${direction}`)
      }
    }
    return {
      currentSurvey,
      switchPage
    }
  }
}
</script>
