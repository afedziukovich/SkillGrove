<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold">Settings</h1>

    <div class="border rounded-lg p-6 space-y-4">
      <div class="flex items-center justify-between">
        <span>Dark theme</span>
        <input type="checkbox" />
      </div>

      <div class="flex items-center justify-between">
        <span>Email notifications</span>
        <input type="checkbox" />
      </div>
    </div>
  </div>
</template>
