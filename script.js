/**
 * SpendWise - Interactive Budget Tracker
 * 
 * Requirements Implemented:
 * 1. Implement Decision Making: Conditional statements evaluate budget state.
 * 2. Work with Multiple Records: Arrays store structured expense objects.
 * 3. Process Data with Loops: `for` loop and `forEach` process records.
 * 4. Update Dashboard Dynamically: DOM manipulation updates cards and list elements.
 * 5. Handle User Interactions: Event listeners handle form submissions and clicks.
 */

// ==========================================
// 1. STORE APPLICATION DATA (Variables & Arrays)
// ==========================================

let totalBudget = 1000;
let userCategory = "General";
let currencySymbol = "$";

// Array storing expense objects
let expensesList = [
    { name: "Food", amount: 120 },
    { name: "Transport", amount: 85 },
    { name: "Rent", amount: 300 },
    { name: "Entertainment", amount: 60 },
    { name: "Savings", amount: 200 },
    { name: "Utilities", amount: 75 }
];


// ==========================================
// 2. PROCESS DATA WITH LOOPS & FUNCTIONS
// ==========================================

/**
 * Uses a loop to calculate total accumulated expenses
 * @returns {number} Sum of all expenses
 */
function calculateTotalExpenses() {
    let total = 0;
    // Loop processing array records
    for (let i = 0; i < expensesList.length; i++) {
        total += Number(expensesList[i].amount);
    }
    return total;
}

/**
 * Calculates remaining balance
 * @param {number} budget - Allocated total budget
 * @param {number} expenses - Calculated total expenses
 * @returns {number} Net balance
 */
function calculateRemainingBalance(budget, expenses) {
    return Number(budget) - Number(expenses);
}

/**
 * Adds an expense item to the array
 */
function addExpense(name, amount) {
    let parsedAmount = parseFloat(amount);
    
    // Conditionals: Validate input parameters
    if (name && !isNaN(parsedAmount) && parsedAmount > 0) {
        expensesList.push({ name: name.trim(), amount: parsedAmount });
        updateUI();
        displayConsoleResults();
        return true;
    }
    return false;
}

/**
 * Deletes an expense item by array index
 */
function deleteExpense(index) {
    // Conditionals: Boundary check
    if (index >= 0 && index < expensesList.length) {
        let removed = expensesList.splice(index, 1);
        console.log(`[-] Removed Expense: ${removed[0].name} (${currencySymbol}${removed[0].amount})`);
        updateUI();
        displayConsoleResults();
    }
}


// ==========================================
// 3. UPDATE THE DASHBOARD DYNAMICALLY (DOM Manipulation)
// ==========================================

/**
 * Dynamically updates DOM elements on the webpage
 */
function updateUI() {
    const cardsGrid = document.getElementById("cards-grid");
    const listContainer = document.getElementById("expenses-list-container");
    const pageListContainer = document.getElementById("expenses-page-list");

    // Perform financial calculations
    let totalExpenses = calculateTotalExpenses();
    let remainingBalance = calculateRemainingBalance(totalBudget, totalExpenses);

    // Render Overview Cards using a loop
    if (cardsGrid) {
        cardsGrid.innerHTML = "";
        
        // Loop processing array elements
        expensesList.forEach(item => {
            const card = document.createElement("article");
            card.className = "card";
            card.innerHTML = `
                <div class="card-title"><span>${item.name}</span></div>
                <div class="card-value">
                    <h3>${currencySymbol}${Number(item.amount).toFixed(0)}</h3>
                    <p>This month</p>
                </div>
            `;
            cardsGrid.appendChild(card);
        });
    }

    // Render Editable Expense List with Delete buttons
    if (listContainer) {
        listContainer.innerHTML = "";

        // Conditionals: Check for empty array
        if (expensesList.length === 0) {
            listContainer.innerHTML = `<li style="padding: 12px; color: #64748b;">No expenses added yet.</li>`;
        } else {
            expensesList.forEach((item, index) => {
                const li = document.createElement("li");
                li.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; border-bottom: 1px solid #f1f5f9;";
                li.innerHTML = `
                    <span><strong>${item.name}</strong>: ${currencySymbol}${Number(item.amount).toFixed(2)}</span>
                    <button class="btn-delete" onclick="deleteExpense(${index})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </button>
                `;
                listContainer.appendChild(li);
            });
        }
    }

    // Mirror list on Expenses Page
    if (pageListContainer) {
        pageListContainer.innerHTML = listContainer ? listContainer.innerHTML : "";
    }
}


// ==========================================
// 4. EVALUATE SCENARIOS (Conditionals & Console)
// ==========================================

/**
 * Displays formatted reports and evaluates conditional status scenarios
 */
function displayConsoleResults() {
    let totalExpenses = calculateTotalExpenses();
    let remainingBalance = calculateRemainingBalance(totalBudget, totalExpenses);

    console.clear();
    console.log("==================================================");
    console.log("           SPENDWISE FINANCIAL REPORT             ");
    console.log("==================================================");
    console.log(`User Category        : ${userCategory}`);
    console.log(`Total Monthly Budget : ${currencySymbol}${totalBudget.toFixed(2)}`);
    console.log(`Total Expenses Spent  : ${currencySymbol}${totalExpenses.toFixed(2)}`);
    console.log(`Remaining Balance    : ${currencySymbol}${remainingBalance.toFixed(2)}`);
    console.log("--------------------------------------------------");
    console.log("ITEMIZED EXPENSE BREAKDOWN:");

    // Loop through records
    expensesList.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name}: ${currencySymbol}${Number(item.amount).toFixed(2)}`);
    });

    console.log("--------------------------------------------------");

    // Conditionals: Decision-making scenarios
    if (remainingBalance < 0) {
        console.warn("STATUS WARNING: You have exceeded your allocated budget!");
    } else if (remainingBalance === 0) {
        console.log("STATUS NOTICE: You have reached your exact budget limit.");
    } else {
        console.log("STATUS OK: You are within your budget limits.");
    }
    console.log("==================================================");
}


// ==========================================
// 5. HANDLE USER INTERACTIONS (Events)
// ==========================================

/**
 * Handles tab navigation click events
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const pages = document.querySelectorAll(".page-content");

    navLinks.forEach(link => {
        // Event listener for tab navigation clicks
        link.addEventListener("click", function (event) {
            event.preventDefault();

            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            pages.forEach(page => page.style.display = "none");

            const targetId = this.getAttribute("data-target");
            const targetPage = document.getElementById(targetId);

            // Conditional evaluation
            if (targetPage) {
                targetPage.style.display = "block";
            }
        });
    });
}

/**
 * Handles expense form submit events
 */
function setupFormHandling() {
    const form = document.getElementById("expense-form");
    if (form) {
        // Event listener for form submission
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevents default page refresh

            const nameInput = document.getElementById("expense-name-input");
            const amountInput = document.getElementById("expense-amount-input");

            if (nameInput && amountInput) {
                let success = addExpense(nameInput.value, amountInput.value);
                
                // Conditional reset
                if (success) {
                    nameInput.value = "";
                    amountInput.value = "";
                }
            }
        });
    }
}


// ==========================================
// 6. INITIALIZATION
// ==========================================

// Event Listener: DOMContentLoaded startup
document.addEventListener("DOMContentLoaded", function () {
    console.log("SpendWise Interactive Engine Initialized.");
    setupNavigation();
    setupFormHandling();
    updateUI();
    displayConsoleResults();
});