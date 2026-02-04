/**
 * LANDING PAGE - OPTIMIZED FOR HUMAN ATTENTION & READABILITY
 * ============================================================================
 * 
 * SECTION ORDER (based on UX research and cognitive science):
 * 
 * 1. HERO
 *    - F-pattern: Top horizontal bar captures attention
 *    - Z-pattern: Logo → Nav → Headline → CTA → Visual
 *    - Purpose: Immediate value proposition + primary action
 * 
 * 2. TRUST BAR
 *    - F-pattern: Second horizontal scan line
 *    - Purpose: Quick credibility before diving deeper
 *    - Low cognitive load: numbers are easy to scan
 * 
 * 3. VALUE PROPS
 *    - F-pattern: Icons create vertical anchors, titles enable horizontal scan
 *    - Purpose: "What's in it for me?" answered in 3 seconds
 *    - Rule of 3: Optimal for memory retention
 * 
 * 4. HOW IT WORKS
 *    - Sequential flow: Numbered steps guide the eye
 *    - Purpose: Explain the process after establishing value
 *    - Condensed: One section vs. three full screens
 * 
 * 5. FEATURES
 *    - Grid layout: Enables scanning without overwhelming
 *    - Icons: Visual anchors for rapid content extraction
 *    - Purpose: Detailed capabilities for interested users
 * 
 * 6. SOCIAL PROOF
 *    - Testimonials: Peer validation reduces anxiety
 *    - University names: Institutional credibility
 *    - Purpose: Address "does this actually work?" question
 * 
 * 7. FINAL CTA
 *    - Visual break: Gradient background signals importance
 *    - Large CTA: Captures scrollers who skimmed
 *    - Trust elements: Friction reduction (free, no CC)
 * 
 * DESIGN PRINCIPLES APPLIED:
 * - F-pattern reading flow (desktop)
 * - Single-column vertical flow (mobile)
 * - Visual hierarchy: Headline → Subhead → Content → CTA
 * - Strategic whitespace between sections
 * - CTAs at natural attention peaks
 * - Digestible chunks with clear section boundaries
 * 
 * ============================================================================
 */

import {
  LandingHeader,
  Hero,
  TrustBar,
  ValueProps,
  HowItWorks,
  Features,
  SocialProof,
  CTA,
  LandingFooter,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full min-w-0">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <LandingHeader />
      <main id="main-content" className="w-full min-w-0 scroll-mt-16" role="main">
        {/* 
          SECTION 1: HERO
          First impression - captures attention and communicates value
          Full viewport height creates focused entry point
        */}
        <Hero />
        
        {/* 
          SECTION 2: TRUST BAR
          Early social proof - builds credibility before feature dive
          Small section = low commitment to scan
        */}
        <TrustBar />
        
        {/* 
          SECTION 3: VALUE PROPOSITIONS
          Core benefits with icons for scannable reading
          Answers "why should I care?" question
        */}
        <ValueProps />
        
        {/* 
          SECTION 4: HOW IT WORKS
          Process explanation - now condensed into one scannable section
          Numbered steps create clear progression
        */}
        <HowItWorks />
        
        {/* 
          SECTION 5: FEATURES
          Detailed capabilities with visual anchors
          Grid layout enables F-pattern scanning
        */}
        <Features />
        
        {/* 
          SECTION 6: SOCIAL PROOF
          Testimonials from relatable peers
          Validates claims with real voices
        */}
        <SocialProof />
        
        {/* 
          SECTION 7: FINAL CTA
          Conversion point after full information gathering
          Gradient treatment creates visual emphasis
        */}
        <CTA />
      </main>
      
      {/* Footer with secondary navigation */}
      <LandingFooter />
    </div>
  );
}
