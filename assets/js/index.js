document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todoInput");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");
    let todoCounter = 0;
    let todos = [];



    addBtn.addEventListener("click", function () {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            todoInput.value = "";
        }
    });

    todoInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addBtn.click();
        }
    });

    function addTodoItem(todoText) {
        const todoId = "todo_" + todoCounter;
        const todo = { id: todoId, text: todoText };
        todos.push(todo);
        renderTodos();
        todoCounter++;
    }



    function renderTodos() {
        todoList.innerHTML = "";

        todos.forEach((todo) => {
            const li = document.createElement("li");
            li.setAttribute("id", todo.id);

            const todoSpan = document.createElement("span");
            todoSpan.textContent = todo.text;
            li.appendChild(todoSpan);



            todoList.appendChild(li);
        });
    }
});
