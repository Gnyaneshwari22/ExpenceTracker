function handleFormSubmit(event) {
  event.preventDefault();
  const userId = event.target.dataset.userId || null; // Check if the form is for updating an existing user
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  if (userId) {
    // Update (PUT) existing user
    axios
      .put(
        `https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/BookingApp/${userId}`,
        userDetails
      )
      .then(() => {
        fetchUsersOnLoad(); // Refresh the user list
        resetForm(event.target); // Reset the form
      })
      .catch((error) => console.log(error));
  } else {
    // Create (POST) new user
    axios
      .post(
        "https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/BookingApp",
        userDetails
      )
      .then((response) => {
        displayUserOnScreen(response.data);
        resetForm(event.target); // Reset the form
      })
      .catch((error) => console.log(error));
  }
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Delete user
  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    axios
      .delete(
        `https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/BookingApp/${userDetails._id}`
      )
      .then(() => console.log("User deleted"))
      .catch((error) => console.log(error));
  });

  // Edit user
  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);

    // Populate form with user details for editing
    const form = document.querySelector("form");
    form.username.value = userDetails.username;
    form.email.value = userDetails.email;
    form.phone.value = userDetails.phone;
    form.dataset.userId = userDetails._id; // Save user ID for updating
  });
}

function fetchUsersOnLoad() {
  const userList = document.querySelector("ul");
  userList.innerHTML = ""; // Clear existing list
  axios
    .get("https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/BookingApp")
    .then((response) => {
      response.data.forEach((userDetails) => displayUserOnScreen(userDetails));
    })
    .catch((error) => console.log(error));
}

function resetForm(form) {
  form.reset();
  delete form.dataset.userId; // Remove user ID after updating
}

// Fetch existing users on page load
document.addEventListener("DOMContentLoaded", fetchUsersOnLoad);

// Do not touch code below
// module.exports = handleFormSubmit;
