/**
 * Runtime guard: clamp negative counts in String.repeat to prevent RangeError: Invalid count value.
 * Loaded once via app/layout.tsx.
 */
(() => {
  const orig = (String.prototype as any).repeat as any;
  if (!orig || (orig as any).__clampPatched) return;
  const patched: any = function (this: string, count: any) {
    const n = Number(count);
    const safe = Number.isFinite(n) && !Number.isNaN(n) ? Math.max(0, Math.floor(n)) : 0;
    return orig.call(this, safe);
  };
  patched.__clampPatched = true;
  (String.prototype as any).repeat = patched;
})();