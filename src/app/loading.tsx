/**
 * Skeleton mirroring the hero layout, so the page settles into place instead
 * of swapping a spinner for a full screen of content.
 *
 * Pure CSS (see the `.skeleton` shimmer in globals.css) — no animation library
 * is pulled in for the loading state.
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center pt-28 pb-20 lg:pt-32"
      role="status"
      aria-label="Loading"
    >
      <div className="section-container w-full">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
          <div>
            <div className="skeleton h-3 w-48 rounded-full" />

            <div className="mt-8 space-y-4">
              <div className="skeleton h-12 lg:h-16 w-full rounded-lg" />
              <div className="skeleton h-12 lg:h-16 w-11/12 rounded-lg" />
              <div className="skeleton h-12 lg:h-16 w-3/4 rounded-lg" />
            </div>

            <div className="mt-8 space-y-3">
              <div className="skeleton h-4 w-full rounded-full" />
              <div className="skeleton h-4 w-5/6 rounded-full" />
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="skeleton h-14 w-full sm:w-56 rounded-full" />
              <div className="skeleton h-14 w-full sm:w-40 rounded-full" />
            </div>

            <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3">
              <div className="skeleton h-3 w-40 rounded-full" />
              <div className="skeleton h-3 w-44 rounded-full" />
              <div className="skeleton h-3 w-48 rounded-full" />
            </div>
          </div>

          <div className="skeleton aspect-[4/5] w-full max-w-md lg:max-w-none mx-auto rounded-2xl" />
        </div>
      </div>

      <span className="sr-only">Loading the studio&apos;s work…</span>
    </div>
  )
}
