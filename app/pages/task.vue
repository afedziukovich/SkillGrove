<script setup lang="ts">
import type { RandomTaskDTO, TaskJudgmentResultDTO, TaskSolutionDTO } from '~~/shared/dtos';
import type { RandomTaskParametersDTO } from '~~/shared/schemas';
import { FetchError } from 'ofetch';

definePageMeta({
  requiresAuth: false,
});

const toast = useToast();

const correctnessIcons = {
  Correct: { name: 'material-symbols:sentiment-excited', color: 'text-green-500' },
  'Partly correct': { name: 'material-symbols:sentiment-neutral', color: 'text-yellow-500' },
  Incorrect: { name: 'material-symbols:sentiment-sad', color: 'text-red-500' },
};

const route = useRoute();
const categoryId = computed(() => Number(route.query.categoryId) || 1);
const difficultyId = computed(() => Number(route.query.difficultyId) || 1);

const isLoading = ref<boolean>(false);
const isSending = ref<boolean>(false);
const isFormDisabled = ref<boolean>(false);

const randomTask = ref<RandomTaskDTO | null>(null);
const solutionForm = reactive<TaskSolutionDTO>({
  taskId: 0,
  solution: '',
});
const taskJudgmentResult = ref<TaskJudgmentResultDTO | null>(null);

async function getRandomTask(categoryId: number, difficultyId: number) {
  isLoading.value = true;
  randomTask.value = null;
  taskJudgmentResult.value = null;
  isFormDisabled.value = false;
  solutionForm.taskId = 0;
  solutionForm.solution = '';

  try {
    const response = await $fetch<RandomTaskDTO>('/api/protected/tasks/random', {
      method: 'GET',
      query: {
        categoryId,
        difficultyId,
      } as RandomTaskParametersDTO,
    });

    randomTask.value = response;
    solutionForm.taskId = randomTask.value.task.id;
    isLoading.value = false;
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      toast.error({
        title: 'Loading Failed',
        message: 'The task could not be loaded. Please refresh or try again.',
      });
    }
  }
}

const handleSolutionSubmit = async () => {
  isSending.value = true;
  taskJudgmentResult.value = null;
  isFormDisabled.value = true;

  try {
    const response = await $fetch<TaskJudgmentResultDTO>('/api/protected/tasks/solution', {
      method: 'POST',
      body: solutionForm,
    });

    toast.info({
      title: `Solution Judgment Result`,
      message: `${response.correctness} (+ ${response.experienceGained} XP)`,
    });

    taskJudgmentResult.value = response;
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      toast.error({
        title: 'Loading Failed',
        message: 'The task could not be loaded. Please refresh or try again.',
      });
    }
  } finally {
    isSending.value = false;
  }
};

onMounted(() => {
  getRandomTask(categoryId.value, difficultyId.value);
});

watch([categoryId, difficultyId], () => {
  getRandomTask(categoryId.value, difficultyId.value);
});
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 container-custom py-16">
    <div v-if="isLoading" class="flex-1 w-full flex items-center justify-center">
      <img src="../assets/images/svg/loading.svg" class="size-16" />
    </div>

    <template v-if="randomTask">
      <div class="flex flex-row gap-4 items-center">
        <span class="flex flex-row gap-2 items-center">
          <Icon name="material-symbols:category" size="20" class="text-black-400" />
          <span class="capitalize">{{ randomTask.category.name }}</span>
        </span>
        <span class="flex flex-row gap-2 items-center">
          <Icon name="material-symbols:book-4-spark-rounded" size="20" class="text-black-400" />
          <span class="capitalize">{{ randomTask.difficulty.name }}</span>
        </span>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <h4 class="flex items-center gap-2 text-xl font-bold">
            <Icon
              name="material-symbols:contact-support-rounded"
              size="24"
              class="text-black-400"
            />
            {{ randomTask.task.title }}
          </h4>

          <MDC :value="randomTask.task.description" tag="article" class="mdc" />
        </div>

        <form
          class="flex flex-row gap-2"
          :disabled="isFormDisabled"
          @submit.prevent="handleSolutionSubmit"
        >
          <input v-model="solutionForm.taskId" type="hidden" name="taskId" />
          <textarea
            v-model="solutionForm.solution"
            class="flex-1 px-4 py-3 text-[15px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
            name="solution"
            required
            placeholder="Enter solution..."
            :disabled="isFormDisabled"
            :rows="randomTask.task.type === 'task' ? 10 : 4"
          ></textarea>
          <button class="btn btn-primary min-w-32 !py-3" :disabled="isFormDisabled">Submit</button>
        </form>
      </div>
    </template>

    <div v-if="isSending" class="flex-1 min-h-36 w-full flex items-center justify-center gap-2">
      <img src="../assets/images/svg/loading.svg" class="size-8" />
      <span class="text-xl font-bold">Solution Judgment...</span>
    </div>

    <template v-if="taskJudgmentResult">
      <div class="flex flex-col gap-4">
        <h5 class="flex flex-row gap-2 items-center text-2xl">
          <Icon
            :name="correctnessIcons[taskJudgmentResult.correctness].name"
            :class="correctnessIcons[taskJudgmentResult.correctness].color"
          />
          <div class="capitalize" :class="correctnessIcons[taskJudgmentResult.correctness].color">
            {{ taskJudgmentResult.correctness }}
          </div>
        </h5>
        <div
          class="flex flex-row w-min gap-4 rounded border-2 border-black text-nowrap p-2 text-md"
        >
          <div class="flex flex-row gap-2">
            <Icon name="mdi:user-circle" size="24" />{{ taskJudgmentResult.user.login }}
          </div>
          <div>{{ taskJudgmentResult.user.level }} lvl</div>
          <div>
            {{ taskJudgmentResult.user.experience }} XP (+{{ taskJudgmentResult.experienceGained }}
            XP)
          </div>
        </div>
        <details>
          <summary class="cursor-pointer select-none p-2 text-2xl">See explaination</summary>
          <MDC
            :value="taskJudgmentResult.explaination"
            tag="p"
            class="mdc rounded-lg bg-slate-100 p-2"
          />
        </details>
        <button
          class="btn btn-primary w-full !py-3"
          @click="() => getRandomTask(categoryId, difficultyId)"
        >
          Find New Task
        </button>
      </div>
    </template>
  </div>
</template>
