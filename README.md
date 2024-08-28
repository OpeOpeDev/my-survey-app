# Survey App

**Survey App** is a Vite/Vue 3 application using Composition API. The app presents a series of questions spread across multiple sequential pages, storing the answers in a Pinia store. It demonstrates the use of reusable components, dynamic rendering, and state management without a backend database. The app is also styled using Tailwind CSS.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Components](#components)
- [Views](#views)
- [Pinia Store](#pinia-store)
- [Routing](#routing)
- [Customization](#customization)
- [Future Enhancements](#future-enhancements)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/crazyfullstack/my-survey-app.git
   ```

1. Navigate to the project directory:

   ```bash
   cd my-survey-app
   ```

1. Install the dependencies:

   ```bash
   npm install
   ```

1. Start the development server:

   ```bash
   npm run dev
   ```

## Project Structure

Here is the structure of the project:

```text
survey-app/
│
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── main.css          # Tailwind CSS setup
│   ├── components/           # Reusable input components
│   │   ├── CheckboxInput.vue
│   │   ├── DateInput.vue
│   │   ├── RadioInput.vue
│   │   ├── TextAreaInput.vue
│   │   └── TextInput.vue
│   ├── router/
│   │   └── index.js          # Vue Router setup
│   ├── stores/
│   │   └── surveyStore.js    # Pinia store for survey answers
│   ├── views/                # Pages of the app
│   │   ├── QuestionsView.vue
│   │   ├── SurveyView.vue
│   │   └── WelcomeView.vue
│   ├── App.vue               # Root component
│   └── main.js               # Entry point
│
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Components

- **CheckboxInput.vue**

  This component renders a set of checkboxes for multi-select questions.

- **DateInput.vue**

  This component renders a date input field.

- **RadioInput.vue**

  This component renders a set of radio buttons for single-select questions.

- **TextAreaInput.vue**

  This component renders a textarea for longer text input.

- **TextInput.vue**

  This component renders a text input field.

## Views

- **QuestionsView.vue**

  This view displays the questions for the current survey page.

  - Displays the relevant input components based on the question type.
  - Handles navigation between questions and stores answers in the Pinia store.

- **SurveyView.vue**

  This view serves as the container for the entire survey process.

  - Initializes the questions and manages the pagination of the survey.

- **WelcomeView.vue**

  This view is the landing page of the application.

  - Welcomes the user and provides a button to start the survey.

## Pinia Store

_surveyStore.js_

The Pinia store manages the state of the survey answers.

- State:
  - answers: An array that stores the answers to each question.
- Actions:
  - setAnswer(questionId, answer): Updates the answer for a specific question.
  - clearAnswers(): Resets the answers array.
  - getAnswer(questionId): Retrieves the answer for a specific question.

## Routing

The application uses Vue Router to handle navigation.

- `/`: Welcome page.
- `/survey`: Survey pages.

## Customization

To customize the survey app:

- Add or remove questions in `SurveyView.vue.`
- Add, remove or modify question types under `src/components/`
- Determine how many questions would be shown in each page by modifying `questionIndices`.
- Customize the styles using Tailwind CSS in `main.css`.

## Future Enhancements

- Add transitions between survey pages for a smoother user experience.
- Integrate a backend to store survey answers.
- Improve the UI/UX with more advanced Tailwind CSS features.
- Add validation for the input fields.
- Add `Modify` button rather than `Retake` button in the review page for the user convenience.
- Add User Authentication and Profiles to the database.
- Add support for conditional logic where the next question displayed is based on a user's previous answers.
- Implement a feature that allows users to export survey results in formats like CSV or PDF.
