import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="sk-footer">
      <!-- Smooth Organic Dark Wave Top Transition -->
      <div class="sk-footer-wave-wrap" aria-hidden="true">
        <svg
          class="sk-footer-wave-svg"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32 C180,54 360,8 580,26 C800,44 980,10 1200,24 C1320,32 1390,38 1440,30 L1440,56 L0,56 Z"
            fill="#121215"
          />
        </svg>
      </div>

      <div class="sk-footer-body">
        <div class="sk-container">
          <div class="sk-footer-bar">
            <div class="ca-footer-copy">© 2026 Udith Babu K N • Kerala, India</div>

            <div class="sk-footer-links">
              <a routerLink="/" class="sk-footer-link">Home</a>
              <a routerLink="/work" class="sk-footer-link">Work</a>
              <a routerLink="/about" class="sk-footer-link">About</a>
              <a routerLink="/skills" class="sk-footer-link">Skills</a>
              <a routerLink="/blog" class="sk-footer-link">Blog</a>
              <a routerLink="/contact" class="sk-footer-link">Contact</a>
              <button type="button" (click)="openTos()" class="sk-footer-link sk-footer-legal-tag">
                Terms of Service
              </button>
              <button type="button" (click)="openPrivacy()" class="sk-footer-link sk-footer-legal-tag">
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- TERMS OF SERVICE MODAL (native <dialog> with showModal + light dismiss) -->
    <dialog #tosDialog class="sk-legal-dialog" aria-labelledby="tos-modal-title" closedby="any">
      <div class="sk-legal-modal-header">
        <h3 id="tos-modal-title" class="sk-legal-modal-title">Terms of Service</h3>
        <form method="dialog">
          <button type="submit" class="sk-legal-close-btn" aria-label="Close Terms of Service">
            Close
          </button>
        </form>
      </div>
      <div class="sk-legal-modal-body">
        <h4>1. Introduction and Scope</h4>
        <p>
          Welcome to the official portfolio and case study archive of Udith Babu K N (<a
            href="https://udithbabukn.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            >udithbabukn.github.io</a
          >). By accessing or utilizing this website, you agree to comply with and be bound by the following terms and
          conditions.
        </p>

        <h4>2. Intellectual Property and Content Rights</h4>
        <p>
          All text, analytical frameworks, articles, source code samples, case study documentation, and layout designs
          presented on this website are the intellectual property of Udith Babu K N unless otherwise noted or attributed
          to third-party employers/clients (such as Rêve, Accelgrowth, or Cyber Sapient).
        </p>
        <p>
          You are permitted to review, quote with appropriate attribution, and link to materials for recruitment,
          professional evaluation, or academic reference. You may not republish complete articles or software artifacts
          for commercial profit without explicit prior written authorization.
        </p>

        <h4>3. Software Tools and Demos</h4>
        <p>
          Interactive tools and utilities linked herein (including Web Analyzer Pro, SEO Analytics Dashboard, and
          ImageForge) are provided on an "as is" and "as available" basis for demonstration and evaluation purposes. No
          warranty, express or implied, is provided regarding uninterrupted availability or suitability for specific
          production workloads.
        </p>

        <h4>4. External Third-Party Links</h4>
        <p>
          This portfolio provides direct outbound links to external platforms including GitHub, LinkedIn, Medium, and
          credential verification portals. Udith Babu K N is not responsible for the privacy practices, content, or
          availability of third-party domains.
        </p>

        <h4>5. Governing Law and Jurisdiction</h4>
        <p>
          These terms are governed by and construed in accordance with the laws of India, within the jurisdiction of the
          State of Kerala.
        </p>

        <h4>6. Inquiries and Contact</h4>
        <p>
          For questions regarding permitted use, project licensing, or commercial inquiries, contact:
          <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier&#64;gmail.com</a>.
        </p>
      </div>
    </dialog>

    <!-- PRIVACY POLICY MODAL (native <dialog> with showModal + light dismiss) -->
    <dialog #privacyDialog class="sk-legal-dialog" aria-labelledby="privacy-modal-title" closedby="any">
      <div class="sk-legal-modal-header">
        <h3 id="privacy-modal-title" class="sk-legal-modal-title">Privacy Policy</h3>
        <form method="dialog">
          <button type="submit" class="sk-legal-close-btn" aria-label="Close Privacy Policy">
            Close
          </button>
        </form>
      </div>
      <div class="sk-legal-modal-body">
        <h4>1. Respect for User Privacy</h4>
        <p>
          This website is dedicated to maintaining high standards of data privacy and transparency. We do not operate
          advertising tracking networks, sell visitor records, or deploy third-party telemetry brokers.
        </p>

        <h4>2. Information Collected via Direct Dispatch</h4>
        <p>
          When you submit a message through the contact form, the information provided (your name, email address, and
          message content) is transmitted securely via Web3Forms API solely for the purpose of receiving and responding
          to your inquiry.
        </p>
        <p>Your contact details are never shared, rented, or distributed to third-party commercial marketing lists.</p>

        <h4>3. Cookies and Tracking Technologies</h4>
        <p>
          This website does not utilize invasive tracking cookies or commercial behavioral profilers. Local browser
          storage may be utilized strictly for functional preferences (such as reading state or UI navigation).
        </p>

        <h4>4. Client-Side Tools Data Handling</h4>
        <p>
          Utilities linked within this portfolio, such as ImageForge and Web Analyzer Pro, execute processing entirely
          client-side within your browser sandbox via HTML5 Canvas and DOM APIs. Your files and images are never
          uploaded or persisted to remote servers.
        </p>

        <h4>5. Data Subject Rights</h4>
        <p>
          If you have submitted personal contact information and wish to request its verification, correction, or
          deletion from correspondence archives, you may do so at any time by emailing
          <a href="mailto:udithbabuvarrier@gmail.com">udithbabuvarrier&#64;gmail.com</a>.
        </p>

        <h4>6. Effective Date and Updates</h4>
        <p>
          This policy is effective as of 2026. Any updates reflecting regulatory or architectural changes will be posted
          directly to this colophon.
        </p>
      </div>
    </dialog>
  `,
})
export class FooterComponent {
  private readonly tosDialog = viewChild<ElementRef<HTMLDialogElement>>('tosDialog');
  private readonly privacyDialog = viewChild<ElementRef<HTMLDialogElement>>('privacyDialog');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (typeof HTMLDialogElement === 'undefined' || 'closedBy' in HTMLDialogElement.prototype) return;

      const dialogs = [this.tosDialog()?.nativeElement, this.privacyDialog()?.nativeElement].filter(
        (d): d is HTMLDialogElement => Boolean(d),
      );
      const outside = (e: PointerEvent, dialog: HTMLDialogElement) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };

      const cleanups = dialogs.map((dialog) => {
        let pressedOutside = false;
        const onDown = (e: PointerEvent) => {
          pressedOutside = outside(e, dialog);
        };
        const onUp = (e: PointerEvent) => {
          if (pressedOutside && outside(e, dialog)) dialog.close();
        };
        dialog.addEventListener('pointerdown', onDown);
        dialog.addEventListener('pointerup', onUp);
        return () => {
          dialog.removeEventListener('pointerdown', onDown);
          dialog.removeEventListener('pointerup', onUp);
        };
      });

      this.destroyRef.onDestroy(() => cleanups.forEach((fn) => fn()));
    });
  }

  openTos(): void {
    this.tosDialog()?.nativeElement.showModal();
  }

  openPrivacy(): void {
    this.privacyDialog()?.nativeElement.showModal();
  }
}
