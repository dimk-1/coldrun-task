import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';

import { BreakpointValue, DeviceTypeBreakpoint } from '@/common/constants/components';

export const useMediaQuery = () => {
  const { width } = useWindowSize();

  // Device type breakpoints
  const isMobile = computed(() => width.value < DeviceTypeBreakpoint.Tablet);
  const isTablet = computed(
    () => width.value >= DeviceTypeBreakpoint.Tablet && width.value < DeviceTypeBreakpoint.Desktop
  );
  const isDesktop = computed(() => width.value >= DeviceTypeBreakpoint.Desktop);

  // Device screen breakpoints

  const screenSM = computed(() => width.value > BreakpointValue.sm);
  const screenMD = computed(() => width.value > BreakpointValue.md);
  const screenLG = computed(() => width.value > BreakpointValue.lg);
  const screenXL = computed(() => width.value > BreakpointValue.xl);
  const screenXXL = computed(() => width.value > BreakpointValue.xxl);

  return { isMobile, isTablet, isDesktop, screenSM, screenMD, screenLG, screenXL, screenXXL };
};
