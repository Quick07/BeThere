/**
 * TRUST BAR SECTION
 * ============================================================================
 * UX PLACEMENT: Immediately after Hero - builds credibility before deep dive
 * 
 * COGNITIVE PRINCIPLE: Users need trust signals early in the journey
 * - Reduces skepticism before presenting features
 * - Social proof (numbers, schools) creates FOMO
 * - Brief = low cognitive load, easy to scan
 * 
 * VISUAL HIERARCHY: Secondary level - smaller text, muted colors
 * - Should not compete with Hero or Features
 * - Quick scan, then move on
 * 
 * F-PATTERN: This is the second horizontal "scan line"
 * - Users skim this area looking for validation
 * ============================================================================
 */

export function TrustBar() {
  return (
    <section
      className="w-full border-y border-surface-800/50 bg-surface-950/50 py-10 sm:py-12"
      aria-label="Trust indicators"
    >
      <div className="layout-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold text-surface-50 tabular-nums">
              2,500+
            </p>
            <p className="text-sm text-surface-500">
              Students on waitlist
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold text-surface-50 tabular-nums">
              50+
            </p>
            <p className="text-sm text-surface-500">
              Universities
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold text-surface-50 tabular-nums">
              10K+
            </p>
            <p className="text-sm text-surface-500">
              Hangouts coordinated
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-semibold text-primary-400 tabular-nums">
              0
            </p>
            <p className="text-sm text-surface-500">
              &ldquo;wyd?&rdquo; texts needed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
