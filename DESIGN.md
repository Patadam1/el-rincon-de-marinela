---
name: El Rincón de Marinela
description: The bar counter and its coasters. Burgers de ciudad, cocina de casa.
colors:
  counter: "#1d3a2d"
  counter-deep: "#142a20"
  on-counter: "#f4efe3"
  on-counter-muted: "#b4cbbd"
  board: "#f3ecdc"
  board-shade: "#e4d9c1"
  board-edge: "#cdbf9f"
  ink: "#1b2a22"
  ink-soft: "#3e5246"
  sage: "#7e9e8b"
  sage-light: "#c3d6c9"
  nuevo-red: "#c0362a"
  reco-gold: "#7f5a12"
typography:
  display:
    fontFamily: "Abril Fatface, Bodoni 72, Didot, serif"
    fontSize: "clamp(2.7rem, 6vw, 5.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Abril Fatface, Bodoni 72, Didot, serif"
    fontSize: "clamp(2.4rem, 5.2vw, 4.6rem)"
    fontWeight: 400
    lineHeight: 0.98
  title:
    fontFamily: "Abril Fatface, Bodoni 72, Didot, serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 800
    letterSpacing: "0.05em"
    fontVariation: "'wdth' 112"
rounded:
  stamp: "4px"
  card: "16px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
components:
  sachet-primary:
    backgroundColor: "#f8f3e8"
    textColor: "{colors.ink}"
    padding: "11px 30px 12px 34px"
    height: "56px"
  sachet-sage:
    backgroundColor: "#b2cbbb"
    textColor: "{colors.ink}"
  sachet-ghost:
    backgroundColor: "#2c4e3f"
    textColor: "{colors.on-counter}"
  chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
  coaster-face:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
---

# Design System: El Rincón de Marinela

## Overview

**Creative North Star: "La barra del bar"**

The page is a bottle-green formica bar counter. Everything that carries information sits on it the way things sit on a real counter: cardboard beer coasters, sugar sachets and paper napkins. Coasters are cream pulp board printed in two inks (deep green and sage), with a deckled die-cut edge. They drop and spin into place, flip over to show their back, and on desktop you can drag and throw them. Long reading surfaces such as the carta and the visit block are a printed board sheet laid on the counter, never a floating card grid.

The voice is a village bar that does burgers like a chain: confident fat Didone headlines (echoing the logo's "EL RINCÓN"), sturdy variable grotesk labels, and generous dark-green fields. Ornament comes only from the world (printed rims, rim text, stamps, perforated sachet ends), never from gradients, glass or glows.

**Key Characteristics:**
- A green counter as ground, with information printed on cream board objects.
- Two-ink print discipline; colour lives on rims and stamps.
- One motion grammar: objects land, settle, flip.
- Mobile first: a fixed dock keeps Llamar, Cómo llegar and Carta under the thumb.

## Colors

A committed bottle green carries the page. Cream board and two print inks do the talking.

### Primary
- **Bottle Formica** (counter): the ground of every counter section, with a sparse light/dark speckle and a soft overhead lamp falloff. Counter-deep is the body ground and the dock.

### Secondary
- **Sage Print Ink** (sage): the second ink. Used for printed rim rings, the origin ticket "De casa", sachet stripes and chip borders. Sage-light is the accent text on the counter (the second hero line) and the flip pill.

### Neutral
- **Pulp Board** (board): every coaster face, the carta sheet and the visit band. Board-edge is the 1.5px cardboard thickness under each coaster.
- **Deep Green Ink** (ink): all text on board, and the ink-filled "De ciudad" ticket. Ink-soft is secondary print text.
- **Chalk Cream** (on-counter): text on the counter. On-counter-muted is lead and secondary copy on the counter.

### Named Rules
**The Ink Law.** Red (nuevo-red) means only NUEVO and gold (reco-gold) means only RECOMENDADO, as outlined rubber-stamp tags. No other element may use either colour.
**The Rim Rule.** Colour lives at the coaster rim (printed rings, rim text). Reading fields stay dark ink on plain board.

## Typography

**Display Font:** Abril Fatface (with Bodoni 72, Didot, serif)
**Body/Label Font:** Archivo variable, using the width axis 62–125 (with system-ui)

**Character:** The fat Didone echoes the bar's own sign. Archivo set wide and heavy reads like printed coaster copy; set normal it reads like menu text.

### Hierarchy
- **Display** (400, clamp(2.7rem, 6vw, 5.6rem), 0.98): the hero claim only.
- **Headline** (400, clamp(2.4rem, 5.2vw, 4.6rem), 0.98): section titles on the counter and on board.
- **Title** (400, clamp(1.7rem, 2.6vw, 2.3rem), 1): carta categories and coaster titles.
- **Body** (400, 1.0625rem, 1.55): leads and descriptions, max about 46ch.
- **Label** (800, 0.72–0.85rem, 0.05–0.16em, uppercase, wdth 110–120): sachet labels, tickets, datelines, rim text.

### Named Rules
**The Price Rule.** Prices use tabular numerals, weight 800, condensed width (wdth 85), joined to the dish by a dotted leader.

## Layout

Single column of full-bleed bands, with content capped at 1280px and the carta sheet at 1320px. Side gutter: clamp(16px, 4vw, 48px). The hero is a two-column grid at 961px and wider (copy left, coaster table right). Below that it collapses to a centred stack: title, menu coaster, hours and Google coasters side by side, lead, sachets. The coaster field is an absolute scatter at 761px and wider, and a two-column staggered grid below. The carta is CSS columns (2 × 380px min) with a sticky category rack. It wraps at 961px and wider, and scrolls horizontally with an edge fade below. At 760px and narrower a fixed 3-button dock appears, and the body reserves 72px for it.

## Elevation & Depth

Depth is physical: objects on a surface. Coasters cast their shadow through a `filter: drop-shadow` stack, so the deckled mask keeps its silhouette. Faces carry only inset doming (light top-left, faint shade bottom-right). Dragging lifts the shadow. Napkins use a soft two-layer box-shadow. There are no glows and no hard offset shadows.

### Shadow Vocabulary
- **Coaster rest** (`drop-shadow(0 1.5px 0 #cdbf9f) drop-shadow(0 3px 3px rgb(6 18 12/.3)) drop-shadow(0 18px 18px rgb(6 18 12/.38))`): every coaster on the counter.
- **Coaster lifted** (`drop-shadow(0 1.5px 0 #cdbf9f) drop-shadow(0 8px 8px rgb(6 18 12/.3)) drop-shadow(0 40px 34px rgb(6 18 12/.5))`): while dragging.
- **Board sheet** (`0 1.5px 0 #cdbf9f, 0 3px 6px -1px rgb(6 18 12/.35), 0 22px 40px -14px rgb(6 18 12/.6)`): the carta sheet.

## Shapes

Coasters are die-cut: round, or square with 16px corners. Their edge is an authored irregular pulp deckle (`assets/mask-redondo.svg` and `assets/mask-cuadrado.svg`, applied as a mask). Inside sit two printed rings (2px sage at a 4.5% inset, 1px sage at 55% opacity at a 6.6% inset; "De ciudad" coasters use a 3px ink outer ring). Sachets have zig-zag crimped ends drawn with a conic-gradient mask. Stamps are 4px-radius outlined tags rotated -3°. Chips and the flip control are pills.

## Components

### Sachets (buttons)
- **Shape:** sugar packet, crimped zig-zag ends (7px), a 4px print stripe near the left end, min height 56px (42px small).
- **Primary:** cream paper with ink label. **Sage:** sage paper. **Ghost:** dark green paper with cream label (on the counter only).
- **States:** hover lifts 2px and tilts -1.2° (fine pointers only); active scales to 0.97; focus uses the sage-light outline at a 3px offset.

### Coaster (signature)
- **Structure:** coaster → drop (perspective) → tilt → inner (3D flip) → front/back faces.
- **Front:** title in display, origin ticket under it, "desde X €"; optional rotating rim text. A photo fills the face when one exists, with the title on a board band.
- **Back:** a short line of copy, plus a "Ver en la carta" link that appears after the flip.
- **Behaviour:** drops in with spin on view, flips on a real button (`aria-pressed`), tilts toward a fine pointer, and can be dragged and thrown on desktop with frame-rate-independent friction.

### Chips (carta rack)
- **Style:** 2px sage border pill, ink text. **Selected:** ink fill with board text. Selecting one isolates that category and dims the rest to 22% opacity.

### Tickets and stamps
- **Origin tickets:** "De casa" in sage-light on ink; "De ciudad" in ink with board text. **Stamps:** outlined NUEVO in red, RECOMENDADO in gold, PICA as an ink dashed outline.

### Navigation
- Fixed top bar, transparent over the hero. After 35% of a viewport it gains a blurred counter-deep background and the small white logo. On mobile, the nav is replaced by the bottom dock.

## Do's and Don'ts

### Do:
- **Do** put new information on a counter object (coaster, sachet, napkin, board sheet), printed in two inks.
- **Do** keep motion to the landing grammar: drop with spin, settle, flip (overshoot cubic-bezier(0.34, 1.32, 0.5, 1)), with exponential ease-out (cubic-bezier(0.23, 1, 0.32, 1)) for everything else.
- **Do** keep every animated element visible without JS, and give reduced motion fades and crossfades instead of movement.

### Don't:
- **Don't** use red or gold for anything except NUEVO and RECOMENDADO.
- **Don't** draw coasters as plain CSS circles or rounded cards. They always carry the deckle mask and the printed rings.
- **Don't** add glows, gradients on text, glass, or hard offset shadows.
- **Don't** place an eyebrow or kicker label above a heading. Datelines and tickets go after the title.
