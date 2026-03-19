<script setup lang="ts">
const props = defineProps({
  login: { type: String, required: true },
  level: { type: Number, required: true },
  experience: { type: Number, required: true },
  experienceGained: { type: Number, required: true },
});

type Badge = { bageName: string; textColor: string };

const levelBadges: Record<number, Badge> = {
  1: { bageName: 'material-symbols:circle', textColor: 'text-[#65686d]' },
  2: { bageName: 'material-symbols:change-history-rounded', textColor: 'text-[#a7253c]' },
  3: { bageName: 'material-symbols:square-rounded', textColor: 'text-[#b53e1b]' },
  4: { bageName: 'material-symbols:pentagon-rounded', textColor: 'text-[#d0a108]' },
  5: { bageName: 'material-symbols:hexagon-rounded', textColor: 'text-[#166734]' },
  6: { bageName: 'material-symbols:brightness-empty-rounded', textColor: 'text-[#1371af]' },
  7: { bageName: 'material-symbols:favorite-rounded', textColor: 'text-[#62439b]' },
  8: { bageName: 'material-symbols:fertile-rounded', textColor: 'text-[#ad45a4]' },
  9: { bageName: 'material-symbols:folder-rounded', textColor: 'text-[#4f2133]' },
  10: { bageName: 'material-symbols:tv-rounded', textColor: 'text-[#816547]' },
};

const badge = ref(
  levelBadges[props.level] ?? { bageName: 'material-symbols:circle', textColor: 'text-[#000000]' }
);

const nextLevelExperience = 100;
const experienceBefore = ref(props.experience - props.experienceGained);
const experienceAfter = ref(experienceBefore.value);

onMounted(() => {
  setTimeout(() => {
    experienceAfter.value = props.experience;
  }, 50);
});
</script>

<template>
  <div
    class="w-min flex items-center gap-4 px-4 py-2 border rounded-lg whitespace-nowrap border-gray-300"
    :class="[$attrs.class]"
  >
    <div class="flex flex-row items-center gap-2">
      <Icon name="mdi:user-circle" size="24" />
      <span class="text-base truncate max-w-12 sm:max-w-16 md:max-w-24">{{ login }}</span>
    </div>

    <div class="relative flex justify-center items-center min-w-12 min-h-12 select-none">
      <Icon
        :name="badge.bageName"
        :class="[badge.textColor]"
        class="absolute inset-0 w-full h-full z-0"
      />
      <span class="text-sm font-bold text-white z-10">
        {{ level }}
      </span>
    </div>

    <div
      class="min-w-40 sm:min-w-48 md:min-w-64 min-h-6 flex justify-center relative bg-blue-100 rounded-lg overflow-hidden select-none"
    >
      <div
        class="absolute left-0 z-10 h-full bg-blue-300 transition-[width] duration-[1000ms] ease-linear"
        :style="{ width: (experienceAfter / nextLevelExperience) * 100 + '%' }"
      ></div>
      <div
        class="absolute left-0 z-20 h-full bg-blue-400"
        :style="{ width: (experienceBefore / nextLevelExperience) * 100 + '%' }"
      ></div>
      <span class="flex items-center gap-1 text-sm z-40">
        <span class="font-semibold text-slate-900">{{ experience }} XP</span>
        <span class="text-slate-600">(+{{ experienceGained }} XP)</span>
      </span>
    </div>
  </div>
</template>
