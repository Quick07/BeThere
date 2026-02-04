import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-surface-800/50 py-8">
      <div className="layout-container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-surface-600">
          © {new Date().getFullYear()} BeThere
        </p>
        <nav className="flex items-center gap-6" aria-label="Footer navigation">
          <Link href="/app" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">
            Demo
          </Link>
          <Link href="/login" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">
            Sign In
          </Link>
          <Link href="/signup" className="text-sm text-surface-500 hover:text-surface-300 transition-colors">
            Get Started
          </Link>
        </nav>
      </div>
    </footer>
  );
}
