/**
 * SpendWise - Dynamic Expense Manager & Foundation Engine
 */

// ==========================================
// 1. STORE APPLICATION DATA (Variables)
// ==========================================

let totalBudget = 1000;
let userCategory = "General";
let currencySymbol = "$";

// Master Expenses Array
let expensesList = [
    { name: "Food", amount: 120 },
    { name: "Transport", amount: 85 },
    { name: "Rent", amount: 300 },
    { name: "Entertainment", amount: 60 },
    { name: "Savings", amount: 200 },
    { name: "Utilities", amount: 75 }
];


// ==========================================
// 2. REUSABLE FUNCTIONS (Calculations)
// ==========================================

function calculateTotalExpenses() {
    let total = 0;
    for (let i = 0; i < expensesList.length; i++) {
        total += Number(expensesList[i].amount);
    }
    return total;
}

function calculateRemainingBalance(budget, expenses) {
    return Number(budget) - Number(expenses);
}

/**
 * Adds an expense item
 */
function addExpense(name, amount) {
    let parsedAmount = parseFloat(amount);
    if (name && !isNaN(parsedAmount) && parsedAmount > 0) {
        expensesList.push({ name: name.trim(), amount: parsedAmount });
        updateUI();
        displayResults();
        return true;
    }
    return false;
}

/**
 * Removes an expense item by index
 */
function deleteExpense(index) {
    if (index >= 0 && index < expensesList.length) {
        let removed = expensesList.splice(index, 1);
        console.log(`[-] Removed Expense: ${removed[0].name} (${currencySymbol}${removed[0].amount})`);
        updateUI();
        displayResults();
    }
}


// ==========================================
// 3. UI RENDERING & DOM UPDATES
// ==========================================

function updateUI() {
    const cardsGrid = document.getElementById("cards-grid");
    const listContainer = document.getElementById("expenses-list-container");
    const pageListContainer = document.getElementById("expenses-page-list");

    // Render Cards in Monthly Overview
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

    // Render Editable Expenses List on Dashboard
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
                    <button onclick="deleteExpense(${index})" style="background: #ef4444; color: #fff; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 0.85rem;"><i class="fa-solid fa-trash"></i> Delete</button>
                `;
                listContainer.appendChild(li);
            });
        }
    }

    // Mirror List on Expenses Page
    if (pageListContainer) {
        pageListContainer.innerHTML = listContainer ? listContainer.innerHTML : "";
    }
}


// ==========================================
// 4. DISPLAY RESULTS (Console Log)
// ==========================================

function displayResults() {
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
    } else {
        console.log("STATUS OK: You are within your budget limits.");
    }
    console.log("==================================================");
}


// ==========================================
// 5. INTERACTIVE NAVIGATION & EVENT LISTENERS
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
            e.preventDefault();
            const nameInput = document.getElementById("expense-name-input");
            const amountInput = document.getElementById("expense-amount-input");

            if (nameInput && amountInput) {
                addExpense(nameInput.value, amountInput.value);
                nameInput.value = "";
                amountInput.value = "";
            }
        });
    }
}


// ==========================================
// 6. INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    console.log("SpendWise Engine Initialized.");
    setupNavigation();
    setupFormHandling();
    updateUI();
    displayResults();
});