// hero.ts

import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  inject,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { AnimationService } from '../../services/animation.service';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design';
  level: string;
  icon: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit {
  private readonly animationService = inject(AnimationService);

  @ViewChild('headlineEl') headlineEl!: ElementRef<HTMLElement>;
  @ViewChild('taglineEl') taglineEl!: ElementRef<HTMLElement>;
  @ViewChild('ctaEl') ctaEl!: ElementRef<HTMLElement>;

  @ViewChildren('badgeEl')
  badgeEls!: QueryList<ElementRef<HTMLElement>>;

  readonly skills: Skill[] = [
    // Frontend
    {
      name: 'Angular',
      category: 'Frontend',
      level: 'Advanced',
      icon: 'devicon-angularjs-plain colored',
    },
    {
      name: 'TypeScript',
      category: 'Frontend',
      level: 'Advanced',
      icon: 'devicon-typescript-plain colored',
    },
    {
      name: 'Tailwind CSS',
      category: 'Frontend',
      level: 'Advanced',
      icon: 'devicon-tailwindcss-plain colored',
    },
    {
      name: 'ReactJS',
      category: 'Frontend',
      level: 'Intermediate',
      icon: 'devicon-react-original colored',
    },

    // Backend
    {
      name: 'Node.js',
      category: 'Backend',
      level: 'Intermediate',
      icon: 'devicon-nodejs-plain colored',
    },
    {
      name: 'REST APIs',
      category: 'Backend',
      level: 'Advanced',
      icon: 'devicon-fastapi-plain colored',
    },

    // Tools
    {
      name: 'Git',
      category: 'Tools',
      level: 'Advanced',
      icon: 'devicon-git-plain colored',
    },
    {
      name: 'VS Code',
      category: 'Tools',
      level: 'Advanced',
      icon: 'devicon-vscode-plain colored',
    },

    // Design
    {
      name: 'Figma',
      category: 'Design',
      level: 'Intermediate',
      icon: 'devicon-figma-plain colored',
    },
    {
      name: 'UI/UX Design',
      category: 'Design',
      level: 'Intermediate',
      icon: 'devicon-dribbble-plain colored',
    },
    {
      name: 'Playwright',
      category: 'Tools',
      level: 'Intermediate',
      icon: 'devicon-playwright-plain colored',
    },
    {
      name: 'Selenium',
      category: 'Tools',
      level: 'Intermediate',
      icon: 'devicon-selenium-original colored',
    },
  ];

  get skillsByCategory(): Map<string, Skill[]> {
    const map = new Map<string, Skill[]>();

    const order: Skill['category'][] = [
      'Frontend',
      'Backend',
      'Tools',
      'Design',
    ];

    for (const category of order) {
      const group = this.skills.filter(
        (s) => s.category === category
      );

      if (group.length > 0) {
        map.set(category, group);
      }
    }

    return map;
  }

  ngAfterViewInit(): void {
    this.badgeEls.forEach((ref) => {
      this.animationService.observe(ref.nativeElement);
    });

    this.animationService.staggerEntrance(
      [
        this.headlineEl.nativeElement,
        this.taglineEl.nativeElement,
        this.ctaEl.nativeElement,
      ],
      150
    );
  }
}