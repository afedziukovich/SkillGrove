<template>
  <div class="h-dvh flex flex-col">
    <AppHeader />
    <main class="grow flex flex-col items-center justify-center">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>
