import { Component, signal, computed } from '@angular/core';

interface FaviconOption {
  id: number;
  title: string;
  category: 'color' | 'minimal' | 'titan' | 'brand' | 'geometric';
  colorName?: string;
  brand?: string;
  tag: string;
  desc: string;
  file: string;
}

@Component({
  selector: 'app-favicon-options',
  standalone: true,
  template: `
    <main class="fav-page-wrapper">
      <div class="fav-container">
        <!-- Header -->
        <header class="fav-header">
          <span class="fav-badge">Premium Color Palette Suite</span>
          <h1 class="fav-title">Distinct Personal Brand Favicons</h1>
          <p class="fav-subtitle">
            Original, highly recognizable personal marks for <strong>Udith Babu K N</strong> breaking free from standard website blue. Crafted in iconic high-luxury color personalities: <strong>Hermès Lava Orange, Imperial Jade &amp; Gold, Kyoto Vermilion, Klein Blue, Monaco Champagne Titanium, and Nordic Acid Lime</strong>.
          </p>
          
          <div class="fav-status-banner">
            <span class="fav-status-dot"></span>
            <span><strong>Safety Status:</strong> Production favicons are 100% untouched. No files will be deployed until you choose your preferred option.</span>
          </div>

          <!-- Filter Navigation -->
          <div class="fav-filter-nav">
            <button 
              type="button" 
              class="fav-filter-btn color-highlight" 
              [class.active]="filter() === 'color'"
              (click)="setFilter('color')">
              ✨ Premium Color Originals (Options 41–50)
            </button>
            <button 
              type="button" 
              class="fav-filter-btn" 
              [class.active]="filter() === 'minimal'"
              (click)="setFilter('minimal')">
              Bespoke Minimal (Options 31–40)
            </button>
            <button 
              type="button" 
              class="fav-filter-btn" 
              [class.active]="filter() === 'titan'"
              (click)="setFilter('titan')">
              Tech Titan Explorations (Options 21–30)
            </button>
            <button 
              type="button" 
              class="fav-filter-btn" 
              [class.active]="filter() === 'brand'"
              (click)="setFilter('brand')">
              Global Brands (Options 11–20)
            </button>
            <button 
              type="button" 
              class="fav-filter-btn" 
              [class.active]="filter() === 'geometric'"
              (click)="setFilter('geometric')">
              Geometric (Options 01–10)
            </button>
            <button 
              type="button" 
              class="fav-filter-btn" 
              [class.active]="filter() === 'all'"
              (click)="setFilter('all')">
              View All (50)
            </button>
          </div>
        </header>

        <!-- Options Grid -->
        <div class="fav-grid">
          @for (opt of filteredOptions(); track opt.id) {
            <article class="fav-card" [class.color-card]="opt.category === 'color'" [class.minimal-card]="opt.category === 'minimal'">
              <div class="fav-card-top">
                <div class="fav-num-cluster">
                  <span class="fav-option-num">OPTION {{ opt.id < 10 ? '0' + opt.id : opt.id }}</span>
                  @if (opt.colorName) {
                    <span class="fav-color-badge">{{ opt.colorName }}</span>
                  }
                  @if (opt.brand) {
                    <span class="fav-brand-badge">{{ opt.brand }}</span>
                  }
                </div>
                <span class="fav-tag">{{ opt.tag }}</span>
              </div>

              <h2 class="fav-card-title">{{ opt.title }}</h2>
              <p class="fav-card-desc">{{ opt.desc }}</p>

              <!-- Multi-scale Visual Preview Box -->
              <div class="fav-preview-box">
                <div class="fav-preview-large-wrap">
                  <img
                    [src]="'/favicons/' + opt.file"
                    class="fav-large-img"
                    [alt]="opt.title + ' preview'"
                    width="140"
                    height="140"
                  />
                </div>

                <div class="fav-scales-row">
                  <div class="fav-scale-item">
                    <img [src]="'/favicons/' + opt.file" width="64" height="64" alt="64px" />
                    <span>64px</span>
                  </div>
                  <div class="fav-scale-item">
                    <img [src]="'/favicons/' + opt.file" width="32" height="32" alt="32px" />
                    <span>32px</span>
                  </div>
                  <div class="fav-scale-item">
                    <img [src]="'/favicons/' + opt.file" width="16" height="16" alt="16px" />
                    <span>16px</span>
                  </div>
                </div>
              </div>

              <!-- Realistic Chrome Browser Tab Simulations -->
              <div class="fav-tabs-box">
                <span class="fav-tabs-title">Browser Tab Simulation</span>
                
                <!-- Light Tab -->
                <div class="fav-tab-mock fav-tab-light">
                  <img [src]="'/favicons/' + opt.file" class="fav-tab-favicon" width="16" height="16" alt="favicon" />
                  <span class="fav-tab-text">Udith Babu K N | Marketing &amp; Sales</span>
                  <span class="fav-tab-close">×</span>
                </div>

                <!-- Dark Tab -->
                <div class="fav-tab-mock fav-tab-dark">
                  <img [src]="'/favicons/' + opt.file" class="fav-tab-favicon" width="16" height="16" alt="favicon" />
                  <span class="fav-tab-text">Udith Babu K N | Marketing &amp; Sales</span>
                  <span class="fav-tab-close">×</span>
                </div>
              </div>

              <div class="fav-card-footer">
                <div class="fav-choice-helper">
                  Reply with <strong>"Option {{ opt.id }}"</strong> to activate
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </main>
  `,
  styles: [`
    .fav-page-wrapper {
      min-height: 100vh;
      background: #F8FAFC;
      color: #0F172A;
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      padding: 48px 24px 100px;
    }
    .fav-container {
      max-width: 1400px;
      margin: 0 auto;
    }
    .fav-header {
      text-align: center;
      margin-bottom: 48px;
    }
    .fav-badge {
      display: inline-block;
      background: #FEF3C7;
      color: #B45309;
      border: 1px solid #FDE68A;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 5px 18px;
      border-radius: 9999px;
      margin-bottom: 14px;
    }
    .fav-title {
      font-family: 'Outfit', sans-serif;
      font-size: clamp(2.2rem, 4.5vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0F172A;
      margin-bottom: 14px;
    }
    .fav-subtitle {
      color: #475569;
      font-size: 1.08rem;
      max-width: 860px;
      margin: 0 auto 20px;
      line-height: 1.65;
    }
    .fav-status-banner {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
      padding: 10px 22px;
      border-radius: 9999px;
      font-size: 0.9rem;
      color: #1E293B;
      margin-bottom: 32px;
    }
    .fav-status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10B981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
    }
    .fav-filter-nav {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .fav-filter-btn {
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      padding: 10px 20px;
      border-radius: 9999px;
      font-size: 0.88rem;
      font-weight: 600;
      color: #475569;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .fav-filter-btn:hover {
      background: #F1F5F9;
      color: #0F172A;
      border-color: #94A3B8;
    }
    .fav-filter-btn.active {
      background: #0F172A;
      color: #FFFFFF;
      border-color: #0F172A;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.28);
    }
    .fav-filter-btn.color-highlight:not(.active) {
      border-color: #F59E0B;
      color: #B45309;
      background: #FFFBEB;
    }
    .fav-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 30px;
    }
    .fav-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 22px;
      padding: 26px;
      box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
      display: flex;
      flex-direction: column;
    }
    .fav-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px -4px rgba(15, 23, 42, 0.12);
      border-color: #94A3B8;
    }
    .fav-card.color-card {
      border-top: 4px solid #FF5500;
    }
    .fav-card.minimal-card {
      border-top: 4px solid #0F172A;
    }
    .fav-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 8px;
    }
    .fav-num-cluster {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .fav-option-num {
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 0.82rem;
      color: #0F172A;
      background: #F1F5F9;
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
    }
    .fav-color-badge {
      font-size: 0.76rem;
      font-weight: 700;
      color: #C2410C;
      background: #FFF7ED;
      border: 1px solid #FED7AA;
      padding: 3px 9px;
      border-radius: 6px;
    }
    .fav-brand-badge {
      font-size: 0.76rem;
      font-weight: 700;
      color: #475569;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      padding: 3px 9px;
      border-radius: 6px;
    }
    .fav-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: #D97706;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .fav-card-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #0F172A;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .fav-card-desc {
      font-size: 0.9rem;
      color: #475569;
      line-height: 1.55;
      margin-bottom: 20px;
      flex-grow: 1;
    }
    .fav-preview-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 18px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      margin-bottom: 18px;
    }
    .fav-large-img {
      width: 130px;
      height: 130px;
      filter: drop-shadow(0 8px 16px rgba(15, 23, 42, 0.1));
      display: block;
    }
    .fav-scales-row {
      display: flex;
      align-items: flex-end;
      gap: 24px;
      padding-top: 16px;
      border-top: 1px solid #E2E8F0;
      width: 100%;
      justify-content: center;
    }
    .fav-scale-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      color: #64748B;
    }
    .fav-scale-item img {
      border-radius: 4px;
      display: block;
    }
    .fav-tabs-box {
      background: #F1F5F9;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }
    .fav-tabs-title {
      font-size: 0.7rem;
      font-weight: 700;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .fav-tab-mock {
      border-radius: 8px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.76rem;
      font-weight: 500;
    }
    .fav-tab-light {
      background: #FFFFFF;
      color: #1E293B;
      border: 1px solid #CBD5E1;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .fav-tab-dark {
      background: #1E293B;
      color: #F8FAFC;
      border: 1px solid #334155;
    }
    .fav-tab-favicon {
      width: 16px;
      height: 16px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .fav-tab-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-grow: 1;
    }
    .fav-tab-close {
      color: #94A3B8;
      font-size: 1rem;
      line-height: 1;
      margin-left: 4px;
    }
    .fav-card-footer {
      border-top: 1px dashed #E2E8F0;
      padding-top: 14px;
      text-align: center;
    }
    .fav-choice-helper {
      font-size: 0.82rem;
      color: #64748B;
    }
    .fav-choice-helper strong {
      color: #C2410C;
    }
  `]
})
export class FaviconOptionsComponent {
  // Default to the user's latest request: Distinct Premium Color Suite (Options 41–50)!
  readonly filter = signal<'color' | 'minimal' | 'titan' | 'brand' | 'geometric' | 'all'>('color');

  readonly allOptions: FaviconOption[] = [
    // =======================================================================
    // --- SET 5: DISTINCT PREMIUM COLOR IDENTITY (Options 41–50) ---
    // Breaking free from blue with high recognition luxury pigments
    // =======================================================================
    {
      id: 41,
      category: 'color',
      colorName: 'Hermès Lava Orange',
      file: 'option41.svg',
      title: 'The Hermès Lava Flame',
      tag: 'Hyper-Saturated Luxury Flame',
      desc: 'High-saturation Porsche / Hermès lava orange squircle housing a razor-sharp optical white U with an obsidian corner bevel. Maximum 16px visibility in any browser.'
    },
    {
      id: 42,
      category: 'color',
      colorName: 'Imperial Jade & Gold',
      file: 'option42.svg',
      title: 'The British Racing Emerald',
      tag: 'Prestige Heritage Luxury',
      desc: 'Deep British Racing Green / Imperial Jade field with a monumental architectural U glyph in warm 24K brushed gold. Dignified, timeless executive presence.'
    },
    {
      id: 43,
      category: 'color',
      colorName: 'Pitch Obsidian & Citron',
      file: 'option43.svg',
      title: 'The Nordic Acid Lime',
      tag: 'Brutalist High-Contrast Citron',
      desc: 'Matte pitch black obsidian squircle with an electric acid lime geometric U and optic center nucleus that demands instant attention across 100 open tabs.'
    },
    {
      id: 44,
      category: 'color',
      colorName: 'Byzantine Plum & Coral',
      file: 'option44.svg',
      title: 'The Royal Amethyst & Coral',
      tag: 'Deep Velvet Haute Plum',
      desc: 'Deep velvet violet-plum field with an optical chalk-white asymmetric U monolith accented by a vibrant coral apex dot. Sophisticated couture aesthetic.'
    },
    {
      id: 45,
      category: 'color',
      colorName: 'Kyoto Vermilion Red',
      file: 'option45.svg',
      title: 'The Kyoto Vermilion Seal',
      tag: 'Artisan Lacquer Crimson',
      desc: 'Traditional Japanese artisan lacquer red field with an immaculate minimalist bone-white geometric U and horizontal balance tie. Confident, balanced authority.'
    },
    {
      id: 46,
      category: 'color',
      colorName: 'Yves Klein Ultramarine',
      file: 'option46.svg',
      title: 'The Yves Klein Monopigment',
      tag: 'Hypnotic Pure Ultramarine',
      desc: 'Pure International Klein Blue (#002FA7) on crisp porcelain white, housing a bold modern monogram UB cut from an unbroken architectural ribbon.'
    },
    {
      id: 47,
      category: 'color',
      colorName: 'Matte Onyx & Champagne',
      file: 'option47.svg',
      title: 'The Monaco Titanium Ingot',
      tag: 'Quiet Luxury Champagne Titanium',
      desc: 'Velvet matte dark onyx field with an understated, razor-thin champagne gold titanium U glyph and floating orbital sphere. Private wealth & tech executive polish.'
    },
    {
      id: 48,
      category: 'color',
      colorName: 'Aegean Navy & Solar Amber',
      file: 'option48.svg',
      title: 'The Aegean Sea & Solar Amber',
      tag: 'Mediterranean Dual Pillar',
      desc: 'Deep Mediterranean marine navy with twin dynamic stems: Arctic cyan on the left and radiant solar amber on the right, unified by an optical white arc.'
    },
    {
      id: 49,
      category: 'color',
      colorName: 'Tuscan Terracotta',
      file: 'option49.svg',
      title: 'The Tuscan Terracotta & Alabaster',
      tag: 'Warm Earth & Sandstone Ivory',
      desc: 'Rich, grounded earthy terracotta squircle with an organic sculpted sandstone ivory U. Warm, intellectual, and deeply memorable.'
    },
    {
      id: 50,
      category: 'color',
      colorName: 'Midnight Mulberry & Teal',
      file: 'option50.svg',
      title: 'The Midnight Mulberry & Teal',
      tag: 'Future Executive Luminescence',
      desc: 'Velvet dark mulberry field with a vivid bioluminescent electric teal carved U featuring clean negative space air cuts. Cutting-edge tech leadership.'
    },

    // =======================================================================
    // --- SET 4: BESPOKE MINIMAL & PROFESSIONAL (Options 31–40) ---
    // =======================================================================
    {
      id: 31,
      category: 'minimal',
      file: 'option31.svg',
      title: 'The Apex Notch',
      tag: 'Architectural Geometric U',
      desc: 'Solid obsidian squircle with an immaculate geometric U featuring a precision 45° chamfered apex notch on the right stem.'
    },
    {
      id: 32,
      category: 'minimal',
      file: 'option32.svg',
      title: 'The Monolithic Pillar & Arc',
      tag: 'Minimal Structural Contrast',
      desc: 'Two precision architectural obsidian columns unified by a flat-bottomed royal cobalt radius arc on clean porcelain white.'
    },
    {
      id: 33,
      category: 'minimal',
      file: 'option33.svg',
      title: 'The Horizon Cut (UB)',
      tag: 'Executive Negative-Space Cut',
      desc: 'Bold condensed modern U where a single horizontal negative-space hairline slice cuts through the right stem, creating a clean abstract B ligature.'
    },
    {
      id: 34,
      category: 'minimal',
      file: 'option34.svg',
      title: 'The Precision Dot Monogram (U•)',
      tag: 'Swiss Typographic Anchor',
      desc: 'Ultra-minimalist Swiss geometry: a confident, thick-gauge geometric U paired with an authoritative solid cobalt punctuation dot.'
    },
    {
      id: 35,
      category: 'minimal',
      file: 'option35.svg',
      title: 'The Beveled Solid Ingot',
      tag: '100% Optical 16px Legibility',
      desc: 'Saturated royal cobalt field with an ultra-thick optical white U engineered with exact margins for cleanest readability.'
    },
    {
      id: 36,
      category: 'minimal',
      file: 'option36.svg',
      title: 'The Asymmetric Modernist Stem',
      tag: 'Architectural Weight Rhythm',
      desc: 'Left stem carries solid architectural weight while right stem is refined, creating dynamic balance, movement, and elegance.'
    },
    {
      id: 37,
      category: 'minimal',
      file: 'option37.svg',
      title: 'The Negative Space Keyhole',
      tag: 'Reverse Silhouette Carve',
      desc: 'Stark monolithic midnight-slate badge where the U is carved entirely out of negative space, framed by an electric blue optical nucleus.'
    },
    {
      id: 38,
      category: 'minimal',
      file: 'option38.svg',
      title: 'The Dual Lineage (Twin Rails)',
      tag: 'Dual Executive Competence',
      desc: 'Two parallel high-precision strokes (outer deep slate for Business Analysis, inner electric cobalt for Marketing Strategy).'
    },
    {
      id: 39,
      category: 'minimal',
      file: 'option39.svg',
      title: 'The Square-to-Curve Transition',
      tag: 'Bauhaus Structural Glyphs',
      desc: 'Sharp 90-degree square outer contours with an organically rounded inner basin.'
    },
    {
      id: 40,
      category: 'minimal',
      file: 'option40.svg',
      title: 'The Pure Monogram Seal (UKN)',
      tag: 'Understated Executive Seal',
      desc: 'Refined, understated executive seal: an anchored geometric U linked with a delicate cobalt tie-beam hinting at B and K.'
    },

    // =======================================================================
    // --- SET 3: Tech Titans & Claude Tier (Options 21–30) ---
    // =======================================================================
    {
      id: 21,
      category: 'titan',
      brand: 'Claude',
      file: 'option21.svg',
      title: 'The Claude Cognitive Asterisk',
      tag: 'Frontier AI Recognition',
      desc: 'Frontier AI asterisk mark with organic petals forming a subtle U silhouette in terracotta and royal sapphire.'
    },
    {
      id: 22,
      category: 'titan',
      brand: 'Google',
      file: 'option22.svg',
      title: 'The Google Quad-Spectrum U',
      tag: 'Universal Primary Recognition',
      desc: 'Google-grade 4-color multi-segmented arc geometry: Royal Blue, Red, Yellow, and Emerald Green.'
    },
    {
      id: 23,
      category: 'titan',
      brand: 'LinkedIn',
      file: 'option23.svg',
      title: 'The LinkedIn \'ub\' Monolith',
      tag: 'Executive B2B Authority',
      desc: 'Institutional Royal Cobalt squircle housing an ultra-bold optical white \'ub\' lowercase modern ligature.'
    },
    {
      id: 24,
      category: 'titan',
      brand: 'Instagram',
      file: 'option24.svg',
      title: 'The Instagram Radiant Horizon',
      tag: 'Hyper-Saturated Sunset Mesh',
      desc: 'Instagram-inspired sunset-to-ocean gradient mesh with a camera-smooth optical white rounded U loop.'
    },
    {
      id: 25,
      category: 'titan',
      brand: 'Microsoft Teams',
      file: 'option25.svg',
      title: 'The Microsoft Teams Dual-Shield',
      tag: 'Fluent 3D Layered Tiles',
      desc: 'Layered two-tone isometric depth tiles with Fluent volumetric glass drop-shadows.'
    },
    {
      id: 26,
      category: 'titan',
      brand: 'Spotify',
      file: 'option26.svg',
      title: 'The Spotify Sonic Waveform',
      tag: 'Harmonic Frequency Waves',
      desc: 'Obsidian black field with 3 concentric soundwave telemetry arcs in electric neon blue and cyan.'
    },
    {
      id: 27,
      category: 'titan',
      brand: 'Airbnb',
      file: 'option27.svg',
      title: 'The Airbnb Bélo Continuum',
      tag: 'Fluid Human Connection Loop',
      desc: 'Single, uninterrupted fluid loop expressing human connection and an unmistakable modern U.'
    },
    {
      id: 28,
      category: 'titan',
      brand: 'Slack',
      file: 'option28.svg',
      title: 'The Slack Quad-Node Grid',
      tag: 'Modular Collaborative Swarm',
      desc: '4-color modular pill and teardrop geometry arranged into an interlocking, buoyant U communication matrix.'
    },
    {
      id: 29,
      category: 'titan',
      brand: 'GitHub',
      file: 'option29.svg',
      title: 'The GitHub Terminal Monolith',
      tag: 'Developer Craft & Negative Space',
      desc: 'Monolithic obsidian dark squircle with razor-sharp negative space carved U glyph and cyan cursor.'
    },
    {
      id: 30,
      category: 'titan',
      brand: 'Discord',
      file: 'option30.svg',
      title: 'The Discord Blurple Neo-Pop',
      tag: 'Tactile 3D Blurple Capsule',
      desc: 'Tactile 3D blurple squircle with beveled specular highlights, twin expressive optic nodes, and friendly U crest.'
    },

    // =======================================================================
    // --- SET 2: Iconic Global Brand Inspired (Options 11–20) ---
    // =======================================================================
    {
      id: 11,
      category: 'brand',
      brand: 'Linear',
      file: 'option11.svg',
      title: 'The Linear Monolith',
      tag: 'Craft & Precision Telemetry',
      desc: 'Obsidian prism with 45° telemetry gridlines and an electric cyan vector U glyph.'
    },
    {
      id: 12,
      category: 'brand',
      brand: 'Apple',
      file: 'option12.svg',
      title: 'The Superellipse Craft',
      tag: 'Continuous Curvature Squircle',
      desc: 'Inspired by Dieter Rams industrial philosophy and Cupertino squircle geometry.'
    },
    {
      id: 13,
      category: 'brand',
      brand: 'Porsche',
      file: 'option13.svg',
      title: 'The Aerodynamic Chisel',
      tag: '10° Forward Rake Speedline',
      desc: 'Dynamic aerodynamic rake with chiseled speed-slots and electric azure wingtips.'
    },
    {
      id: 14,
      category: 'brand',
      brand: 'Stripe',
      file: 'option14.svg',
      title: 'The Prismatic Gradient Flow',
      tag: 'Refractive Velocity Planes',
      desc: 'Overlapping refractive gradient curves spanning cyan, cobalt, and electric violet.'
    },
    {
      id: 15,
      category: 'brand',
      brand: 'OpenAI',
      file: 'option15.svg',
      title: 'The Radial Neural Knot',
      tag: 'Recursive Intelligence Loop',
      desc: 'Continuous topological torus curve anchored around an enlightened nexus core.'
    },
    {
      id: 16,
      category: 'brand',
      brand: 'YSL',
      file: 'option16.svg',
      title: 'The Haute Couture Monogram',
      tag: 'Parisian Intertwined Ligature',
      desc: 'Interlocked U and B silhouette crafted with hairline negative cuts in polished platinum.'
    },
    {
      id: 17,
      category: 'brand',
      brand: 'Nike',
      file: 'option17.svg',
      title: 'The Kinetic Velocity Sweep',
      tag: 'Aerodynamic Variable Stroke',
      desc: 'Supersonic variable-weight blade carving forward into an electric blue telemetry beacon.'
    },
    {
      id: 18,
      category: 'brand',
      brand: 'Rolex',
      file: 'option18.svg',
      title: 'The Sovereign Guilloché Crest',
      tag: 'Horological Fluted Roundel',
      desc: 'Deep royal blue sunburst dial with an outer 24-facet gold fluted bezel.'
    },
    {
      id: 19,
      category: 'brand',
      brand: 'Teenage Eng',
      file: 'option19.svg',
      title: 'The Modular Industrial Pill',
      tag: 'Tactile Hardware Aesthetic',
      desc: 'Perforated cool gray speaker matrix housing an ultramarine industrial U component.'
    },
    {
      id: 20,
      category: 'brand',
      brand: 'Figma',
      file: 'option20.svg',
      title: 'The Neo-Primitive Emblem',
      tag: 'Geometric Software Primitives',
      desc: 'Pure geometric building blocks: dual rounded pill columns, a semicircle basin, and golden star.'
    },

    // =======================================================================
    // --- SET 1: Refined Geometric & Luxury Monograms (Options 1–10) ---
    // =======================================================================
    {
      id: 1,
      category: 'geometric',
      file: 'option1.svg',
      title: 'Architectural Precision Monogram',
      tag: 'Modern Tech Founder',
      desc: 'Interlocking geometric U monogram with electric gradient contours and central vertical axis.'
    },
    {
      id: 2,
      category: 'geometric',
      file: 'option2.svg',
      title: 'Pure Royal U Modernist',
      tag: 'High-Contrast Executive',
      desc: 'Bold optical white U-curve elevated on a rich sapphire royal blue field.'
    },
    {
      id: 3,
      category: 'geometric',
      file: 'option3.svg',
      title: 'Isometric Hex-Prism (U-B-K)',
      tag: '3D Engineering & Strategy',
      desc: 'A precision-faceted isometric cube where three lit facets carve out the letterform U.'
    },
    {
      id: 4,
      category: 'geometric',
      file: 'option4.svg',
      title: 'Luxury Serif Ligature (UB)',
      tag: 'High-End Editorial Crest',
      desc: 'High-contrast serif monogram in polished platinum with an electric blue dot.'
    },
    {
      id: 5,
      category: 'geometric',
      file: 'option5.svg',
      title: 'Infinite Loop Ribbon (Continuum)',
      tag: 'Agility & Seamless Flow',
      desc: 'Möbius-style interlooping ribbon that forms the U through continuous geometric curvature.'
    },
    {
      id: 6,
      category: 'geometric',
      file: 'option6.svg',
      title: 'Dual Pillar Gateway (Portal)',
      tag: 'Tech + Business Bridge',
      desc: 'Two solid upright architectural pillars cradled by an electric cyan beam.'
    },
    {
      id: 7,
      category: 'geometric',
      file: 'option7.svg',
      title: 'Minimalist Nordic Glyph',
      tag: 'Bauhaus & Swiss Ethos',
      desc: 'Crisp porcelain-white canvas with an obsidian square-stem U and electric blue nucleus.'
    },
    {
      id: 8,
      category: 'geometric',
      file: 'option8.svg',
      title: 'Cybernetic Quantum Knot',
      tag: 'AI & Data Precision',
      desc: 'Glow-vector circuit nodes connected in an illuminated U matrix.'
    },
    {
      id: 9,
      category: 'geometric',
      file: 'option9.svg',
      title: 'Golden Ratio Spiral U',
      tag: 'Sacred Organic Geometry',
      desc: 'Fibonacci golden spiral curving gracefully into a warm amber and gold U basin.'
    },
    {
      id: 10,
      category: 'geometric',
      file: 'option10.svg',
      title: 'Zen Enso Brushmark',
      tag: 'Bespoke Handcrafted Art',
      desc: 'Calligraphic U sweep combining human intuition with modern blue gradient flow.'
    }
  ];

  readonly filteredOptions = computed(() => {
    const f = this.filter();
    if (f === 'color') {
      return this.allOptions.filter(o => o.category === 'color');
    }
    if (f === 'minimal') {
      return this.allOptions.filter(o => o.category === 'minimal');
    }
    if (f === 'titan') {
      return this.allOptions.filter(o => o.category === 'titan');
    }
    if (f === 'brand') {
      return this.allOptions.filter(o => o.category === 'brand');
    }
    if (f === 'geometric') {
      return this.allOptions.filter(o => o.category === 'geometric');
    }
    return this.allOptions;
  });

  setFilter(f: 'color' | 'minimal' | 'titan' | 'brand' | 'geometric' | 'all') {
    this.filter.set(f);
  }
}
