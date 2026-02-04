/**
 * SOCIAL PROOF SECTION
 * ============================================================================
 * UX PLACEMENT: After Features - validates claims with peer voices
 * 
 * COGNITIVE PRINCIPLE: Social proof reduces decision anxiety
 * - Peer testimonials > company claims
 * - Relatable personas (college students) increase trust
 * - Specific details ("47 messages") are more believable than vague praise
 * 
 * VISUAL HIERARCHY:
 * - Large quote text is the focal point
 * - Attribution is secondary (supports credibility)
 * - Carousel/cards provide visual variety
 * 
 * SCANNING BEHAVIOR:
 * - Users read 1-2 testimonials, scan the rest
 * - First testimonial should be strongest
 * ============================================================================
 */

const testimonials = [
  {
    // Strongest testimonial first - specific, relatable pain point
    quote: "47 messages to plan dinner. Now we just show up.",
    name: "Jordan",
    school: "Stanford '26",
    avatar: "J",
    avatarBg: "from-primary-400 to-primary-600",
  },
  {
    quote: "I see when my roommates are free. No more awkward asking.",
    name: "Sam",
    school: "UCLA '27",
    avatar: "S",
    avatarBg: "from-accent-400 to-accent-600",
  },
  {
    quote: "Low-key, no pressure. My whole friend group actually uses it.",
    name: "Alex",
    school: "NYU '25",
    avatar: "A",
    avatarBg: "from-status-beach to-status-study",
  },
];

export function SocialProof() {
  return (
    <section
      className="w-full bg-surface-950 py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="layout-container">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-primary-400 text-sm font-medium tracking-wide uppercase mb-4">
            Loved by students
          </p>
          <h2 
            id="testimonials-heading"
            className="text-3xl sm:text-4xl font-semibold text-surface-50 tracking-tight"
          >
            Real students. Real hangouts.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, school, avatar, avatarBg }) => (
            <div 
              key={name}
              className="relative p-6 sm:p-8 rounded-2xl border border-surface-800 bg-surface-900/30 transition-all duration-300 hover:bg-surface-900/50 hover:border-surface-700"
            >
              <div className="text-surface-700 mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              {/* 
                Quote text
                - Larger font for emphasis
                - High contrast for readability
              */}
              <blockquote className="text-xl sm:text-2xl font-medium text-surface-100 leading-snug mb-6">
                &ldquo;{quote}&rdquo;
              </blockquote>
              
              {/* 
                Attribution
                - Avatar adds visual interest and personality
                - School provides credibility and relatability
              */}
              <footer className="flex items-center gap-3">
                {/* Gradient avatar */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  bg-gradient-to-br ${avatarBg}
                  text-white font-semibold text-sm
                `}>
                  {avatar}
                </div>
                <div>
                  <p className="text-surface-200 font-medium">{name}</p>
                  <p className="text-surface-500 text-sm">{school}</p>
                </div>
              </footer>
            </div>
          ))}
        </div>

        {/* 
          University logos strip (placeholder)
          - Adds institutional credibility
          - Visual break before final CTA
        */}
        <div className="mt-16 pt-12 border-t border-surface-800">
          <p className="text-center text-surface-600 text-sm mb-8">
            Trusted by students at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-50">
            {/* Placeholder university names - would be logos in production */}
            {['Stanford', 'UCLA', 'NYU', 'MIT', 'USC', 'Berkeley'].map((uni) => (
              <span 
                key={uni}
                className="text-surface-500 font-medium text-sm sm:text-base tracking-wide"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
