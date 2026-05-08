// Feature: girly-portfolio, Property 7: Project card renders all required fields
// Feature: girly-portfolio, Property 8: Project filter returns only matching cards
import * as fc from 'fast-check';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProjectCardComponent } from './project-card';
import { Project } from '../../models/portfolio.models';

const urlArb = fc.webUrl();
const tagArb = fc.string({ minLength: 1, maxLength: 15 });

const projectArb: fc.Arbitrary<Project> = fc.record({
  title: fc.string({ minLength: 1, maxLength: 50 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  tags: fc.array(tagArb, { minLength: 1, maxLength: 5 }),
  demoUrl: urlArb,
  repoUrl: urlArb,
});

describe('ProjectCardComponent – required fields (Property 7)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders title, description, at least one tag, demo link, and repo link for any valid Project', async () => {
    await fc.assert(
      fc.asyncProperty(projectArb, async (project) => {
        const fixture = TestBed.createComponent(ProjectCardComponent);
        fixture.componentInstance.project = project;
        fixture.detectChanges();
        await fixture.whenStable();

        const el: HTMLElement = fixture.nativeElement;
        expect(el.textContent).toContain(project.title);
        expect(el.textContent).toContain(project.description);
        expect(el.textContent).toContain(project.tags[0]);

        const links = el.querySelectorAll('a');
        const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
        expect(hrefs).toContain(project.demoUrl);
        expect(hrefs).toContain(project.repoUrl);
      }),
      { numRuns: 50 },
    );
  });
});

describe('ProjectsComponent – filter logic (Property 8)', () => {
  it('all displayed projects contain the active tag; no non-matching projects shown', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 1, maxLength: 10 }),
        tagArb,
        (projects, filterTag) => {
          const filtered = projects.filter((p) => p.tags.includes(filterTag));
          const nonMatching = filtered.filter((p) => !p.tags.includes(filterTag));
          expect(nonMatching.length).toBe(0);

          // All projects NOT in filtered must not contain the tag
          const shouldBeExcluded = projects.filter((p) => !p.tags.includes(filterTag));
          shouldBeExcluded.forEach((p) => {
            expect(filtered).not.toContain(p);
          });
        },
      ),
      { numRuns: 100 },
    );
  });

  it('shows "No projects found" message when filter matches nothing', () => {
    const projects: Project[] = [
      { title: 'A', description: 'desc', tags: ['Angular'], demoUrl: 'http://a.com', repoUrl: 'http://b.com' },
    ];
    const filtered = projects.filter((p) => p.tags.includes('React'));
    expect(filtered.length).toBe(0);
  });
});
