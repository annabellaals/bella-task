document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const errorMessage = document.getElementById("errorMessage");

  let taskCounter = 0;
  let tasks = [];

  const storedtasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedtasks) {
    tasks = storedtasks;
    rendertasks();
  }

  addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addtaskItem(taskText);
      taskInput.value = "";
      errorMessage.style.display = "none";
    } else {
      errorMessage.textContent = "Input cannot be empty";
      errorMessage.style.display = "block";
    }
  });

  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });

  function addtaskItem(taskText) {
    const taskId = "task_" + taskCounter;
    const task = { id: taskId, text: taskText };
    tasks.push(task);
    savetasks();
    rendertasks();
    taskCounter++;
  }

  function deletetaskItem(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    savetasks();
    rendertasks();
  }

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function rendertasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("id", task.id);

      const taskSpan = document.createElement("span");
      taskSpan.textContent = task.text;
      li.appendChild(taskSpan);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", function () {
        deletetaskItem(task.id);
      });

      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  }
});
