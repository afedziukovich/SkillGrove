<script setup lang="ts">
const props = defineProps({
  maxExperience: { type: Number, required: true },
  experienceGained: { type: Number, required: true },
  attemptAt: { type: Number, required: true },
});

const percentage = ref((props.experienceGained / props.maxExperience) * 100);

const background = computed(() => {
  const completness = {
    Low: {
      color: 'bg-red-500',
    },
    Moderate: {
      color: 'bg-yellow-500',
    },
    High: {
      color: 'bg-green-500',
    },
  };

  if (percentage.value >= 90) {
    return completness.High;
  } else if (percentage.value >= 11) {
    return completness.Moderate;
  }
  return completness.Low;
});

const relativeTime = computed(() => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const elapsed = props.attemptAt - Date.now();
  const absElapsed = Math.abs(elapsed);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (absElapsed < msPerMinute) {
    return 'just now';
  } else if (absElapsed < msPerHour) {
    return rtf.format(Math.round(elapsed / msPerMinute), 'minute');
  } else if (absElapsed < msPerDay) {
    return rtf.format(Math.round(elapsed / msPerHour), 'hour');
  } else {
    return rtf.format(Math.round(elapsed / msPerDay), 'day');
  }
});
</script>

<template>
  <div class="flex items-center gap-2 border rounded-md px-1 py-1">
    <div class="text-white font-semibold px-1 rounded-md" :class="[background.color]">
      {{ percentage }}%
    </div>
    <div class="flex items-center gap-2">
      <span>{{ relativeTime }}</span>
      <Icon name="material-symbols:trophy-rounded" class="text-yellow-400" size="20" />
    </div>
  </div>
</template>
