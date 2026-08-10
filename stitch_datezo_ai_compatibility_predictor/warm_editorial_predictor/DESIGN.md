---
name: Warm Editorial Predictor
colors:
  surface: '#fdf9f6'
  surface-dim: '#ddd9d7'
  surface-bright: '#fdf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f0'
  surface-container: '#f1edea'
  surface-container-high: '#ebe7e5'
  surface-container-highest: '#e5e2df'
  on-surface: '#1c1b1a'
  on-surface-variant: '#544243'
  inverse-surface: '#31302f'
  inverse-on-surface: '#f4f0ed'
  outline: '#877273'
  outline-variant: '#dac1c1'
  surface-tint: '#98434d'
  primary: '#98434d'
  on-primary: '#ffffff'
  primary-container: '#f28b94'
  on-primary-container: '#6e232e'
  inverse-primary: '#ffb2b7'
  secondary: '#a33a46'
  on-secondary: '#ffffff'
  secondary-container: '#fe7f8a'
  on-secondary-container: '#741626'
  tertiary: '#5f5e5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#aaa8a8'
  on-tertiary-container: '#3e3d3d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b7'
  on-primary-fixed: '#40010e'
  on-primary-fixed-variant: '#7a2c36'
  secondary-fixed: '#ffdada'
  secondary-fixed-dim: '#ffb2b6'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#842231'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#fdf9f6'
  on-background: '#1c1b1a'
  surface-variant: '#e5e2df'
typography:
  display-lg:
    fontFamily: Nunito Sans
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '900'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.3'
  title-lg:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Nunito Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  section-gap: 80px
---

## Brand & Style

This design system establishes a personality that is **human, optimistic, and intellectually transparent**. It bridges the gap between complex machine learning and the intimate nature of dating through an editorial narrative style. The aesthetic rejects the cold, "black-box" nature of typical AI, opting instead for a **handcrafted, sticker-inspired** visual language.

The visual direction is a blend of **Modern Editorial and Neo-Brutalist Minimalism**. It uses high-contrast ink outlines, flat-vector illustrations, and a warm paper-like foundation to evoke the feeling of a high-end magazine or a boutique printed journal. Key traits include:
- **Playful Rigor:** Precise data visualization presented with charming, rounded geometry.
- **Tactile Flatness:** Physicality is achieved not through depth or gradients, but through "hard" offset shadows and thick strokes.
- **Narrative Flow:** Large, expressive typography and generous whitespace guide the user through the "story" of their data.

## Colors

The color palette is designed to feel "sun-drenched" and organic. 

- **Surface:** The base uses a warm off-white (#FFFBF8) instead of pure white to reduce eye strain and maintain a vintage paper quality.
- **Accents:** The Coral (#F28B94) is the primary driver of action, representing energy and connection.
- **Pastels:** These are used functionally to categorize different data signals (e.g., Blue for basic info, Yellow for signals, Green for ratings). They should always be paired with a 1px Ink border.
- **Ink:** Pure Black (#1A1A1A) is used for all structural elements, including borders, text, and hard shadows, providing the "comic-book" or "sticker" definition.

## Typography

This design system uses **Nunito Sans** exclusively to maintain a cohesive, friendly, and approachable tone. The "Extra Bold" and "Black" weights are essential for the editorial feel.

- **Headlines:** Should use the heaviest weights (800-900). Use "Headline-Accent" styling where a single word within a black headline is colored in Coral (#F28B94) to draw attention.
- **Scale:** Maintain high contrast between display type and body copy. 
- **Readability:** Body text uses a generous 1.6 line-height to maintain the "magazine" feel and ensure data explanations are easy to digest.
- **Labels:** Always uppercase with slight tracking (letter spacing) when used for categories or small metadata.

## Layout & Spacing

The layout philosophy follows a **Modular Editorial Grid**. Content is organized into distinct color-blocked sections or "Sticker Cards."

- **Grid:** Use a 12-column fluid grid for desktop with 24px gutters. Elements should often span 4, 6, or 8 columns to create asymmetrical, editorial-style compositions.
- **Whitespace:** Use aggressive vertical spacing (Section Gaps) to allow the "sticker" elements to breathe. Content should never feel cramped.
- **Color Blocking:** Use the pastel palette to create full-bleed background sections that transition between different stages of the user journey.
- **Alignment:** While text is generally left-aligned for readability, featured "Insight Cards" can use center-alignment for impact.

## Elevation & Depth

This system avoids soft shadows and blurs. Depth is communicated through **Structural Offsets**:

- **The Hard Shadow:** Interactive elements and cards use a solid, 100% opacity Ink (#1A1A1A) shadow.
- **Default Offset:** 4px down and 4px right for small elements (buttons, chips).
- **Sticker Offset:** 8px down and 8px right for primary cards and large containers.
- **Zero-State:** Non-interactive background blocks have no shadow, only the 1px Ink border.
- **Active State:** When a button or card is pressed, the offset should reduce to 0px or 2px, simulating the physical "pushing" of a button into the page.

## Shapes

The shape language is **"Rounded-Geometric."** It mimics the die-cut edges of physical stickers.

- **Primary Radius:** 8px (0.5rem) for most cards, inputs, and containers.
- **Button Radius:** Use "Pill" shapes (rounded-full) for primary CTA buttons to contrast against the more rectangular cards.
- **Borders:** Every container must have a consistent 1px solid Ink (#1A1A1A) border.
- **Iconography:** Icons should use a consistent stroke weight (1.5px or 2px) with rounded caps and joins to match the typography.

## Components

### Buttons
- **Primary:** Pill-shaped, Coral (#F28B94) background, Ink border, 4px hard offset shadow. White text.
- **Secondary:** Pill-shaped, Warm Off-White background, Ink border, 4px hard offset shadow. Ink text.
- **Icon Buttons:** Circular with the same border/shadow rules.

### Sticker Cards
- White background, 1px Ink border, 8px hard offset shadow.
- Header area of the card can have a pastel background color to denote category.

### Input Fields
- Rectangular with 8px radius. 1px Ink border. No shadow by default; on focus, add a 4px pastel shadow (matching the section's theme).

### Data Visualizations
- **Progress Bars:** Flat, thick bars with Ink borders. The "fill" should use a high-contrast pastel (e.g., Pink for match probability).
- **Match Score:** Displayed in the largest display font, often centered in a "Sticker Card" with a "Verified" badge.

### Chips & Tags
- Small, pill-shaped elements with pastel backgrounds and 1px borders. Used for dater attributes like "Shared Interests" or "Lifestyle."

### Prediction Indicators
- Use illustrated "Signals" (Plus/Minus icons) inside small pastel circles to explain ML weights. Green for positive impact, Yellow/Orange for negative impact.