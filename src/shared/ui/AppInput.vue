<template>
  <input
    :type="type"
    :value="modelValue"
    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  type?: string
}>()

// eslint-disable-next-line no-unused-vars
defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>
