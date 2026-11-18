import { Component, inject, signal } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { WEB3FORMS_ACCESS_KEY } from '../utils/webmcp';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  template: `
    <section id="contact" style="padding: 28px 0 70px; border-bottom: none;">
      <div class="sk-container" style="max-width: 780px;">
        <div class="sk-contact-box" style="margin-top: 12px;">
          <h1 class="sk-section-heading" style="margin-bottom: 12px; text-align: center;">
            Drop a note at Udith's desk.
          </h1>
          <p class="sk-page-subtitle" style="text-align: center; font-size: 1.05rem; font-weight: 600; margin-bottom: 28px;">
            Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below.
          </p>

          @if (contactStatus() === 'success') {
            <div style="text-align: center; padding: 30px 10px;">
              <div class="ca-success-badge">
                DISPATCH RECORDED • RECEIVED
              </div>
              <h2 class="ca-success-title">
                Message Received at Udith's desk
              </h2>
              <p style="margin-top: 8px; color: var(--ca-text-secondary);">
                Thank you for reaching out. I'll get back to you shortly.
              </p>
              <button
                type="button"
                class="sk-action-pill"
                (click)="contactStatus.set('idle')"
                style="margin-top: 20px;"
              >
                Send Another Message
              </button>
            </div>
          } @else {
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              (submit)="onSubmit($event)"
              toolname="send_contact_message"
              tooldescription="Send a direct contact inquiry or collaboration message to Udith Babu K N"
              toolautosubmit="false"
            >
              <input type="hidden" name="access_key" [value]="accessKey" />
              <input type="hidden" name="subject" value="New Portfolio Dispatch (Shelby Desk Style)" />
              <input type="hidden" name="from_name" value="Udith's Desk" />
              <input type="checkbox" name="botcheck" style="display: none;" />

              <div class="sk-form-row">
                <div>
                  <label
                    for="contact-name"
                    style="display: block; font-size: 0.76rem; font-weight: 800; margin-bottom: 6px; text-transform: uppercase; color: #000000;"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autocomplete="name"
                    aria-invalid="false"
                    data-error="contact-name-error"
                    description="Sender's full name"
                    placeholder="e.g. Jane Doe"
                    required
                    (blur)="syncFieldAria($event.target)"
                    (invalid)="syncFieldAria($event.target, true)"
                    (input)="onFieldInput($event.target)"
                    class="sk-form-input"
                  />
                  <div id="contact-name-error" class="sk-field-error">
                    <span role="img" aria-label="Error">!</span> Please enter your name.
                  </div>
                </div>
                <div>
                  <label
                    for="contact-email"
                    style="display: block; font-size: 0.76rem; font-weight: 800; margin-bottom: 6px; text-transform: uppercase; color: #000000;"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    aria-invalid="false"
                    data-error="contact-email-error"
                    description="Sender's email address for direct reply"
                    placeholder="e.g. jane&#64;company.com"
                    required
                    (blur)="syncFieldAria($event.target)"
                    (invalid)="syncFieldAria($event.target, true)"
                    (input)="onFieldInput($event.target)"
                    class="sk-form-input"
                  />
                  <div id="contact-email-error" class="sk-field-error">
                    <span role="img" aria-label="Error">!</span> Enter an email address in the format
                    you&#64;example.com.
                  </div>
                </div>
              </div>

              <div style="margin-bottom: 20px;">
                <label
                  for="contact-message"
                  style="display: block; font-size: 0.76rem; font-weight: 800; margin-bottom: 6px; text-transform: uppercase; color: #000000;"
                >
                  Note or Opportunity
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  aria-invalid="false"
                  data-error="contact-message-error"
                  description="Message, inquiry, or partnership opportunity details"
                  rows="4"
                  placeholder="Tell me what you have in mind..."
                  required
                  (blur)="syncFieldAria($event.target)"
                  (invalid)="syncFieldAria($event.target, true)"
                  (input)="onFieldInput($event.target)"
                  class="sk-form-textarea"
                ></textarea>
                <div id="contact-message-error" class="sk-field-error">
                  <span role="img" aria-label="Error">!</span> Please enter your message.
                </div>
              </div>

              <button type="submit" [disabled]="contactStatus() === 'loading'" class="sk-submit-btn">
                {{ contactStatus() === 'loading' ? 'Delivering to Desk...' : "Send to Udith’s Desk" }}
              </button>

              @if (contactStatus() === 'error') {
                <p style="color: #B91C1C; margin-top: 10px; font-size: 0.85rem;">{{ contactError() }}</p>
              }
            </form>
          }
        </div>
      </div>
    </section>
  `,
})
export class ContactPageComponent {
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact' },
  ];
  readonly accessKey = WEB3FORMS_ACCESS_KEY;
  readonly contactStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  readonly contactError = signal('');

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: "Contact | Drop a note at Udith's desk",
      description:
        "Have an open role, project proposal, or want to discuss growth marketing? Drop a note at Udith's desk.",
      canonical: 'https://udithbabukn.github.io/contact',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ContactPage',
            '@id': 'https://udithbabukn.github.io/contact',
            url: 'https://udithbabukn.github.io/contact',
            name: "Contact | Drop a note at Udith's desk",
            description:
              'Have an open role, project proposal, or want to discuss growth marketing? Send a direct dispatch below.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
                { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://udithbabukn.github.io/contact' },
              ],
            },
          },
        ],
      },
    });
  }

  syncFieldAria(target: EventTarget | null, forceInvalid = false): void {
    const el = target as HTMLInputElement | HTMLTextAreaElement | null;
    if (!el || !el.dataset?.['error']) return;
    const errorId = el.dataset['error'];
    const supportsUserInvalid = typeof CSS !== 'undefined' && CSS.supports('selector(:user-invalid)');
    const isInvalid = forceInvalid || (supportsUserInvalid ? el.matches(':user-invalid') : !el.validity.valid);
    el.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    if (isInvalid) el.setAttribute('aria-describedby', errorId);
    else el.removeAttribute('aria-describedby');
  }

  onFieldInput(target: EventTarget | null): void {
    const el = target as HTMLElement | null;
    if (el?.getAttribute('aria-invalid') === 'true') {
      this.syncFieldAria(el);
    }
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.contactStatus.set('loading');
    this.contactError.set('');

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const resJson = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (response.ok && resJson.success) {
        this.contactStatus.set('success');
      } else {
        throw new Error(resJson.message || 'Could not deliver your message right now. Please try again shortly.');
      }
    } catch (err) {
      this.contactStatus.set('error');
      this.contactError.set(err instanceof Error ? err.message : 'Error occurred. Please reach out directly.');
    }
  }
}
