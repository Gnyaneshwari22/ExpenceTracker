// Get references to form and output elements
const userForm = document.getElementById("userForm");
const outputDiv = document.getElementById("output");
let editIndex = null; // Store index for the item being edited

// Load saved expense data on page load
document.addEventListener("DOMContentLoaded", displayExpenses);

// Handle form submission
userForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect user input
  const ExpenseData = {
    ExpenseAmount: document.getElementById("ChooseExpenseAmount").value,
    description: document.getElementById("description").value,
    categeory: document.getElementById("categeory").value,
  };

  // Get existing expenses from local storage or initialize an empty array
  const Expenses = JSON.parse(localStorage.getItem("Expenses")) || [];

  if (editIndex !== null) {
    // If editing, update the existing expense data
    Expenses[editIndex] = ExpenseData;
    alert("Expense updated sucessfully");
    editIndex = null; // Reset edit index
  } else {
    // If not editing, add a new expense
    Expenses.push(ExpenseData);
    alert("Expense added sucessfully");
  }

  // Save the updated Expenses array back to local storage
  localStorage.setItem("Expenses", JSON.stringify(Expenses));

  // Display the updated data
  displayExpenses();

  // Clear the form
  userForm.reset();
});

// Function to display all expense data
function displayExpenses() {
  const storedData = localStorage.getItem("Expenses");

  if (storedData) {
    const Expenses = JSON.parse(storedData);

    outputDiv.innerHTML = `
      <div class="expense-cards">
        ${Expenses.map(
          (expense, index) => `
          <div class="user-card">
            <div class="expense-info">
              <p><strong>Expense Amount:</strong> ${expense.ExpenseAmount}</p>
              <p><strong>Description:</strong> ${expense.description}</p>
              <p><strong>Category:</strong> ${expense.categeory}</p>
            </div>
            <div class="expense-actions">
              <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
            </div>
          </div>
        `
        ).join("")}
      </div>
    `;
  } else {
    outputDiv.innerHTML = `<p>No expense data found. Add your first expense!</p>`;
  }
}

// Function to edit an expense
function editExpense(index) {
  const Expenses = JSON.parse(localStorage.getItem("Expenses"));

  const expense = Expenses[index];

  // Populate the form with the expense's data
  document.getElementById("ChooseExpenseAmount").value = expense.ExpenseAmount;
  document.getElementById("description").value = expense.description;
  document.getElementById("categeory").value = expense.categeory;

  editIndex = index;
}

// Function to delete an expense
function deleteExpense(index) {
  const Expenses = JSON.parse(localStorage.getItem("Expenses"));

  // Remove the selected expense from the array
  Expenses.splice(index, 1);

  alert("Expense deleted successfully");

  // Save the updated array back to local storage
  localStorage.setItem("Expenses", JSON.stringify(Expenses));

  // Display updated data
  displayExpenses();
}
