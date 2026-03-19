<script setup lang="ts">
import type { RandomTaskDTO, TaskJudgmentResultDTO, TaskSolutionDTO } from '~~/shared/dtos';
import type { RandomTaskParametersDTO } from '~~/shared/schemas';
import { FetchError } from 'ofetch';

definePageMeta({
  requiresAuth: false,
});

const toast = useToast();
const currentMode = ref('text');

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
      <div
        class="w-min flex flex-row gap-[1px] items-center bg-gray-300 border border-b-gray-300 rounded-md overflow-hidden"
      >
        <TaskBreadcrumb :text="randomTask.category.name" link="/categories" />
        <TaskBreadcrumb
          :text="randomTask.difficulty.name"
          :link="`/difficulties?categoryId=${randomTask.category.id}`"
        />
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
          class="flex flex-col gap-2"
          :disabled="isFormDisabled"
          @submit.prevent="handleSolutionSubmit"
        >
          <input v-model="solutionForm.taskId" type="hidden" name="taskId" />

          <div class="flex flex-col items-start">
            <div
              class="w-min flex flex-row gap-[2px] rounded-t-md border border-b-0 border-gray-300"
            >
              <button
                v-for="m in ['text', 'js', 'ts', 'json']"
                :key="m"
                class="px-2 py-2 md:px-4 font-medium border-b-2 border-transparent hover:border-gray-300 text-sm md:text-base"
                :class="{ 'text-[#08c] border-[#08c]': currentMode === m }"
                type="button"
                @click="currentMode = m"
              >
                {{ m.toUpperCase() }}
              </button>
            </div>

            <div class="w-full flex flex-row gap-2">
              <CodeEditor
                v-model="solutionForm.solution"
                class="flex-1 rounded-b-md rounded-e-md overflow-hidden border border-gray-300"
                :mode="currentMode"
                name="solution"
                placeholder="Enter solution..."
                :min-rows="randomTask.task.type === 'task' ? 10 : 4"
                :disabled="isFormDisabled"
              />

              <button
                type="submit"
                class="btn btn-primary md:min-w-32 !py-3 flex items-center justify-center gap-1 !rounded-md"
                :disabled="isFormDisabled"
              >
                <span>Submit</span>
                <Icon name="material-symbols:task-alt-rounded" size="16" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </template>

    <div v-if="isSending" class="flex-1 min-h-36 w-full flex items-center justify-center gap-2">
      <img src="../assets/images/svg/loading.svg" class="size-8" />
      <span class="text-xl font-bold">Solution Judgment...</span>
    </div>

    <template v-if="taskJudgmentResult">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col md:flex-row items-center gap-4">
          <TaskCorrectnessIndicator :correctness="taskJudgmentResult.correctness" />
          <ProfileProgressPortable
            :login="taskJudgmentResult.user.login"
            :level="taskJudgmentResult.user.level"
            :experience="taskJudgmentResult.user.experience"
            :experience-gained="taskJudgmentResult.experienceGained"
          />
        </div>
        <ExplanationAccordion :explaination="taskJudgmentResult.explaination" />
        <button
          class="btn btn-primary self-center !text-xl !py-4 flex items-center justify-center gap-2 !rounded-md"
          @click="() => getRandomTask(categoryId, difficultyId)"
        >
          <Icon name="material-symbols:search-rounded" size="24" />
          <span>Find New Task</span>
        </button>
      </div>
    </template>
  </div>
</template>
