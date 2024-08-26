<template>
  <div>
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
      {
        id: 'q2',
        title: 'What is your name?',
        type: 'text',
        meta: { placeholder: 'Enter your name' }
      },
      {
        id: 'q3',
        title: 'What is your name?',
        type: 'text',
        meta: { placeholder: 'Enter your name' }
      },
      {
        id: 'q4',
        title: 'What is your name?',
        type: 'text',
        meta: { placeholder: 'Enter your name' }
      },
      {
        id: 'q5',
        title: 'What is your name?',
        type: 'text',
        meta: { placeholder: 'Enter your name' }
      }
    ]

    const questionIndices = [0, 3, 5] // Indices for the questions to display
    const currentPageIdx = ref(0)

    const currentSurvey = computed(() => {
      const startIdx = questionIndices[currentPageIdx.value]
      const endIdx = questionIndices[currentPageIdx.value + 1] || questions.length
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
