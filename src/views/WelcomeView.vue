<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-8 text-gray-800">Welcome to the Survey!</h1>
    <router-link to="/survey">
      <button
        class="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
      >
        Take Survey
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'WelcomeView'
}
</script>
