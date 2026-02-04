/**
 * FEATURES SECTION
 * ============================================================================
 * UX PLACEMENT: After How It Works - detailed feature breakdown
 * 
 * COGNITIVE PRINCIPLE: Feature fatigue is real
 * - 4-6 features is optimal (avoid overwhelming)
 * - Icons provide visual anchors for rapid scanning
 * - Grid layout enables F-pattern scanning
 * 
 * VISUAL HIERARCHY:
 * - Icons are visual entry points
 * - Titles are bold for scanning
 * - Descriptions are secondary (read if interested)
 * 
 * SCANNING BEHAVIOR:
 * - Users scan icons/titles first
 * - Only read descriptions if title catches interest
 * - Bold keywords in descriptions for deep scanners
 * ============================================================================
 */

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Live statuses",
    description: "Real-time updates the moment plans change",
    color: "text-status-gym",
    bgColor: "bg-status-gym/10",
    borderColor: "border-status-gym/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    title: "Day timeline",
    description: "Visual 24-hour view that's intuitive to read",
    color: "text-status-study",
    bgColor: "bg-status-study/10",
    borderColor: "border-status-study/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
    title: "One-tap join",
    description: "No messages needed—just tap and show up",
    color: "text-primary-400",
    bgColor: "bg-primary-500/10",
    borderColor: "border-primary-500/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Privacy controls",
    description: "You decide who sees what, always",
    color: "text-status-bored",
    bgColor: "bg-status-bored/10",
    borderColor: "border-status-bored/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: "Smart notifications",
    description: "Know when friends join your plans",
    color: "text-status-food",
    bgColor: "bg-status-food/10",
    borderColor: "border-status-food/30",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Friend groups",
    description: "Organize by squad, class, or vibe",
    color: "text-status-beach",
    bgColor: "bg-status-beach/10",
    borderColor: "border-status-beach/30",
  },
];

export function Features() {
  return (
    <section
      className="w-full py-16 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div className="layout-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="features-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-semibold text-surface-50 tracking-tight"
          >
            Everything you need.
          </h2>
          <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-surface-500 tracking-tight mt-1">
            Nothing you don&apos;t.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, description, color, bgColor, borderColor }) => (
            <div 
              key={title}
              className="group relative p-6 rounded-2xl border border-surface-800 bg-surface-900/30 transition-all duration-300 hover:bg-surface-900/50 hover:border-surface-700"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${bgColor} ${color} border ${borderColor} transition-transform duration-300 group-hover:scale-110`}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-surface-50 mb-2">
                {title}
              </h3>
              <p className="text-surface-400 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
