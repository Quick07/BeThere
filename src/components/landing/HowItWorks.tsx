/**
 * HOW IT WORKS SECTION
 * ============================================================================
 * UX PLACEMENT: After Value Props - shows the process AFTER explaining benefits
 * 
 * COGNITIVE PRINCIPLE: 3-step process is optimal for comprehension
 * - Numbered steps create clear sequence
 * - Horizontal flow on desktop mimics progress/journey
 * - Connectors guide eye between steps
 * 
 * PREVIOUS ISSUE: 3 full-screen sections created scroll fatigue
 * SOLUTION: Condensed into one scannable section with visual flow
 * 
 * F-PATTERN: Horizontal scan across all 3 steps
 * - Numbers act as visual anchors on vertical scan
 * 
 * MOBILE: Vertical timeline format
 * - Each step fits comfortably in viewport
 * - Natural thumb scrolling
 * ============================================================================
 */

const steps = [
  {
    number: "01",
    title: "Share your day",
    description: "Add activities to your timeline. Going to the gym? Grabbing lunch? Let your friends know.",
    // Visual accent color for variety
    accent: "primary",
  },
  {
    number: "02", 
    title: "See what's happening",
    description: "Your friends' schedules update in real-time. No asking, no waiting, just look.",
    accent: "accent",
  },
  {
    number: "03",
    title: "Tap to join",
    description: "See something you want to do? One tap and you're in. They get notified. Done.",
    accent: "primary",
  },
];

export function HowItWorks() {
  return (
    <section
      className="w-full bg-surface-950 py-16 sm:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="layout-container">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary-400 text-sm font-medium tracking-wide uppercase mb-4">
            How it works
          </p>
          <h2 
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-surface-50 tracking-tight"
          >
            Three steps to more hangouts
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {steps.map(({ number, title, description, accent }, index) => (
              <div 
                key={number}
                className="relative group"
              >
                {/* 
                  Step card
                  - Glass effect creates depth
                  - Hover state adds interactivity cue
                */}
                <div className="relative bg-surface-900/50 border border-surface-800 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-surface-700 hover:bg-surface-900/80">
                  <div className={`
                    text-5xl sm:text-6xl font-bold mb-4
                    ${accent === 'primary' 
                      ? 'bg-gradient-to-br from-primary-400 to-primary-600' 
                      : 'bg-gradient-to-br from-accent-400 to-accent-600'
                    }
                    bg-clip-text text-transparent
                  `}>
                    {number}
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-semibold text-surface-50 mb-3">
                    {title}
                  </h3>
                  <p className="text-surface-400 leading-relaxed">
                    {description}
                  </p>
                </div>
                
                {/* 
                  Mobile connector (between steps)
                  - Vertical line on mobile creates timeline feel
                */}
                {index < steps.length - 1 && (
                  <div className="md:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-surface-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 
          Section CTA
          - Secondary placement (not as prominent as Hero CTA)
          - Captures users ready to act after understanding the process
        */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-surface-500 mb-4">
            Ready to simplify your social life?
          </p>
          <a 
            href="/signup"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 font-medium transition-colors group"
          >
            Get started free
            <svg 
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
