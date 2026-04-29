@AGENTS.md
// AthleteHQ case study - interaction reference: jashsak.com/sleep
// Parallax strategy:
// - Hero bg: translateY 0 → -15% as section exits (scrub: true)
// - Phone trio: left + right phones translateY 80px → 0 (scrub: 1)
// - Dashboard screenshot: scale 1.04 → 1 on enter (no scrub)
// - Statement sections: opacity/translateY, IntersectionObserver
// - Stats: JS counter via requestAnimationFrame
// - Sticky nav: backdrop-blur on scroll > 80px
// - All GSAP wrapped in prefers-reduced-motion check
// - Parallax disabled on mobile (< 768px)