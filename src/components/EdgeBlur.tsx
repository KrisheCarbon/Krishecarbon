/**
 * Gradient blur along the top and bottom of the window. It sits above the page and below the nav;
 * SiteEffects toggles `is-scrolling` / `is-at-footer` on <html> and the CSS does the rest.
 * Each edge is four stacked layers of increasing blur, which reads as one smooth ramp.
 */
export function EdgeBlur() {
  return (
    <>
      {['top', 'bottom'].map((side) => (
        <div key={side} className={`edge edge--${side}`} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      ))}
    </>
  )
}
