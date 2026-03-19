<script setup lang="ts">
import { computed } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';

const props = defineProps({
  modelValue: { type: String, default: '' },
  mode: { type: String, default: 'text' },
  placeholder: { type: String, default: 'Увядзіце код...' },
  disabled: { type: Boolean, default: false },
  name: { type: String, default: '' },
  minRows: { type: Number, default: 3 },
  isDark: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const extensions = computed(() => {
  const exts = [EditorView.lineWrapping];

  if (props.isDark) {
    exts.push(oneDark);
  }

  if (props.mode === 'json') {
    exts.push(json());
  } else if (props.mode === 'js') {
    exts.push(javascript());
  } else if (props.mode === 'ts') {
    exts.push(javascript({ typescript: true }));
  }

  return exts;
});

const minHeightStyle = computed(() => ({
  minHeight: `${props.minRows * 1.4}em`,
  height: 'auto',
}));

function onContainerClick(event: Event) {
  if (event.target && event.currentTarget instanceof HTMLElement) {
    const element = event.currentTarget.querySelector('.cm-content');
    if (element instanceof HTMLElement) {
      element.focus();
    }
  }
}
</script>

<template>
  <div class="cursor-text" :class="[$attrs.class]" @click="onContainerClick">
    <client-only>
      <codemirror
        class="w-full px-4 py-3 text-[14px] sm:text-[16px] md:text-[18px] border border-gray-300 rounded-sm focus:outline-none focus:border-[#08c] focus:ring-1 focus:ring-[#08c] transition-colors"
        :model-value="modelValue"
        :placeholder="placeholder"
        :extensions="extensions"
        :style="minHeightStyle"
        :indent-with-tab="true"
        :disabled="props.disabled"
        @change="emit('update:modelValue', $event)"
      />
    </client-only>
  </div>
</template>
