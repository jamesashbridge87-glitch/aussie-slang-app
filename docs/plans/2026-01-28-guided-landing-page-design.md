# Guided Landing Page Flow Design

## Overview
Transform the landing page into a guided experience that walks Instagram visitors through the demo features (audio → flip → practice) before prompting for email signup.

## Goals
- Increase demo engagement (more users try all 3 features)
- Improve conversion to email signup
- Mobile-first experience for Instagram traffic

## Design

### Guided Flow Sequence

1. **Page load**
   - Speaker button has gentle pulse animation
   - Hint below card: "Tap 🔈 to hear it"
   - Practice button at 60% opacity (dimmed but not disabled)

2. **After audio plays**
   - Speaker button stops pulsing
   - Card gets subtle cyan glow border
   - Hint changes: "Now tap the card to see what it means"
   - Progress: ✓ Listen

3. **After card flipped**
   - Card glow fades
   - Practice button goes to 100% opacity with pulse
   - Hint changes: "Your turn! Tap to practice saying it"
   - Progress: ✓ Listen ✓ Flip

4. **After practice completes**
   - Results slide up
   - 500ms pause
   - Auto-scroll to email capture section
   - CTA button shakes once
   - Progress: ✓ Listen ✓ Flip ✓ Speak

### Progress Indicators
- Horizontal row above flashcard
- Three items: 🔈 Listen → 👆 Flip → 🎤 Speak
- States: grey (inactive), cyan with ✓ (complete), white with pulse (current)

### CTA Button Redesign
- Background: Yellow (#FBFF22)
- Text: Dark (#111111)
- Shake animation: 3 wobbles over 0.5s
- Only shakes once per visit after completing practice

### Visual Styling
- Hints: Cyan (#11E8F6), 0.95rem mobile / 1rem desktop
- Pulse: 2s loop, opacity 0.6-1.0
- Transitions: Smooth fade between hint states

### Mobile Optimizations
- Progress indicators: icons only on small screens
- Touch feedback on all interactive elements
- Extra bottom padding for keyboard clearance

### Edge Cases
- User skips steps: Everything still works, hints adapt
- No speech recognition: Demo results shown anyway
- Already scrolled past CTA: Shake only, no scroll
- Page refresh: Flow resets

## Implementation Tasks
1. Add progress indicator HTML/CSS
2. Add hint system with state management
3. Update pulse animations for guided flow
4. Change CTA button to yellow
5. Add auto-scroll after practice
6. Add shake animation trigger
7. Mobile refinements
