<script lang="ts" setup>
const props = defineProps({
  explaination: { type: String, required: true },
});
</script>

<template>
  <details class="group border border-b-gray-300 rounded-lg overflow-hidden bg-gray-50">
    <summary
      class="flex justify-between items-center cursor-pointer select-none p-2 text-2xl list-none bg-[#08c] text-white"
    >
      <div class="flex items-center gap-2">
        <Icon name="material-symbols:info-rounded" size="24" /> See Explaination
      </div>
      <Icon name="material-symbols:add-rounded" size="24" class="group-open:hidden ml-2" />
      <Icon name="material-symbols:remove-rounded" size="24" class="hidden group-open:block ml-2" />
    </summary>
    <MDC :value="props.explaination" tag="div" class="mdc rounded-lg overflow-hidden p-4" />
  </details>
</template>
