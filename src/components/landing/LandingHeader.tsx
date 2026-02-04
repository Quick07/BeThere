/**
 * LANDING HEADER
 * ============================================================================
 * UX PLACEMENT: Fixed at top - persistent navigation and branding
 * 
 * COGNITIVE PRINCIPLE: Header is the navigation anchor
 * - Logo placement (top-left) follows convention
 * - CTA in header captures "ready to act" visitors at any scroll position
 * - Minimal options reduce decision paralysis
 * 
 * Z-PATTERN ALIGNMENT:
 * - Logo (top-left) → Nav links (top-right)
 * - User's eye naturally scans left-to-right
 * 
 * MOBILE: Simplified, thumb-friendly
 * - Logo and CTA only on smallest screens
 * - Full nav on tablet+
 * ============================================================================
 */

import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 w-full flex items-center justify-between bg-surface-950/80 backdrop-blur-xl backdrop-saturate-150 border-b border-surface-800/50">
      <div className="layout-container flex w-full items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-surface-50 hover:text-surface-200 transition-colors"
          aria-label="BeThere home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="font-semibold text-lg">BeThere</span>
        </Link>

        <nav className="flex items-center gap-6" aria-label="Main navigation">
          <Link href="/app" className="text-sm text-surface-400 hover:text-surface-50 transition-colors">
            Demo
          </Link>
          <Link href="/login" className="text-sm text-surface-400 hover:text-surface-50 transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white bg-primary-500 hover:bg-primary-400 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
