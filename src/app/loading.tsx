/**
 * App-router route-segment loading state.
 *
 * The intro loader in `providers/intro-loader.tsx` handles the first-paint
 * cinematic boot. This file covers route-transition loading (kept minimal
 * and quiet so it doesn't fight with the intro).
 */
export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[120] h-[2px] overflow-hidden bg-transparent">
      <div className="absolute inset-y-0 left-0 w-1/3 animate-[shimmer_1.1s_var(--ease-quart)_infinite] bg-[var(--color-iris-500)]" />
    </div>
  );
}
