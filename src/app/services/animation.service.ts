import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private readonly reducedMotion: boolean;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Feature-detect IntersectionObserver; skip creation if unavailable
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              const animClass = el.dataset['animClass'] ?? 'animate-in';

              if (!this.reducedMotion) {
                el.classList.add(animClass);
              } else {
                this.revealImmediately(el);
              }

              // One-shot: unobserve after first intersection
              this.observer?.unobserve(el);
            }
          }
        },
        { threshold: 0.1 },
      );
    }
  }

  /**
   * Registers an element with the IntersectionObserver.
   * When the element enters the viewport, `animClass` is added (one-shot).
   * If IntersectionObserver is unavailable, the element is left as-is
   * (progressive enhancement — it remains visible without animation).
   */
  observe(el: Element, animClass = 'animate-in'): void {
    if (this.observer === null) {
      // API unavailable — element is already visible, nothing to do
      this.revealImmediately(el);
      return;
    }

    // Store the animation class on the element so the callback can retrieve it
    (el as HTMLElement).dataset['animClass'] = animClass;
    this.observer.observe(el);
  }

  /**
   * Sets an incremental `animation-delay` inline style on each element
   * (index × delayMs) and then registers each with `observe()`.
   * Under `prefers-reduced-motion: reduce`, no styles or classes are applied.
   */
  staggerEntrance(els: Element[], delayMs: number): void {
    els.forEach((el, index) => {
      if (!this.reducedMotion) {
        (el as HTMLElement).style.animationDelay = `${index * delayMs}ms`;
      }
      this.observe(el);
    });
  }

  private revealImmediately(el: Element): void {
    const element = el as HTMLElement;
    element.classList.remove('opacity-0');
    element.style.opacity = '1';
    element.style.transform = 'none';
  }
}
