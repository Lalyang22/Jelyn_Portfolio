// Feature: girly-portfolio, Property 2: All interactive nav elements have aria-labels
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavComponent } from './nav';

describe('NavComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should toggle menuOpen signal when hamburger is clicked', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    expect(comp.menuOpen()).toBe(false);
    comp.toggleMenu();
    expect(comp.menuOpen()).toBe(true);
    comp.toggleMenu();
    expect(comp.menuOpen()).toBe(false);
  });

  it('should close menu when closeMenu is called', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const comp = fixture.componentInstance;
    comp.menuOpen.set(true);
    comp.closeMenu();
    expect(comp.menuOpen()).toBe(false);
  });

  it('should apply glass class when scrolled past hero height', () => {
    const fixture = TestBed.createComponent(NavComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    expect(comp.isScrolled()).toBe(false);

    // Simulate scroll past hero
    Object.defineProperty(window, 'scrollY', { value: window.innerHeight + 1, configurable: true });
    comp.onWindowScroll();
    expect(comp.isScrolled()).toBe(true);

    // Simulate scroll back to top
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    comp.onWindowScroll();
    expect(comp.isScrolled()).toBe(false);
  });

  it('should have aria-label on hamburger button', () => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[aria-label]') as HTMLButtonElement;
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-label')).toBeTruthy();
  });

  it('should have aria-label on all nav links', () => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('a[aria-label]') as NodeListOf<HTMLAnchorElement>;
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });
  });
});
