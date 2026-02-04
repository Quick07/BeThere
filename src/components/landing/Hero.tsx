/**
 * HERO SECTION
 * ============================================================================
 * UX PLACEMENT: First section - immediate attention capture
 * 
 * VISUAL HIERARCHY:
 * 1. Headline (largest text) - F-pattern top horizontal bar
 * 2. Subheadline - Explains value proposition
 * 3. CTA buttons - At natural eye rest point after reading headline
 * 4. App preview - Visual anchor that demonstrates the product
 * 
 * READING PATTERN: Z-pattern on desktop (logo → nav → headline → CTA → preview)
 * MOBILE: Single column, stacked vertically for thumb-friendly scrolling
 * 
 * COGNITIVE LOAD: Minimal - one clear message, one clear action
 * WHITESPACE: Generous padding to let headline breathe
 * ============================================================================
 */

import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100dvh] min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="layout-container relative z-10 w-full">
        <div className="grid w-full grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center lg:justify-items-stretch">
          <div className="w-full max-w-xl mx-auto text-center lg:mx-0 lg:max-w-none lg:text-left">
            {/* Eyebrow text - small, draws attention down to headline */}
            <p className="text-primary-400 text-sm font-medium tracking-wide uppercase mb-4 animate-fade-in-up">
              Social coordination for students
            </p>
            
            {/* 
              PRIMARY HEADLINE
              - Largest text on page (visual hierarchy level 1)
              - Short, punchy, emotionally resonant
              - Two-line structure creates rhythm
            */}
            <h1
              id="hero-heading"
              className="text-[2.5rem] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-surface-50 tracking-tight leading-[0.95] animate-fade-in-up"
            >
              Stop texting.
            </h1>
            <h1 className="text-[2.5rem] min-[400px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[0.95] mt-2 animate-fade-in-up animation-delay-100">
              <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-accent-400 bg-clip-text text-transparent">
                Start showing up.
              </span>
            </h1>

            {/* 
              SUBHEADLINE
              - Explains the value prop in plain language
              - Bold keywords for scanning: "friends", "Join", "one tap"
              - Constrained width for optimal line length (50-75 chars)
            */}
            <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg lg:text-xl text-surface-400 font-light max-w-md mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-200">
              See what your <span className="text-surface-200 font-medium">friends</span> are doing. 
              <span className="text-surface-200 font-medium"> Join</span> in{" "}
              <span className="text-surface-200 font-medium">one tap</span>.
            </p>

            {/* 
              CTA BUTTONS
              - Primary: High contrast, action-oriented verb
              - Secondary: Lower commitment option (demo)
              - Stacked on mobile, side-by-side on desktop
              - Positioned at natural eye rest point
            */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-300">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center min-h-[48px] h-14 px-6 sm:px-8 text-base sm:text-lg font-medium text-white bg-primary-500 hover:bg-primary-400 rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] touch-manipulation"
              >
                Get Early Access
                {/* Arrow indicates forward momentum */}
                <svg 
                  className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/app"
                className="inline-flex items-center justify-center min-h-[48px] h-14 px-6 sm:px-8 text-base sm:text-lg font-medium text-surface-300 hover:text-surface-50 border border-surface-700 hover:border-surface-500 rounded-full transition-all duration-200 touch-manipulation"
              >
                Try the Demo
              </Link>
            </div>

            {/* 
              MICRO-TRUST ELEMENT
              - Reassurance text below CTA
              - Reduces friction/anxiety
            */}
            <p className="mt-6 text-sm text-surface-600 animate-fade-in-up animation-delay-400">
              Free for students • No credit card required
            </p>
          </div>

          {/* 
            RIGHT COLUMN: App Preview
            - Visual demonstration of the product
            - Draws eye from left to right (Z-pattern)
            - Phone mockup creates familiar context
          */}
          <div className="relative flex w-full justify-center lg:justify-end animate-fade-in-up animation-delay-300 lg:animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-3xl scale-150 opacity-50 pointer-events-none" />
            <div className="relative w-[260px] sm:w-[300px] lg:w-[340px]">
              {/* Phone frame */}
              <div className="relative bg-surface-900 rounded-[3rem] p-3 shadow-2xl border border-surface-800">
                {/* Screen */}
                <div className="relative bg-surface-950 rounded-[2.25rem] overflow-hidden aspect-[9/19.5]">
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-surface-900/50 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-24 h-6 bg-surface-800 rounded-full" />
                  </div>
                  
                  {/* App content preview - simplified timeline view */}
                  <div className="absolute inset-0 pt-14 px-4 pb-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-surface-50 font-semibold text-sm">Today</div>
                      <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/40" />
                    </div>
                    
                    {/* Timeline blocks - visual representation */}
                    <div className="space-y-2">
                      {/* Activity 1 */}
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-surface-500 w-10">9am</div>
                        <div className="flex-1 h-12 rounded-lg bg-status-study/20 border border-status-study/40 flex items-center px-3">
                          <span className="text-xs text-surface-200">📚 Study Session</span>
                        </div>
                      </div>
                      {/* Activity 2 */}
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-surface-500 w-10">12pm</div>
                        <div className="flex-1 h-12 rounded-lg bg-status-food/20 border border-status-food/40 flex items-center px-3">
                          <span className="text-xs text-surface-200">🍕 Lunch @ Union</span>
                        </div>
                      </div>
                      {/* Activity 3 - with join indicator */}
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-surface-500 w-10">4pm</div>
                        <div className="flex-1 h-12 rounded-lg bg-status-gym/20 border border-status-gym/40 flex items-center justify-between px-3">
                          <span className="text-xs text-surface-200">💪 Gym</span>
                          <span className="text-[10px] text-primary-400 font-medium">+2 joined</span>
                        </div>
                      </div>
                      {/* Activity 4 */}
                      <div className="flex items-center gap-3">
                        <div className="text-xs text-surface-500 w-10">8pm</div>
                        <div className="flex-1 h-12 rounded-lg bg-status-movie/20 border border-status-movie/40 flex items-center px-3">
                          <span className="text-xs text-surface-200">🎬 Movie Night</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Join button overlay */}
                    <div className="absolute bottom-6 left-4 right-4">
                      <div className="bg-primary-500 text-white text-center py-3 rounded-full text-sm font-medium shadow-lg animate-pulse-glow">
                        Tap to Join
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating notification - desktop only; avoids clutter on small screens */}
              <div className="absolute -right-2 sm:-right-4 top-1/4 bg-surface-800/90 backdrop-blur-sm border border-surface-700 rounded-2xl p-2 sm:p-3 shadow-xl animate-fade-in-up animation-delay-500 hidden min-[400px]:block">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
                  <div>
                    <p className="text-xs text-surface-50 font-medium">Sarah joined</p>
                    <p className="text-[10px] text-surface-500">Gym @ 4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile (scroll is obvious); visible on tablet+ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-surface-700 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-surface-500 rounded-full" />
        </div>
      </div>
    </section>
  );
}
