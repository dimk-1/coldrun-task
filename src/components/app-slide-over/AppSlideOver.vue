<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { PropType } from 'vue';

import { Breakpoint, Position } from '@/common/constants/components';

const emit = defineEmits(['update:modelValue', 'closed']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Breakpoint | string>,
    default: Breakpoint.sm,
    validator(value: Breakpoint) {
      return Object.values(Breakpoint).includes(value);
    }
  },
  position: {
    type: String as PropType<Position | string>,
    default: Position.Right,
    validator(value: Position) {
      return Object.values(Position).includes(value);
    }
  },
  closeOnBackground: {
    type: Boolean,
    default: true
  }
});

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const isHorizontal = computed(() => ['left', 'right'].includes(props.position));

const transition = computed(() => {
  if (props.position === Position.Left) {
    return {
      enterFrom: '-translate-x-full',
      enterTo: '-translate-x-0',
      leaveFrom: '-translate-x-0',
      leaveTo: '-translate-x-full'
    };
  }

  if (props.position === Position.Right) {
    return {
      enterFrom: 'translate-x-full',
      enterTo: 'translate-x-0',
      leaveFrom: 'translate-x-0',
      leaveTo: 'translate-x-full'
    };
  }

  if (props.position === Position.Top) {
    return {
      enterFrom: '-translate-y-full',
      enterTo: '-translate-y-0',
      leaveFrom: '-translate-y-0',
      leaveTo: '-translate-y-full'
    };
  }

  if (props.position === Position.Bottom) {
    return {
      enterFrom: 'translate-y-full',
      enterTo: 'translate-y-0',
      leaveFrom: 'translate-y-0',
      leaveTo: 'translate-y-full'
    };
  }

  return {
    enterFrom: '',
    enterTo: '',
    leaveFrom: '',
    leaveTo: ''
  };
});

const onAfterLeave = () => {
  document.querySelector('body')!.className = '';
  emit('closed');
};

const close = () => {
  if (props.closeOnBackground) {
    model.value = false;
  }
};

onMounted(() => {
  document.querySelector('body')!.className = 'overflow-hidden';
});
</script>

<template>
  <teleport to="body">
    <div class="app-slide-over" aria-labelledby="slide-over-bottom" role="dialog" aria-modal="true">
      <div class="absolute inset-0 overflow-hidden">
        <transition
          enter-active-class="transform transition ease-out duration-700"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transform transition ease-in duration-700"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          @after-leave="onAfterLeave"
        >
          <div
            v-show="model"
            class="app-slide-over__background"
            aria-hidden="true"
            @click="close()"
          ></div>
        </transition>
        <div :class="['app-slide-over__wrapper', `app-slide-over__wrapper--${props.position}`]">
          <transition
            enter-active-class="transform transition ease-in-out duration-500"
            :enter-from-class="transition.enterFrom"
            :enter-to-class="transition.enterTo"
            leave-active-class="transform transition ease-in-out duration-500"
            :leave-from-class="transition.leaveFrom"
            :leave-to-class="transition.leaveTo"
          >
            <div
              v-show="model"
              class="slide-over"
              :class="[
                { 'max-w-xs': props.size === Breakpoint.xxs && isHorizontal },
                { 'max-w-sm': props.size === Breakpoint.xs && isHorizontal },
                { 'max-w-md': props.size === Breakpoint.sm && isHorizontal },
                { 'max-w-lg': props.size === Breakpoint.md && isHorizontal },
                { 'max-w-4xl': props.size === Breakpoint.lg && isHorizontal },
                { 'max-w-6xl': props.size === Breakpoint.xl && isHorizontal }
              ]"
            >
              <div class="panel">
                <div class="px-4 sm:px-6">
                  <slot />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.app-slide-over {
  @apply fixed inset-0 overflow-hidden z-50;

  &__background {
    @apply absolute inset-0 bg-black/75 transition-opacity;
  }

  &__wrapper {
    @apply pointer-events-none fixed flex;

    .slide-over {
      @apply pointer-events-auto w-screen;

      .panel {
        @apply flex h-full flex-col overflow-y-scroll bg-white shadow-xl;
      }
    }

    &--top {
      @apply max-h-full;
      @apply top-0 pb-10;

      .panel {
        @apply rounded-b-2xl py-5;
      }
    }

    &--right {
      @apply max-w-full h-full;
      @apply right-0;

      .panel {
        @apply rounded-l-2xl pt-6 pb-4;
      }
    }

    &--bottom {
      @apply max-h-full;
      @apply bottom-0 pt-10;

      .panel {
        @apply rounded-t-2xl py-5;
      }
    }

    &--left {
      @apply max-w-full h-full;
      @apply left-0 pr-10;

      .panel {
        @apply rounded-r-2xl pt-6 pb-4;
      }
    }
  }
}
</style>
