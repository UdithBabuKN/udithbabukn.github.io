import fs from 'node:fs';
import path from 'node:path';

const outDir = path.resolve('public/favicons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Complete set of 50 Personal Brand Favicons for "Udith Babu K N"
// Featuring the brand-new SET 5: Premium Distinct Color Palettes (Options 41–50)
const options = [
  // =========================================================================
  // --- SET 5: DISTINCT PREMIUM COLOR IDENTITY (Options 41–50) ---
  // Breaking free from website blue: Hermès Orange, Imperial Jade, Acid Lime,
  // Kyoto Vermilion, Champagne Gold, Tuscan Terracotta, Electric Ultramarine, etc.
  // =========================================================================

  // OPTION 41: The Hermès Lava Flame
  {
    id: 41,
    name: "The Hermès Lava Flame",
    colorName: "Porsche / Hermès Lava Orange",
    subtitle: "High-saturation luxury flame squircle with optical porcelain geometric U and obsidian corner bevel",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#FF5500"/>
  <!-- Razor contrast optical white U with bevel -->
  <path d="M152 144 V292 C152 360 196 400 256 400 C316 400 360 360 360 292 V144 H300 V288 C300 324 282 344 256 344 C230 344 212 324 212 288 V144 Z" fill="#FFFFFF"/>
  <rect x="300" y="144" width="60" height="18" fill="#0A0A0C"/>
</svg>`
  },

  // OPTION 42: The British Racing Emerald
  {
    id: 42,
    name: "The British Racing Emerald",
    colorName: "Imperial Jade & 24K Gold",
    subtitle: "Deep prestige emerald field with a monumental architectural U in warm 24K brushed gold",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#064E3B"/>
  <rect x="22" y="22" width="468" height="468" rx="106" fill="none" stroke="rgba(251,191,36,0.2)" stroke-width="3"/>
  <!-- Pure architectural U in 24K Gold -->
  <path d="M160 144 V284 C160 350 202 392 256 392 C310 392 352 350 352 284 V144" fill="none" stroke="#FBBF24" stroke-width="64" stroke-linecap="round"/>
</svg>`
  },

  // OPTION 43: The Nordic Acid Lime (Brutalist Luxury)
  {
    id: 43,
    name: "The Nordic Acid Lime",
    colorName: "Pitch Obsidian & Neon Citron",
    subtitle: "Pitch black obsidian squircle with an electric acid lime geometric U that demands immediate attention",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#09090B"/>
  <!-- High-voltage acid lime geometric glyph -->
  <path d="M152 144 V288 C152 356 196 396 256 396 C316 396 360 356 360 288 V144" fill="none" stroke="#D4FF00" stroke-width="60" stroke-linecap="square"/>
  <circle cx="256" cy="226" r="22" fill="#D4FF00"/>
</svg>`
  },

  // OPTION 44: The Royal Amethyst & Coral
  {
    id: 44,
    name: "The Royal Amethyst & Coral",
    colorName: "Byzantine Plum & Electric Coral",
    subtitle: "Deep velvet purple-plum squircle with a stark optical white asymmetric U accented in electric coral",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#3B0764"/>
  <!-- Optical White Monolith U -->
  <path d="M156 148 V290 C156 354 198 392 256 392 C314 392 356 354 356 290 V148" fill="none" stroke="#FFFFFF" stroke-width="56" stroke-linecap="round"/>
  <!-- Radiant Coral Apex Dot -->
  <circle cx="356" cy="148" r="18" fill="#F43F5E"/>
</svg>`
  },

  // OPTION 45: The Kyoto Vermilion Seal
  {
    id: 45,
    name: "The Kyoto Vermilion Seal",
    colorName: "Japanese Lacquer Red & Chalk",
    subtitle: "Traditional artisan vermilion crimson field with an immaculate minimalist bone-white geometric U",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#DC2626"/>
  <!-- Chalk white geometric U with balanced horizontal anchor -->
  <path d="M160 148 V286 C160 348 200 388 256 388 C312 388 352 348 352 286 V148" fill="none" stroke="#FFFFFF" stroke-width="60" stroke-linecap="round"/>
  <line x1="160" y1="210" x2="352" y2="210" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" opacity="0.9"/>
</svg>`
  },

  // OPTION 46: The Electric Yves Klein Ultramarine
  {
    id: 46,
    name: "The Yves Klein Monopigment",
    colorName: "International Klein Blue & Porcelain",
    subtitle: "Pure, hypnotic Klein ultramarine pigment on porcelain white, forming an interlocked UB ligature ribbon",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#FFFFFF"/>
  <rect x="20" y="20" width="472" height="472" rx="108" fill="none" stroke="#E2E8F0" stroke-width="3"/>
  <!-- Intense pure Klein Blue U-B Monogram -->
  <path d="M148 144 V292 C148 364 194 402 256 402 C318 402 364 364 364 292 V144" fill="none" stroke="#002FA7" stroke-width="64" stroke-linecap="round"/>
  <path d="M256 144 V390" stroke="#002FA7" stroke-width="20" stroke-linecap="round"/>
</svg>`
  },

  // OPTION 47: The Monaco Champagne & Onyx Ingot
  {
    id: 47,
    name: "The Monaco Titanium Ingot",
    colorName: "Matte Onyx & Champagne Gold",
    subtitle: "Velvet matte dark onyx field with a refined, razor-thin champagne gold titanium U and solitary sphere",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#121214"/>
  <rect x="22" y="22" width="468" height="468" rx="106" fill="none" stroke="rgba(226,212,183,0.18)" stroke-width="2"/>
  <!-- Pure quiet-luxury champagne titanium U -->
  <path d="M164 150 V284 C164 346 202 386 256 386 C310 386 348 346 348 284 V150" fill="none" stroke="#E2D4B7" stroke-width="48" stroke-linecap="round"/>
  <circle cx="256" cy="200" r="16" fill="#E2D4B7"/>
</svg>`
  },

  // OPTION 48: The Aegean Sea & Solar Amber
  {
    id: 48,
    name: "The Aegean Sea & Solar Amber",
    colorName: "Deep Aegean Navy & Solar Amber",
    subtitle: "Deep Mediterranean marine squircle with twin dynamic stems: Arctic cyan left and radiant amber right",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#0C4A6E"/>
  <!-- Left Arctic Cyan Pillar -->
  <rect x="144" y="140" width="56" height="154" rx="8" fill="#38BDF8"/>
  <!-- Right Solar Amber Pillar -->
  <rect x="312" y="140" width="56" height="154" rx="8" fill="#F59E0B"/>
  <!-- Unifying White Foundation Arc -->
  <path d="M144 260 C144 372 368 372 368 260" fill="none" stroke="#FFFFFF" stroke-width="56" stroke-linecap="round"/>
</svg>`
  },

  // OPTION 49: The Tuscan Terracotta & Alabaster
  {
    id: 49,
    name: "The Tuscan Terracotta & Alabaster",
    colorName: "Warm Terracotta & Sandstone Ivory",
    subtitle: "Grounded earthy terracotta squircle with an organic, sculpted ivory U that feels human and intellectual",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#C2410C"/>
  <rect x="20" y="20" width="472" height="472" rx="108" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3"/>
  <!-- Warm ivory sculpted U with generous radius -->
  <path d="M156 148 V286 C156 352 198 392 256 392 C314 392 356 352 356 286 V148" fill="none" stroke="#FFFBEB" stroke-width="62" stroke-linecap="round"/>
</svg>`
  },

  // OPTION 50: The Midnight Mulberry & Electric Teal
  {
    id: 50,
    name: "The Midnight Mulberry & Teal",
    colorName: "Deep Mulberry & Bioluminescent Teal",
    subtitle: "Velvet dark mulberry field with a vivid bioluminescent teal carved U featuring clean negative space air cuts",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="128" fill="#1E0E3D"/>
  <!-- Left Continuous Stem in Electric Teal -->
  <rect x="144" y="140" width="56" height="150" rx="6" fill="#14B8A6"/>
  <!-- Base Sweep in Electric Teal -->
  <path d="M144 260 C144 374 368 374 368 260" fill="none" stroke="#14B8A6" stroke-width="56" stroke-linecap="round"/>
  <!-- Upper Right Stem in Pure White with Negative Space Cut -->
  <rect x="312" y="140" width="56" height="50" rx="6" fill="#FFFFFF"/>
  <rect x="312" y="214" width="56" height="76" rx="6" fill="#14B8A6"/>
</svg>`
  }
];

// Write individual SVG files for options 41-50
for (const opt of options) {
  const filePath = path.join(outDir, `option${opt.id}.svg`);
  fs.writeFileSync(filePath, opt.svg.trim());
  console.log(`Saved option${opt.id}.svg`);
}

console.log("All 10 distinct premium color options generated successfully!");
