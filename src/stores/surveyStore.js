import { defineStore } from 'pinia'

export const useSurveyStore = defineStore('survey', {
  state: () => ({
    answers: []
  }),
  actions: {
    setAnswer(questionId, answer) {
      this.answers[questionId] = answer
    },
    clearAnswers() {
      this.answers = []
    },
    getAnswer(questionId) {
      const answer = this.answers[questionId]
      return answer
    }
  }
})
