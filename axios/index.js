const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const deleteBtn = document.getElementById("delete-btn");

getBtn.addEventListener("click", getTodos);
postBtn.addEventListener("click", postTodo);
putBtn.addEventListener("click", putTodo);
deleteBtn.addEventListener("click", deleteTodo);

function getTodos() {
  // Write your code here
  axios
    .get("https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/todo")
    .then((res) => console.log(res))
    .catch((e) => console.log(e.message));
}

function postTodo() {
  // Write your code here
  axios
    .post("https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/todo", {
      title: "Learn Hair Style",
      completed: true,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => console.log(e.message));
}

function putTodo() {
  // Write your code here
  axios
    .put(
      "https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/todo/676bdc7e3b6dab03e80673d0",
      {
        title: "Miss YOU Shree",
        completed: true,
      }
    )
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e.message));
}

function deleteTodo() {
  // Write your code here
  axios
    .delete(
      "https://crudcrud.com/api/4e0d879ec1124b48a803aa7a60f446e9/todo/676bdc6c3b6dab03e80673cf"
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => console.log(e.message));
}
