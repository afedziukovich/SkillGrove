import type { ComputedRef, MaybeRef } from 'vue';

type ComponentProps<T> = T extends new (...args: any) => { $props: infer P }
  ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any
    ? P
    : {};

declare module 'nuxt/app' {
  interface NuxtLayouts {
    default: ComponentProps<
      typeof import('E:/Study/js-fe-2025Q3/SkillGrove/app/layouts/default.vue').default
    >;
  }
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts;
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>;
  }
}
