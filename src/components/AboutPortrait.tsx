"use client";

/* Optional local JPG + onError matches original static HTML; next/image is noisy for missing files. */
/* eslint-disable @next/next/no-img-element */

export function AboutPortrait() {
  return (
    <>
      <div className="dots" aria-hidden="true" />
      <div className="photo">
        {/* Drop portrait at public/assets/david-portrait.png to populate */}
        <img
          src="/assets/david-portrait.png"
          alt="Portrait of David Qin"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
    </>
  );
}
