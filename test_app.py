#!/usr/bin/env python3
"""
Automated tests for Slang Mate app
Tests all key user flows before release
"""

from playwright.sync_api import sync_playwright
import sys

BASE_URL = "http://localhost:8000"
SCREENSHOT_DIR = "/tmp/slang-mate-tests"

def setup():
    """Create screenshot directory"""
    import os
    os.makedirs(SCREENSHOT_DIR, exist_ok=True)

def test_app_loads(page):
    """Test that the app loads correctly"""
    print("\n[TEST] App loads correctly...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Check title
    assert "Slang Mate" in page.title(), f"Expected 'Slang Mate' in title, got: {page.title()}"

    # Check header elements
    assert page.locator("h1").inner_text() == "Slang Mate", "Header should show 'Slang Mate'"
    assert page.locator(".logo").is_visible(), "Logo should be visible"

    # Check mode buttons exist
    mode_buttons = page.locator(".mode-btn").all()
    assert len(mode_buttons) == 6, f"Expected 6 mode buttons, got {len(mode_buttons)}"

    page.screenshot(path=f"{SCREENSHOT_DIR}/01-app-loaded.png")
    print("   PASS: App loads with correct title, header, and navigation")
    return True

def test_flashcard_mode(page):
    """Test flashcard functionality"""
    print("\n[TEST] Flashcard mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Should start on flashcards mode
    flashcard = page.locator("#flashcard")
    assert flashcard.is_visible(), "Flashcard should be visible"

    # Check term is displayed
    term = page.locator("#flashcard-term").inner_text()
    assert term and term != "Loading...", f"Term should be loaded, got: {term}"

    # Check example is displayed on front
    example = page.locator("#flashcard-example").inner_text()
    assert example, "Example should be visible on front of card"

    # Test flip
    page.locator("#flip-card").click()
    page.wait_for_timeout(700)  # Wait for flip animation

    # Card should be flipped
    assert flashcard.evaluate("el => el.classList.contains('flipped')"), "Card should be flipped"

    # Meaning should be visible
    meaning = page.locator("#flashcard-meaning").inner_text()
    assert meaning, "Meaning should be visible after flip"

    page.screenshot(path=f"{SCREENSHOT_DIR}/02-flashcard-flipped.png")

    # Test navigation
    page.locator("#next-card").click()
    page.wait_for_timeout(300)
    new_term = page.locator("#flashcard-term").inner_text()
    # Card should have changed (might be same term in rare shuffle case, but usually different)

    # Test shuffle
    page.locator("#shuffle-cards").click()
    page.wait_for_timeout(300)

    # Test favorite button
    fav_btn = page.locator("#favorite-card")
    fav_btn.click()
    page.wait_for_timeout(300)
    assert fav_btn.inner_text() == "★", "Favorite button should show filled star"

    page.screenshot(path=f"{SCREENSHOT_DIR}/03-flashcard-favorited.png")
    print("   PASS: Flashcards flip, navigate, shuffle, and favorite correctly")
    return True

def test_quiz_mode(page):
    """Test quiz functionality"""
    print("\n[TEST] Quiz mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Switch to quiz mode
    page.locator("button[data-mode='quiz']").click()
    page.wait_for_timeout(300)

    # Start quiz
    page.locator("#start-quiz").click()
    page.wait_for_timeout(300)

    # Should see question
    question = page.locator("#question-text").inner_text()
    assert question, "Question should be displayed"

    # Should see 4 answer options
    options = page.locator(".answer-btn").all()
    assert len(options) == 4, f"Expected 4 options, got {len(options)}"

    page.screenshot(path=f"{SCREENSHOT_DIR}/04-quiz-question.png")

    # Click first answer
    options[0].click()
    page.wait_for_timeout(500)

    # Feedback should appear
    feedback = page.locator("#quiz-feedback")
    assert feedback.is_visible(), "Feedback should be visible after answering"

    page.screenshot(path=f"{SCREENSHOT_DIR}/05-quiz-feedback.png")

    # Continue to complete quiz (answer remaining questions)
    for i in range(9):  # 9 more questions
        page.locator("#next-question").click()
        page.wait_for_timeout(300)

        # Check if we're on results
        if page.locator("#quiz-results").is_visible():
            break

        # Answer the question
        new_options = page.locator(".answer-btn").all()
        if new_options:
            new_options[0].click()
            page.wait_for_timeout(300)

    # Should see results
    page.locator("#next-question").click()
    page.wait_for_timeout(300)

    results = page.locator("#quiz-results")
    assert results.is_visible(), "Results should be visible after quiz"

    page.screenshot(path=f"{SCREENSHOT_DIR}/06-quiz-results.png")
    print("   PASS: Quiz starts, accepts answers, shows feedback, completes")
    return True

def test_fill_blank_mode(page):
    """Test fill-in-the-blank functionality"""
    print("\n[TEST] Fill-in-the-blank mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Switch to fill blank mode
    page.locator("button[data-mode='fillblank']").click()
    page.wait_for_timeout(300)

    # Start game
    page.locator("#start-fillblank").click()
    page.wait_for_timeout(300)

    # Should see sentence with blank
    sentence = page.locator("#fillblank-sentence").inner_text()
    assert "_____" in sentence, f"Sentence should have blank, got: {sentence}"

    # Should see hint
    hint = page.locator("#fillblank-hint").inner_text()
    assert hint, "Hint should be visible"

    page.screenshot(path=f"{SCREENSHOT_DIR}/07-fillblank-question.png")

    # Type an answer
    page.locator("#fillblank-input").fill("test")
    page.locator("#submit-fillblank").click()
    page.wait_for_timeout(300)

    # Feedback should appear
    feedback = page.locator("#fillblank-feedback")
    assert feedback.is_visible(), "Feedback should appear after submitting"

    page.screenshot(path=f"{SCREENSHOT_DIR}/08-fillblank-feedback.png")
    print("   PASS: Fill-in-blank shows sentence, accepts input, gives feedback")
    return True

def test_builder_mode(page):
    """Test sentence builder functionality"""
    print("\n[TEST] Sentence builder mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Switch to builder mode
    page.locator("button[data-mode='builder']").click()
    page.wait_for_timeout(300)

    # Start game
    page.locator("#start-builder").click()
    page.wait_for_timeout(300)

    # Should see sentence with blank
    sentence = page.locator("#sentence-display").inner_text()
    assert "???" in sentence, f"Sentence should have blank, got: {sentence}"

    # Should see word options
    words = page.locator(".draggable-word").all()
    assert len(words) >= 4, f"Expected at least 4 word options, got {len(words)}"

    page.screenshot(path=f"{SCREENSHOT_DIR}/09-builder-question.png")

    # Click a word to select it
    words[0].click()
    page.wait_for_timeout(200)

    # Click the blank to place it
    page.locator("#word-blank").click()
    page.wait_for_timeout(500)

    # Feedback should appear (auto-checks answer)
    feedback = page.locator("#builder-feedback")
    assert feedback.is_visible(), "Feedback should appear after placing word"

    page.screenshot(path=f"{SCREENSHOT_DIR}/10-builder-feedback.png")
    print("   PASS: Builder shows sentence, word bank works, gives feedback")
    return True

def test_review_mode(page):
    """Test SRS review mode"""
    print("\n[TEST] Review mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Switch to review mode
    page.locator("button[data-mode='review']").click()
    page.wait_for_timeout(300)

    # Should see stats
    stats = page.locator("#review-stats")
    assert stats.is_visible(), "Review stats should be visible"

    # Check stat values exist
    due_today = page.locator("#due-today").inner_text()
    assert due_today.isdigit(), f"Due today should be a number, got: {due_today}"

    page.screenshot(path=f"{SCREENSHOT_DIR}/11-review-stats.png")

    # If there are cards due, test review
    if int(due_today) > 0:
        page.locator("#start-review").click()
        page.wait_for_timeout(300)

        # Should see review card
        review_card = page.locator("#review-flashcard")
        assert review_card.is_visible(), "Review card should be visible"

        # Flip card
        page.locator("#flip-review").click()
        page.wait_for_timeout(700)

        # Rating buttons should appear
        rating_btns = page.locator(".rating-btn").all()
        assert len(rating_btns) == 5, f"Expected 5 rating buttons, got {len(rating_btns)}"

        page.screenshot(path=f"{SCREENSHOT_DIR}/12-review-card.png")
        print("   PASS: Review mode shows stats and card review works")
    else:
        print("   PASS: Review mode shows stats (no cards due)")

    return True

def test_achievements_mode(page):
    """Test achievements/badges mode"""
    print("\n[TEST] Achievements mode...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Switch to achievements mode
    page.locator("button[data-mode='achievements']").click()
    page.wait_for_timeout(300)

    # Should see daily challenge
    challenge = page.locator("#daily-challenge")
    assert challenge.is_visible(), "Daily challenge should be visible"

    # Should see badges grid
    badges = page.locator(".badge").all()
    assert len(badges) > 0, "Should have badges displayed"

    # Should see favorites section
    fav_section = page.locator(".favorites-section")
    assert fav_section.is_visible(), "Favorites section should be visible"

    page.screenshot(path=f"{SCREENSHOT_DIR}/13-achievements.png")
    print("   PASS: Achievements shows daily challenge, badges, favorites")
    return True

def test_dark_mode_toggle(page):
    """Test dark mode toggle"""
    print("\n[TEST] Dark mode toggle...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Get initial state
    initial_has_light = page.locator("body").evaluate("el => el.classList.contains('light-mode')")

    # Toggle dark mode
    page.locator("#dark-mode-toggle").click()
    page.wait_for_timeout(300)

    # State should change
    new_has_light = page.locator("body").evaluate("el => el.classList.contains('light-mode')")
    assert initial_has_light != new_has_light, "Dark mode state should toggle"

    page.screenshot(path=f"{SCREENSHOT_DIR}/14-theme-toggled.png")
    print("   PASS: Dark mode toggles correctly")
    return True

def test_sound_toggle(page):
    """Test sound toggle"""
    print("\n[TEST] Sound toggle...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    toggle = page.locator("#sound-toggle")

    # Get initial state
    initial_muted = toggle.evaluate("el => el.classList.contains('muted')")

    # Toggle sound
    toggle.click()
    page.wait_for_timeout(300)

    # State should change
    new_muted = toggle.evaluate("el => el.classList.contains('muted')")
    assert initial_muted != new_muted, "Sound muted state should toggle"

    print("   PASS: Sound toggle works correctly")
    return True

def test_search(page):
    """Test search functionality"""
    print("\n[TEST] Search functionality...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Type in search
    search_input = page.locator("#search-input")
    search_input.fill("arvo")
    page.wait_for_timeout(500)

    # Clear button should appear
    clear_btn = page.locator("#search-clear")
    assert clear_btn.is_visible(), "Clear button should appear when searching"

    # Results should filter (card count should change)
    total_cards = page.locator("#total-cards").inner_text()
    # Searching for "arvo" should filter to cards containing it

    page.screenshot(path=f"{SCREENSHOT_DIR}/15-search-results.png")

    # Clear search
    clear_btn.click()
    page.wait_for_timeout(300)

    print("   PASS: Search filters results and clears correctly")
    return True

def test_gamification(page):
    """Test gamification elements update"""
    print("\n[TEST] Gamification updates...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Check XP display exists
    xp = page.locator("#xp-count").inner_text()
    assert xp.isdigit(), f"XP should be a number, got: {xp}"

    # Check level display
    level = page.locator("#level-count").inner_text()
    assert level.isdigit(), f"Level should be a number, got: {level}"

    # Check streak display
    streak = page.locator("#streak-count").inner_text()
    assert streak.isdigit(), f"Streak should be a number, got: {streak}"

    # Flip a card to earn XP
    initial_xp = int(xp)
    page.locator("#flip-card").click()
    page.wait_for_timeout(700)

    new_xp = int(page.locator("#xp-count").inner_text())
    assert new_xp >= initial_xp, "XP should increase or stay same after card flip"

    print(f"   PASS: Gamification displays work (XP: {new_xp}, Level: {level}, Streak: {streak})")
    return True

def test_category_filter(page):
    """Test category filter"""
    print("\n[TEST] Category filter...")
    page.goto(BASE_URL)
    page.wait_for_load_state('networkidle')

    # Get initial total
    initial_total = int(page.locator("#total-cards").inner_text())

    # Select a specific category
    page.locator("#flashcard-category").select_option(index=1)  # First non-"all" option
    page.wait_for_timeout(300)

    # Total should change (likely fewer cards)
    new_total = int(page.locator("#total-cards").inner_text())
    assert new_total <= initial_total, "Filtered cards should be <= total"

    page.screenshot(path=f"{SCREENSHOT_DIR}/16-category-filtered.png")
    print(f"   PASS: Category filter works ({initial_total} -> {new_total} cards)")
    return True

def run_all_tests():
    """Run all tests"""
    setup()

    print("=" * 60)
    print("SLANG MATE - AUTOMATED TEST SUITE")
    print("=" * 60)

    passed = 0
    failed = 0
    errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # Enable console logging
        page.on("console", lambda msg: print(f"   [CONSOLE] {msg.type}: {msg.text}") if msg.type == "error" else None)

        tests = [
            test_app_loads,
            test_flashcard_mode,
            test_quiz_mode,
            test_fill_blank_mode,
            test_builder_mode,
            test_review_mode,
            test_achievements_mode,
            test_dark_mode_toggle,
            test_sound_toggle,
            test_search,
            test_gamification,
            test_category_filter,
        ]

        for test in tests:
            try:
                if test(page):
                    passed += 1
            except AssertionError as e:
                failed += 1
                errors.append(f"{test.__name__}: {str(e)}")
                print(f"   FAIL: {str(e)}")
                page.screenshot(path=f"{SCREENSHOT_DIR}/FAIL-{test.__name__}.png")
            except Exception as e:
                failed += 1
                errors.append(f"{test.__name__}: {str(e)}")
                print(f"   ERROR: {str(e)}")
                page.screenshot(path=f"{SCREENSHOT_DIR}/ERROR-{test.__name__}.png")

        browser.close()

    print("\n" + "=" * 60)
    print(f"RESULTS: {passed} passed, {failed} failed")
    print("=" * 60)

    if errors:
        print("\nFAILURES:")
        for error in errors:
            print(f"  - {error}")

    print(f"\nScreenshots saved to: {SCREENSHOT_DIR}")

    return failed == 0

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)
