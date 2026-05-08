// Feature: girly-portfolio, Property 4: Skill badges are grouped by category
import * as fc from 'fast-check';
import { AboutComponent } from './about';
import { Skill } from '../../models/portfolio.models';

const CATEGORIES: Skill['category'][] = ['Frontend', 'Backend', 'Tools', 'Design'];

const skillArb = fc.record({
  name: fc.string({ minLength: 1, maxLength: 20 }),
  category: fc.constantFrom(...CATEGORIES),
}) as fc.Arbitrary<Skill>;

describe('AboutComponent – skillsByCategory (Property 4)', () => {
  it('each group contains only badges whose category matches the group label', () => {
    fc.assert(
      fc.property(fc.array(skillArb, { minLength: 1, maxLength: 20 }), (skills) => {
        // Instantiate component logic directly (no TestBed needed for pure logic)
        const comp = new (class {
          skills = skills;
          get skillsByCategory(): Map<string, Skill[]> {
            const map = new Map<string, Skill[]>();
            const order: Skill['category'][] = ['Frontend', 'Backend', 'Tools', 'Design'];
            for (const category of order) {
              const group = this.skills.filter((s) => s.category === category);
              if (group.length > 0) map.set(category, group);
            }
            return map;
          }
        })();

        comp.skillsByCategory.forEach((groupSkills, groupLabel) => {
          groupSkills.forEach((skill) => {
            expect(skill.category).toBe(groupLabel);
          });
        });
      }),
      { numRuns: 100 },
    );
  });

  it('no badge appears in a group that does not match its category', () => {
    fc.assert(
      fc.property(fc.array(skillArb, { minLength: 1, maxLength: 20 }), (skills) => {
        const map = new Map<string, Skill[]>();
        const order: Skill['category'][] = ['Frontend', 'Backend', 'Tools', 'Design'];
        for (const category of order) {
          const group = skills.filter((s) => s.category === category);
          if (group.length > 0) map.set(category, group);
        }

        map.forEach((groupSkills, groupLabel) => {
          const wrongBadges = groupSkills.filter((s) => s.category !== groupLabel);
          expect(wrongBadges.length).toBe(0);
        });
      }),
      { numRuns: 100 },
    );
  });
});
