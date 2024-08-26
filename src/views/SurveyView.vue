<template>
  <div>
    <QuestionsView :survey="currentSurvey" />
  </div>
</template>

<script>
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
      }
    ]
    const currentSurvey = {
      questions: questions
    }
    return {
      currentSurvey
    }
  }
}
</script>
