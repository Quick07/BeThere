/**
 * VALUE PROPOSITIONS SECTION
 * ============================================================================
 * UX PLACEMENT: After Trust Bar - explains WHAT the app does
 * 
 * COGNITIVE PRINCIPLE: "What's in it for me?" answered in 3 seconds
 * - 3 props = magic number for memory (Miller's Law)
 * - Icons provide visual anchors for scanning
 * - Bold keywords enable rapid content extraction
 * 
 * F-PATTERN ALIGNMENT:
 * - Desktop: 3 columns allow horizontal scanning
 * - Icons at top of each column catch the eye on vertical scan
 * 
 * MOBILE: Single column, thumb-scrollable
 * - Each prop fits above the fold on most phones
 * ============================================================================
 */

const valueProps = [
  {
    // Icon: Calendar/visibility concept
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Always know what's happening",
    description: "See your friends' plans in real-time. No more endless group chats asking \"wyd?\"",
    // Bold keywords for scanning
    keywords: ["real-time", "group chats"],
  },
  {
    // Icon: Lightning/speed concept
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Join in one tap",
    description: "No messages. No planning. See something you like? Tap to join. That's it.",
    keywords: ["one tap", "No messages"],
  },
  {
    // Icon: Shield/privacy concept
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "You control who sees what",
    description: "Share with close friends or your whole squad. Privacy settings you actually understand.",
    keywords: ["close friends", "Privacy"],
  },
];

export function ValueProps() {
  return (
    <section
      className="w-full py-16 sm:py-24"
      aria-labelledby="value-props-heading"
    >
      <div className="layout-container">
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            id="value-props-heading"
            className="text-3xl sm:text-4xl font-semibold text-surface-50 tracking-tight"
          >
            Coordination, simplified
          </h2>
          <p className="mt-4 text-lg text-surface-500 max-w-2xl mx-auto">
            Everything you need to hang out more and text less
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {valueProps.map(({ icon, title, description, keywords }) => (
            <div 
              key={title}
              className="group text-center md:text-left"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-800/50 border border-surface-700/50 text-primary-400 mb-5 transition-all duration-300 group-hover:border-primary-500/50 group-hover:bg-primary-500/10">
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-surface-50 mb-3">
                {title}
              </h3>
              
              {/* 
                Description with keyword highlighting
                - Muted color for body text
                - Keywords bolded for rapid scanning
                - Short sentences reduce cognitive load
              */}
              <p className="text-surface-400 leading-relaxed">
                {description.split(' ').map((word, i) => {
                  const isKeyword = keywords.some(k => 
                    word.toLowerCase().includes(k.toLowerCase().replace(/['"]/g, ''))
                  );
                  return isKeyword ? (
                    <span key={i} className="text-surface-200 font-medium">{word} </span>
                  ) : (
                    <span key={i}>{word} </span>
                  );
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
