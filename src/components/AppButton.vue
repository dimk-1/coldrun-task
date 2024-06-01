<script setup lang="ts">
import { useSlots } from 'vue';
import { Severity, Size } from '@/common/constants/components';

import AppLoader from '@/components/AppLoader.vue';

import type { PropType } from 'vue';

const emit = defineEmits(['click']);

const props = defineProps({
  ariaLabel: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  severity: {
    type: String as PropType<Severity>,
    default: Severity.primary
  },
  size: {
    type: String as PropType<Size>,
    default: Size.sm
  },
  // Modifiers
  isDisabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isOutlined: {
    type: Boolean,
    default: false
  }
});

const slots = useSlots();

const performAction = () => {
  if (!props.isDisabled && !props.isLoading) {
    emit('click');
  }
};
</script>

<template>
  <button
    class="app-button"
    @click="performAction"
    :class="[
      `app-button__size--${props.size}`,
      `app-button__severity--${props.severity}`,
      {
        'app-button--disabled': props.isDisabled,
        'app-button--loading': props.isLoading,
        'app-button--outlined': props.isOutlined
      }
    ]"
  >
    <div v-if="isLoading" role="status" class="app-button__loader">
      <AppLoader
        :class="{
          'size-4': [Size.xs, Size.sm].includes(props.size),
          'size-5': props.size === Size.md,
          'size-6': [Size.lg, Size.xl].includes(props.size)
        }"
      />
    </div>

    <div class="app-button__content">
      <div class="flex gap-2">
        <div v-if="slots['left-icon']">
          <slot name="left-icon" />
        </div>
        <div>
          <slot />
        </div>
        <div v-if="slots['right-icon']">
          <slot name="right-icon" />
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.app-button {
  @apply rounded-[8px] flex items-center;
  @apply transition-colors duration-200;

  &__severity {
    &--primary {
      @apply bg-primary-700 text-white;
      @apply hover:bg-primary-800;
      @apply focus:outline-none focus:ring-[3px] focus:ring-primary-200 focus:bg-primary-800;
      @apply active:ring-[3px] active:ring-primary-200 active:bg-primary-800;

      &.app-button--disabled {
        @apply hover:bg-primary-700;
        @apply focus:bg-primary-700;
        @apply active:bg-primary-700;
      }

      &.app-button--outlined {
        @apply bg-white text-primary-700 border-[1px] border-primary-700;
        @apply hover:bg-primary-800 hover:text-white;
        @apply focus:bg-primary-800 focus:text-white;
        @apply active:bg-primary-800 active:text-white;

        &.app-button--disabled {
          @apply hover:text-primary-700;
          @apply focus:text-primary-700;
          @apply active:text-primary-700;
        }
      }

      .loader {
        @apply fill-primary-800;
      }
    }

    &--secondary {
      @apply bg-secondary-200 text-secondary-800;
      @apply hover:bg-secondary-300;
      @apply focus:outline-none focus:ring-[3px] focus:ring-secondary-200 focus:bg-secondary-300;
      @apply active:ring-[3px] active:ring-secondary-200 active:bg-secondary-300;

      &.app-button--disabled {
        @apply hover:bg-secondary-200;
        @apply focus:bg-secondary-200;
        @apply active:bg-secondary-200;
      }

      &.app-button--outlined {
        @apply bg-white text-secondary-800 border-[1px] border-secondary-200;
        @apply hover:bg-secondary-300 hover:text-secondary-800;
        @apply focus:bg-secondary-300 focus:text-secondary-800;
        @apply active:bg-secondary-300 active:text-secondary-800;

        &.app-button--disabled {
          @apply hover:text-secondary-800;
          @apply focus:text-secondary-800;
          @apply active:text-secondary-800;
        }
      }

      .loader {
        @apply fill-secondary-800;
      }
    }

    &--danger {
      @apply bg-danger-600 text-white;
      @apply hover:bg-danger-700;
      @apply focus:outline-none focus:ring-[3px] focus:ring-danger-200 focus:bg-danger-700;
      @apply active:ring-[3px] active:ring-danger-200 active:bg-danger-700;

      &.app-button--disabled {
        @apply hover:bg-danger-600;
        @apply focus:bg-danger-600;
        @apply active:bg-danger-600;
      }

      &.app-button--outlined {
        @apply bg-white text-danger-600 border-[1px] border-danger-600;
        @apply hover:bg-danger-700 hover:text-white;
        @apply focus:bg-danger-700 focus:text-white;
        @apply active:bg-danger-700 active:text-white;

        &.app-button--disabled {
          @apply hover:text-danger-600;
          @apply focus:text-danger-600;
          @apply active:text-danger-600;
          @apply opacity-40;
        }
      }

      .loader {
        @apply fill-danger-700;
      }
    }
  }

  &__size {
    &--xs {
      @apply px-[12px] py-[8px];
      @apply text-[12px] leading-[18px];

      .loader {
        @apply size-[16px];
      }
    }

    &--sm {
      @apply px-[12px] py-[8px];
      @apply text-[14px] leading-[21px];

      .loader {
        @apply size-[16px];
      }
    }

    &--md {
      @apply px-[20px] py-[10px];
      @apply text-[14px] leading-[21px];

      .loader {
        @apply size-[20px];
      }
    }

    &--lg {
      @apply px-[20px] py-[12px];
      @apply text-[16px] leading-[24px];

      .loader {
        @apply size-[24px];
      }
    }

    &--xl {
      @apply px-[26px] py-[14px];
      @apply text-[16px] leading-[24px];

      .loader {
        @apply size-[24px];
      }
    }
  }

  &--loading {
    @apply cursor-default;

    .app-button__content {
      @apply opacity-50 cursor-default;
    }
  }

  &--disabled {
    @apply opacity-40 cursor-not-allowed;

    &.app-button--outlined {
      @apply bg-white;
      @apply hover:bg-white;
      @apply focus:bg-white;
      @apply active:bg-white;
    }
  }

  &__loader {
    @apply mr-[8px];
  }
}
</style>
