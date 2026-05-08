import { BlogPost } from '../models/portfolio.models';

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Building Accessible Angular Components from the Ground Up',
    publishedAt: new Date('2024-11-15'),
    excerpt:
      'Accessibility is not an afterthought — it\'s a design constraint. In this post I walk through the patterns I use to build WCAG 2.1 AA-compliant Angular components, from ARIA roles to keyboard navigation.',
    coverImageUrl: 'https://placehold.co/800x450/f9a8d4/ffffff?text=Accessibility',
    readMoreUrl: '/blog/accessible-angular-components',
  },
  {
    title: 'Signals in Angular 17: A Practical Migration Guide',
    publishedAt: new Date('2024-09-03'),
    excerpt:
      'Angular Signals are now stable and they change how we think about reactivity. Here\'s how I migrated a mid-sized application from RxJS-heavy patterns to a signals-first architecture — and what I learned along the way.',
    coverImageUrl: 'https://placehold.co/800x450/c4b5fd/ffffff?text=Signals',
    readMoreUrl: '/blog/angular-signals-migration',
  },
  {
    title: 'Tailwind CSS Tips for Angular Developers',
    publishedAt: new Date('2024-06-20'),
    excerpt:
      'Tailwind and Angular are a surprisingly great pairing. I share my favourite utility patterns, how to integrate Tailwind with Angular\'s component encapsulation, and a few gotchas to watch out for.',
    coverImageUrl: 'https://placehold.co/800x450/86efac/ffffff?text=Tailwind',
    readMoreUrl: '/blog/tailwind-angular-tips',
  },
  {
    title: 'Why I Switched from NgRx to Angular Signals for State Management',
    publishedAt: new Date('2024-03-11'),
    excerpt:
      'NgRx is powerful but it comes with a lot of boilerplate. After experimenting with Signals-based state management on a real project, I\'m convinced it\'s the right choice for most apps. Here\'s my reasoning.',
    coverImageUrl: 'https://placehold.co/800x450/fde68a/ffffff?text=State+Management',
    readMoreUrl: '/blog/ngrx-vs-signals',
  },
  {
    title: 'Designing a Pastel Design System with CSS Custom Properties',
    publishedAt: new Date('2023-12-05'),
    excerpt:
      'Custom properties (CSS variables) are the backbone of any scalable design system. I walk through how I built a pastel-themed token system that works seamlessly with both Tailwind and vanilla CSS.',
    coverImageUrl: 'https://placehold.co/800x450/fbcfe8/ffffff?text=Design+System',
    readMoreUrl: '/blog/pastel-design-system',
  },
  {
    title: 'Getting Started with Angular Universal and SSR',
    publishedAt: new Date('2023-08-22'),
    excerpt:
      'Server-side rendering can dramatically improve your Angular app\'s SEO and perceived performance. This beginner-friendly guide covers setup, common pitfalls, and how to handle browser-only APIs safely.',
    coverImageUrl: 'https://placehold.co/800x450/a5f3fc/ffffff?text=SSR',
    readMoreUrl: '/blog/angular-universal-ssr',
  },
];
