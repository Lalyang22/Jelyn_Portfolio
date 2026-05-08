import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Skill } from '../../models/portfolio.models';

@Component({
  selector: 'app-skill-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-badge.html',
  styleUrl: './skill-badge.css',
})
export class SkillBadgeComponent {
  @Input() skill!: Skill;

  get badgeClass(): string {
    switch (this.skill?.category) {
      case 'Frontend':
        return 'bg-brand-soft';
      case 'Backend':
        return 'bg-brand-lavender';
      case 'Tools':
        return 'bg-brand-sage';
      case 'Design':
        return 'bg-pink-100';
      default:
        return 'bg-brand-soft';
    }
  }
}
