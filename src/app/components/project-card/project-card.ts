import { Component, Input, AfterViewInit, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/portfolio.models';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCardComponent implements AfterViewInit {
  @Input() project!: Project;

  private readonly animationService = inject(AnimationService);
  private readonly el = inject(ElementRef);

  ngAfterViewInit(): void {
    this.animationService.observe(this.el.nativeElement);
  }
  
}
