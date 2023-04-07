// Select elements from the DOM
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const list = document.querySelector("#list");
const filterBtns = document.querySelectorAll(".filter-btn");

// Retrieve the todos from local storage, if available
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Event listeners
form.addEventListener("submit", addTodo);
// list.addEventListener("click", deleteTodo);
list.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("delete-btn")) {
    // handle delete button click
    const todoId = parseInt(target.parentElement.getAttribute("data-id"));
    todos = todos.filter((todo) => todo.id !== todoId);
    displayTodos();
    saveTodos();
  } else if (target.classList.contains("complete-btn")) {
    // handle complete button click
    const todoId = parseInt(target.parentElement.getAttribute("data-id"));
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    todos[todoIndex].completed = !todos[todoIndex].completed;
    displayTodos();
    saveTodos();
  }
});

filterBtns.forEach((btn) => btn.addEventListener("click", filterTodo));

// this Function is called when the form is submitted
function addTodo(event) {
  // prevents the default form submission behavior
  event.preventDefault();
  //get the input value, trims any white space from it, and stores it in the todoText variable.
  const todoText = input.value.trim();
  //   If the length of todoText is greater than 0, it creates a new todo object with an id property set to the current timestamp using Date.now(), a text property set to todoText, and a completed property set to false.
  if (todoText.length > 0) {
    const todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
      date: new Date().toLocaleDateString(),
    };
    // use the push() method to add the todo object to the
    todos.push(todo);
    input.value = "";
    displayTodos();
    // the saveTodos() function is called to save the updated todos array to local storage so that the list persists even when the page is reloaded.
    saveTodos();
  }
}

function deleteTodo(event) {
  if (event.target.tagName.toLowerCase() === "button") {
    const todoId = parseInt(event.target.parentElement.getAttribute("data-id"));
    todos = todos.filter((todo) => todo.id !== todoId);
    displayTodos();
    saveTodos();
  }
}

function filterTodo(event) {
  const filter = event.target.getAttribute("data-filter");
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  displayTodos(filter);
}

function displayTodos(filter = "all") {
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "uncompleted") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  list.innerHTML = "";

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.setAttribute("data-id", todo.id);
    li.classList.toggle("completed", todo.completed);

    const completeBtnText = todo.completed
      ? "Incomplete"
      : "<i class='fa fa-check' aria-hidden='true'></i>";

    li.innerHTML = `
      <span>${todo.text}</span>
      <span class="date">${todo.date}</span>
      <div>
        <button class="delete-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
        <button class="completed-btn">${completeBtnText}</button>
      </div>
    `;

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", (event) => {
      const todoId = parseInt(li.getAttribute("data-id"));
      todos = todos.filter((todo) => todo.id !== todoId);
      displayTodos();
      saveTodos();
    });

    const completeBtn = li.querySelector(".completed-btn");
    completeBtn.addEventListener("click", (event) => {
      const todoId = parseInt(li.getAttribute("data-id"));
      const todoIndex = todos.findIndex((todo) => todo.id === todoId);
      todos[todoIndex].completed = !todos[todoIndex].completed;
      displayTodos();
      saveTodos();
    });

    list.appendChild(li);
  });
}



function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Initial display of todos
displayTodos();
