import { Component, HostListener, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface RouteLink {
  label: string;
  routerLink: string;
  type: 'route';
}

interface AnchorLink {
  label: string;
  href: string;
  type: 'anchor';
}

type NavLink = RouteLink | AnchorLink;

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class NavComponent {
  readonly navLinks: NavLink[] = [
    { label: 'About',    routerLink: '/about',    type: 'route' },
    { label: 'Projects', routerLink: '/projects', type: 'route' },
    { label: 'Contact',  routerLink: '/contact',  type: 'route' },
  ];

  menuOpen = signal(false);
  isScrolled = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > window.innerHeight);
  }
}
