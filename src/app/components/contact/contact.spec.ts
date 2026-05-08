// Feature: girly-portfolio, Property 14: Contact form blocks submission when any required field is empty
// Feature: girly-portfolio, Property 15: Contact form rejects invalid email formats
import * as fc from 'fast-check';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ContactComponent } from './contact';
import { ReactiveFormsModule } from '@angular/forms';

const REQUIRED_FIELDS = ['name', 'email', 'subject', 'message'] as const;

describe('ContactComponent – form validation (Property 14)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('form is invalid when any required field is empty', () => {
    fc.assert(
      fc.property(
        fc.subarray(REQUIRED_FIELDS as unknown as string[], { minLength: 1 }),
        (emptyFields) => {
          const fixture = TestBed.createComponent(ContactComponent);
          const comp = fixture.componentInstance;
          fixture.detectChanges();

          // Fill all fields with valid values first
          comp.form.setValue({
            name: 'Alice',
            email: 'alice@example.com',
            subject: 'Hello',
            message: 'Test message',
          });

          // Clear the selected fields
          emptyFields.forEach((field) => {
            comp.form.get(field)?.setValue('');
          });

          expect(comp.form.invalid).toBe(true);
        },
      ),
      { numRuns: 100 },
    );
  });

  it('does not set submitted to true when form is invalid', () => {
    fc.assert(
      fc.property(
        fc.subarray(REQUIRED_FIELDS as unknown as string[], { minLength: 1 }),
        (emptyFields) => {
          const fixture = TestBed.createComponent(ContactComponent);
          const comp = fixture.componentInstance;
          fixture.detectChanges();

          comp.form.setValue({
            name: 'Alice',
            email: 'alice@example.com',
            subject: 'Hello',
            message: 'Test message',
          });

          emptyFields.forEach((field) => {
            comp.form.get(field)?.setValue('');
          });

          comp.onSubmit();
          expect(comp.submitted()).toBe(false);
        },
      ),
      { numRuns: 100 },
    );
  });
});

describe('ContactComponent – email validation (Property 15)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('email control is invalid for any non-email string', () => {
    // Strings that are clearly not valid emails
    const nonEmailArb = fc.string({ minLength: 1, maxLength: 30 }).filter(
      (s) => !s.includes('@') || s.startsWith('@') || s.endsWith('@'),
    );

    fc.assert(
      fc.property(nonEmailArb, (nonEmail) => {
        const fixture = TestBed.createComponent(ContactComponent);
        const comp = fixture.componentInstance;
        fixture.detectChanges();

        comp.form.get('email')?.setValue(nonEmail);
        comp.form.get('email')?.markAsTouched();

        expect(comp.form.get('email')?.invalid).toBe(true);
      }),
      { numRuns: 100 },
    );
  });

  it('sets submitted to true and resets form on valid submission', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const comp = fixture.componentInstance;
    fixture.detectChanges();

    comp.form.setValue({
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Hello',
      message: 'Test message',
    });

    comp.onSubmit();
    expect(comp.submitted()).toBe(true);
    expect(comp.form.value).toEqual({ name: null, email: null, subject: null, message: null });
  });
});
