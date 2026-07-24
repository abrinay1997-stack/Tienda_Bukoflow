import { useEffect, useState } from 'react';

/**
 * Regla del ADN §8.3: escenas 3D solo si el ancho ≥1024px, deviceMemory ≥4
 * (cuando el navegador lo expone) y el usuario no pidió prefers-reduced-motion.
 * navigator.deviceMemory es Chrome-only; su ausencia no bloquea la escena.
 */
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wideEnough = window.innerWidth >= 1024;
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    const memoryOk = deviceMemory === undefined || deviceMemory >= 4;

    setCanRender(!reduceMotion && wideEnough && memoryOk);
  }, []);

  return canRender;
}
