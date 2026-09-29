# SpendWise - Interactive Budget Tracker

SpendWise is a dynamic personal finance application built to help users manage, record, and track their monthly expenditures efficiently. This week, SpendWise was converted into an interactive, real-time application powered by DOM manipulation, event handling, loops, arrays, and conditional decision-making logic.

---

## What Improvements Were Made to SpendWise

1. **Dynamic DOM Rendering**: Replaced static placeholders with JavaScript-generated expense cards and live list items that update automatically whenever data changes.
2. **Interactive Expense Manager**: Integrated a user form to add new expenses in real-time, along with a dynamic **Delete** button next to each entry to remove expenses instantly.
3. **Sidebar Tab Navigation**: Added smooth event-driven navigation allowing users to switch views between **Dashboard**, **Expenses**, **Reports**, and **Settings** without page reloads.
4. **Conditional Budget Warnings**: Added conditional evaluation logic that alerts users in the developer console and interface when their spending exceeds their budget limit.
5. **Embedded YouTube Education**: Embedded a responsive 16:9 budgeting video within the **Budgeting Tips** section.

---

## Technical Implementations

### 1. Conditionals
Conditionals evaluate data inputs, array boundaries, and budgeting states:
- **Input Validation**: Checks if entered values are non-empty and numerical (`!isNaN(parsedAmount)`).
- **Empty Array Handling**: Checks if `expensesList.length === 0` to display a fallback message.
- **Budget Status Evaluation**:
```javascript
if (remainingBalance < 0) {
    console.warn("STATUS WARNING: You have exceeded your allocated budget!");
} else if (remainingBalance === 0) {
    console.log("STATUS NOTICE: You have reached your exact budget limit.");
} else {
    console.log("STATUS OK: You are within your budget limits.");
}