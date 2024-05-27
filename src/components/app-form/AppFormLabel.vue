<script setup lang="ts"></script>

<template>
  <label class="app-form-label">
    <slot />
  </label>
</template>

<style lang="scss" scoped>
.app-form-label {
  @apply text-xs tracking-wide font-medium text-slate-600;
}
</style>
