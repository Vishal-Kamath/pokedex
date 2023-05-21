import { useEffect, useLayoutEffect } from 'react';
// copied from tailwind.com
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
