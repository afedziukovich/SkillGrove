<script setup lang="ts">
const props = defineProps({
  text: { type: String, required: true },
  link: { type: String, required: true },
});
</script>

<template>
  <NuxtLink
    :to="props.link"
    class="flex flex-row gap-2 items-center py-1 px-2 bg-white hover:bg-[#e6f3ff] text-nowrap"
    :class="[$attrs.class]"
  >
    <Icon name="material-symbols:category" size="20" class="text-black-400" />
    <span class="capitalize">{{ props.text }}</span>
  </NuxtLink>
</template>
