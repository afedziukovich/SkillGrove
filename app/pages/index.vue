<template>
  <div>
    <h1>Hello, world!</h1>
    <div class="card">
      <button class="btn-counter" type="button" @click="count++">Count is {{ count }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<style scoped>
.btn-counter {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
</style>
