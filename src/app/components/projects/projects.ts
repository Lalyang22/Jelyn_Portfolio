import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  readonly allProjects: Project[] = PROJECTS;

  // Collect unique tags from all projects
  readonly allTags: string[] = [
    ...new Set(PROJECTS.flatMap((p) => p.tags)),
  ];

  activeFilter = signal<string | null>(null);

  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (!filter) return this.allProjects;
    return this.allProjects.filter((p) => p.tags.includes(filter));
  });

  setFilter(tag: string | null): void {
    this.activeFilter.set(tag);
  }
}
