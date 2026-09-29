# SpendWise - Interactive Budget Tracker

SpendWise is a dynamic personal finance application built to help users manage, record, and track their monthly expenditures efficiently. This application converts raw data inputs into visual summaries using DOM manipulation, event handling, loops, arrays, and conditional decision-making logic.

---

## What Improvements Were Made to SpendWise

1. **On-Screen Visual Overbudget Warning**: Enhanced user feedback by rendering a live warning banner directly on the dashboard whenever expenses exceed the allocated budget (`remainingBalance < 0`).
2. **Interactive Form Input Handling**: Replaced console/prompt operations with web HTML form fields and event listeners (`e.preventDefault()`) for seamless user interaction without page reloads.
3. **Dynamic DOM Rendering**: Expense records and summary cards are generated and updated live on the webpage whenever items are added or deleted.
4. **Itemized Delete Operations**: Each expense record features a dynamic **Delete** button that updates both the underlying array and screen interface upon user click.
5. **Sidebar View Switching**: Implemented single-page navigation between **Dashboard**, **Expenses**, **Reports**, and **Settings** views.

---

## Technical Implementations

### 1. Conditionals
Conditionals evaluate budget health, array boundaries, and input validity:
- **Direct UI Feedback**: Evaluates `remainingBalance` in `updateUI()` to display green (on budget), yellow (at limit), or red warning alert banners directly on the dashboard.
- **Input Validation**: Ensures names are non-empty and numbers are strictly positive before adding records.
- **Empty Array Handling**: Displays a user-friendly fallback message when the expense array contains no items.

```javascript
if (remainingBalance < 0) {
    // Render dynamic red warning banner on the dashboard
    alertBannerContainer.innerHTML = `<div class="alert-warning">Budget Exceeded!</div>`;
}