# CTA Banners Design: Course & Telegram Bot

**Date:** 2026-01-28
**Purpose:** Add persistent CTAs to convert app users into course buyers and Telegram bot subscribers

## Context

The Aussie Slang App is being used as a lead magnet delivered via ManyChat Instagram DM automation. Email capture happens in ManyChat before the app link is sent.

The app needs CTAs to:
1. Drive course sales
2. Get users into the Telegram bot (which nurtures toward community/offers)

## Core Message

> "Fit in and feel confident at work"

This is the transformation the course delivers — social/emotional outcome.

## Links

| CTA | URL |
|-----|-----|
| Course | https://superprofile.bio/course/youraussieuncle-workplace |
| Telegram Bot | https://t.me/YourAussieUncle_Bot |

## Design

### Header Banner

Slim bar above existing header with both CTAs side by side:

```
┌─────────────────────────────────────────────────────────┐
│  🎓 Get the Full Course    │    💬 Chat with Uncle     │
└─────────────────────────────────────────────────────────┘
│  [existing header: logo, streak, XP, level, sound]     │
```

### Sticky Footer

Action-oriented footer at bottom of screen:

```
┌─────────────────────────────────────────────────────────┐
│  Ready to fit in at your Aussie workplace?             │
│           [Get the Course]  [Chat with Uncle]          │
└─────────────────────────────────────────────────────────┘
```

### Styling

| Element | Style |
|---------|-------|
| Course button | Pink (#FF65BE), filled |
| Telegram button | Cyan (#11E8F6), filled |
| Background | Dark/black to match app |
| Footer height | ~60px |

### Mobile Adjustments

- **Header:** Icons only (🎓 💬) with tooltips to save space
- **Footer:** Full text, buttons stack vertically if needed
- Both bars always visible, not dismissible

### Behavior

- Links open in new tab (`target="_blank"`)
- Hover: subtle brightness increase
- No JavaScript required — static links only

## Files to Modify

| File | Changes |
|------|---------|
| `index.html` | Add header banner div + footer bar div |
| `css/styles.css` | Styles for both bars, mobile responsiveness |

## HTML Structure

```html
<!-- Top banner (after <body>, before existing header) -->
<div class="promo-banner">
  <a href="https://superprofile.bio/course/youraussieuncle-workplace" target="_blank" class="promo-btn course-btn">
    🎓 Get the Full Course
  </a>
  <a href="https://t.me/YourAussieUncle_Bot" target="_blank" class="promo-btn chat-btn">
    💬 Chat with Uncle
  </a>
</div>

<!-- Sticky footer (before </body>) -->
<footer class="promo-footer">
  <span class="promo-footer-text">Ready to fit in at your Aussie workplace?</span>
  <div class="promo-footer-btns">
    <a href="https://superprofile.bio/course/youraussieuncle-workplace" target="_blank" class="promo-btn course-btn">Get the Course</a>
    <a href="https://t.me/YourAussieUncle_Bot" target="_blank" class="promo-btn chat-btn">Chat with Uncle</a>
  </div>
</footer>
```

## CSS Considerations

- `position: sticky` or `fixed` for footer
- `padding-bottom` on body to prevent footer covering content
- `@media` queries for mobile icon-only header
- `z-index` to ensure bars stay above content
