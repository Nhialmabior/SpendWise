/**
 * SpendWise - Interactive Budget Tracker
 * 
 * Requirements Implemented:
 * 1. Decision Making: Conditionals evaluate budget state & render a dynamic UI warning banner.
 * 2. Work with Multiple Records: Arrays store structured expense objects.
 * 3. Process Data with Loops: `for` loops and `forEach` process records.
 * 4. Update Dashboard Dynamically: DOM manipulation updates cards, lists, & alerts on screen.
 * 5. Handle User Interactions: Event listeners handle form submissions and button clicks.
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
    
    // Input validation condition
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
 * Dynamically updates DOM elements and displays visual feedback directly on the webpage
 */
function updateUI() {
    const cardsGrid = document.getElementById("cards-grid");
    const listContainer = document.getElementById("expenses-list-container");
    const pageListContainer = document.getElementById("expenses-page-list");
    const alertBannerContainer = document.getElementById("alert-banner-container");

    // Perform financial calculations
    let totalExpenses = calculateTotalExpenses();
    let remainingBalance = calculateRemainingBalance(totalBudget, totalExpenses);

    // Dynamic Visual Alert Banner on the Webpage (Addressing feedback)
    if (alertBannerContainer) {
        if (remainingBalance < 0) {
            alertBannerContainer.innerHTML = `
                <div style="background-color: #fef2f2; border: 1px solid #fca5a5; color: #991b1b; padding: 14px 18px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 1.2rem;"></i>
                    <span><strong>Budget Warning:</strong> You have exceeded your monthly budget by ${currencySymbol}${Math.abs(remainingBalance).toFixed(2)}!</span>
                </div>
            `;
        } else if (remainingBalance === 0) {
            alertBannerContainer.innerHTML = `
                <div style="background-color: #fffbebfb; border: 1px solid #fde68a; color: #92400e; padding: 14px 18px; border-radius: 8px; font-weight: 600; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <i class="fa-solid fa-circle-info" style="font-size: 1.2rem;"></i>
                    <span><strong>Budget Notice:</strong> You have reached your exact budget limit of ${currencySymbol}${totalBudget.toFixed(2)}.</span>
                </div>
            `;
        } else {
            alertBannerContainer.innerHTML = `
                <div style="background-color: #f0fdf4; border: 1px solid #86efac; color: #166534; padding: 14px 18px; border-radius: 8px; font-weight: 500; display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <i class="fa-solid fa-circle-check" style="font-size: 1.2rem;"></i>
                    <span><strong>Budget Status:</strong> You are within your budget! Remaining balance: <strong>${currencySymbol}${remainingBalance.toFixed(2)}</strong></span>
                </div>
            `;
        }
    }

    // Render Overview Cards using a loop
    if (cardsGrid) {
        cardsGrid.innerHTML = "";
        
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
// 4. EVALUATE SCENARIOS (Console Logging)
// ==========================================

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

    expensesList.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.name}: ${currencySymbol}${Number(item.amount).toFixed(2)}`);
    });

    console.log("--------------------------------------------------");

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

function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const pages = document.querySelectorAll(".page-content");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            navLinks.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            pages.forEach(page => page.style.display = "none");

            const targetId = this.getAttribute("data-target");
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                targetPage.style.display = "block";
            }
        });
    });
}

function setupFormHandling() {
    const form = document.getElementById("expense-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevents default page refresh

            const nameInput = document.getElementById("expense-name-input");
            const amountInput = document.getElementById("expense-amount-input");

            if (nameInput && amountInput) {
                let success = addExpense(nameInput.value, amountInput.value);
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

document.addEventListener("DOMContentLoaded", function () {
    console.log("SpendWise Interactive Engine Initialized.");
    setupNavigation();
    setupFormHandling();
    updateUI();
    displayConsoleResults();
});