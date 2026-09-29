# SpendWise - Budget Tracker

SpendWise is a dynamic web application designed to help users track, organize, and manage their personal finances. This repository contains the JavaScript foundation that powers data collection, financial calculations, and itemized budget analysis.

---

## What SpendWise Does

SpendWise allows users to:
1. Define a monthly budget baseline.
2. Track itemized spending across core categories (such as Food, Rent, Transport, Utilities, and Entertainment).
3. Compute total accumulated expenses, remaining balance, and percentage of budget used.
4. Output structured, easy-to-read financial diagnostics into the browser developer console and application interface.

---

## JavaScript Concepts Implemented

The application core leverages fundamental JavaScript concepts to build a interactive system:

- **Variables & Data Types**: Storing strings, numbers, booleans, arrays, and objects.
- **User Input Collection**: Interacting with users using `prompt()` and `confirm()` dialogs, as well as form fields.
- **Calculations & Math Operations**: Computing balances, cumulative sums, and budget usage percentages.
- **Functions & Reusability**: Breaking down code logic into modular, reusable functional blocks.
- **Console Logging & Formatting**: Rendering clear console outputs using warning alerts, tabular formatting, and clear text labels.

---

## How Key Features Work

### 1. Variables Usage
Variables hold dynamic states across the lifetime of the application session:
- **`totalBudget`** (*Number*): Stores the master budget amount set by the user.
- **`expensesList`** (*Array of Objects*): Holds structured expense entries containing `name` and `amount`.
- **`currencySymbol`** (*String*): Defines currency display formatting (`$`).

### 2. User Input Collection
User input is collected through interactive JavaScript browser prompts (`prompt()`) that ask for budget allocations and expense entries. Inputs are cleaned using `parseFloat()` to convert string inputs into numerical values for processing.

### 3. Calculations Performed
- **Total Expenses Calculation**: Iterates over `expensesList` to sum all categorical spending.
$$\text{Total Expenses} = \sum \text{Expense Amounts}$$
- **Remaining Balance**: Subtracts total expenses from total budget.
$$\text{Remaining Balance} = \text{Total Budget} - \text{Total Expenses}$$
- **Budget Usage Percentage**: Calculates the portion of budget spent.
$$\text{Usage \%} = \left( \frac{\text{Total Expenses}}{\text{Total Budget}} \right) \times 100$$

### 4. Code Organization with Functions
Functions divide the logic into organized responsibilities:
- `calculateTotalExpenses()`: Sums expenditure data.
- `calculateRemainingBalance(budget, expenses)`: Computes available funds.
- `calculateUsagePercentage(budget, expenses)`: Converts financial numbers into percentages.
- `addExpense(name, amount)`: Handles validation and insertion of new items.
- `displayFinancialReport()`: Formats and outputs structured data to `console.log`.

---

## File Structure

```text
spendwise/
│
├── index.html     # Page layout and structure
├── style.css      # Custom CSS styling and responsive layout
├── script.js     # JavaScript logic, calculations, & user prompts
└── README.md      # Project documentation