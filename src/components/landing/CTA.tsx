/**
 * FINAL CTA SECTION
 * ============================================================================
 * UX PLACEMENT: Last section before footer - conversion point
 * 
 * COGNITIVE PRINCIPLE: Decision point after full information gathering
 * - User has seen: value prop, how it works, features, social proof
 * - Now ready to make a decision
 * - Strong visual treatment captures scrollers who skimmed
 * 
 * ATTENTION STRATEGY:
 * - Gradient background creates visual break from previous sections
 * - Large CTA button is unmissable
 * - Trust elements (free, no CC) reduce friction
 * - Urgency cue (waitlist, early access) motivates action
 * 
 * VISUAL HIERARCHY:
 * 1. Headline - emotional appeal
 * 2. CTA button - action
 * 3. Supporting text - friction reduction
 * ============================================================================
 */

import Link from "next/link";

export function CTA() {
  return (
    <section
      className="relative w-full overflow-hidden py-20 sm:py-28"
      aria-labelledby="cta-heading"
    >
      <div className="absolute inset-0 cta-section-gradient" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
      <div className="layout-container relative z-10 text-center">
        <h2 
          id="cta-heading"
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-surface-50 tracking-tight leading-tight"
        >
          Ready to stop texting
          <br />
          <span className="bg-gradient-to-r from-primary-300 to-accent-400 bg-clip-text text-transparent">
            and start showing up?
          </span>
        </h2>
        
        <p className="mt-6 text-lg sm:text-xl text-surface-300 max-w-xl mx-auto">
          Join the waitlist and be first on your campus.
          <br className="hidden sm:block" />
          <span className="text-surface-400">Your friends are waiting.</span>
        </p>
        
        <div className="mt-10 sm:mt-12">
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center h-14 sm:h-16 px-10 sm:px-12 text-lg sm:text-xl font-medium text-white bg-primary-500 hover:bg-primary-400 rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98]"
          >
            Get Early Access
            <svg 
              className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-surface-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0 text-status-study" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free for students</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0 text-status-study" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0 text-status-study" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Takes 30 seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
