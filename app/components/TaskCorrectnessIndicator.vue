<script setup lang="ts">
type CorrectnessType = 'Correct' | 'Partly correct' | 'Incorrect';

const props = defineProps<{
  correctness: CorrectnessType;
}>();

const correctnessIcons = {
  Correct: {
    name: 'material-symbols:sentiment-excited',
    color: 'text-green-500',
    bg: 'bg-green-100',
    border: 'border-green-500',
  },
  'Partly correct': {
    name: 'material-symbols:sentiment-neutral',
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
  },
  Incorrect: {
    name: 'material-symbols:sentiment-sad',
    color: 'text-red-500',
    bg: 'bg-red-100',
    border: 'border-red-500',
  },
};
</script>

<template>
  <h5
    class="w-min flex flex-row gap-2 items-center text-2xl m-0 px-4 py-2 rounded-full border select-none text-nowrap"
    :class="[
      correctnessIcons[props.correctness].bg,
      correctnessIcons[props.correctness].border,
      $attrs.class,
    ]"
  >
    <Icon
      :name="correctnessIcons[props.correctness].name"
      :class="correctnessIcons[props.correctness].color"
      size="24"
    />
    <div class="capitalize" :class="correctnessIcons[props.correctness].color">
      {{ props.correctness }}
    </div>
  </h5>
</template>
