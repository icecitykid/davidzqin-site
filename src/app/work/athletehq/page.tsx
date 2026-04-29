'use client';

export default function AthleteHQPage() {
  return (
    <main className="relative">
      <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-6 px-6 py-4 text-sm font-medium">
          <a href="#intro">Overview</a>
          <a href="#phone-trio">Design</a>
          <a href="#results">Results</a>
        </div>
      </nav>

      <div id="hero" />
      <div id="intro" />
      <div id="phone-trio" />
      <div id="statement-1" />
      <div id="screens-1" />
      <div id="statement-2" />
      <div id="dashboard" />
      <div id="screens-2" />
      <div id="statement-3" />
      <div id="vision" />
      <div id="screens-3" />
      <div id="results" />
      <div id="next-project" />
    </main>
  );
}
