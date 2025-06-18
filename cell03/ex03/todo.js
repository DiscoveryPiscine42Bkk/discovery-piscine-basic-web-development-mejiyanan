window.onload = function () {
  loadTodos();
};

function addTodo() {
  const text = prompt("Enter new TO DO:");
  if (text) {
    const todo = createTodoElement(text);
    const list = document.getElementById("ft_list");
    list.insertBefore(todo, list.firstChild);
    saveTodos();
  }
}

function createTodoElement(text) {
  const div = document.createElement("div");
  div.textContent = text;
  div.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      div.remove();
      saveTodos();
    }
  };
  return div;
}

function saveTodos() {
  const list = document.getElementById("ft_list").children;
  const todos = [];
  for (let item of list) {
    todos.push(item.textContent);
  }
  document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function loadTodos() {
  const match = document.cookie.match(/(?:^|;) *todos=([^;]*)/);
  if (match) {
    const todos = JSON.parse(decodeURIComponent(match[1]));
    for (let text of todos) {
      const todo = createTodoElement(text);
      document.getElementById("ft_list").appendChild(todo);
    }
  }
}