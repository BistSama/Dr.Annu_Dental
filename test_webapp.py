from playwright.sync_api import sync_playwright
import os

html_file_path = os.path.abspath('index.html')
file_url = f'file://{html_file_path}'

print(f"Testing URL: {file_url}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto(file_url)

    # 1. Test Title (SEO Check)
    title = page.title()
    print(f"Title: {title}")
    assert "Best Dentist in Sambalpur" in title, "Title does not match SEO optimized title"

    # 2. Test Hero Title (H1 Check)
    h1 = page.locator('h1.hero-title').inner_text()
    print(f"H1: {h1}")
    assert "Dentist" in h1, "H1 does not contain 'Dentist'"

    # 3. Test FAQ Accordion (Accessibility/Functionality Check)
    faq_button = page.locator('.faq-q').first
    
    # Assert initial state
    print(f"Initial FAQ ARIA expanded: {faq_button.get_attribute('aria-expanded')}")
    assert faq_button.get_attribute('aria-expanded') == 'false', "FAQ should be closed initially"
    
    # Click and wait for state change
    faq_button.click()
    page.wait_for_timeout(300) # Wait for animation/js
    
    print(f"After click FAQ ARIA expanded: {faq_button.get_attribute('aria-expanded')}")
    assert faq_button.get_attribute('aria-expanded') == 'true', "FAQ should be open after click"

    # Take screenshot of the result
    screenshot_path = os.path.abspath('test_result.png')
    page.screenshot(path=screenshot_path, full_page=True)
    print(f"Screenshot saved to: {screenshot_path}")

    browser.close()

print("All tests passed successfully!")
