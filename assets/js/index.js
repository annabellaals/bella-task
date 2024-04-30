document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");
  const errorMessage = document.getElementById("errorMessage");

  // Initialize the task array and amount of tasks
  let taskCounter = 0;
  let tasks = [];

  // The array of stored tasks, saved on local storage
  const storedtasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedtasks) {
    tasks = storedtasks;
    renderTasks();
  }

  // Event listener for clicking on "Add Task" button
  addBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    // If input is not empty, then add a task
    if (taskText !== "") {
      addtaskItem(taskText);
      taskInput.value = "";
      errorMessage.style.display = "none";
    } else {
      // If input is empty, then render this error message
      errorMessage.textContent = "Input cannot be empty";
      errorMessage.style.display = "block";
    }
  });

  // Event listener for adding a task with "Enter" key button
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addBtn.click();
    }
  });

  // Function for adding tasks
  function addtaskItem(taskText) {
    // Assign an id for each task and increment amount of tasks in array
    const taskId = "task_" + taskCounter;
    const task = { id: taskId, text: taskText };
    // Push new task to the tasks array. Then run saveTasks and renderTasks functions
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskCounter++;
  }

  // Function for deleting tasks
  function deleteTaskItem(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
  }

  // Function for saving tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function for rendering each task in tasks array
  function renderTasks() {
    taskList.innerHTML = "";

    // Loop through each iteration inside tasks array
    tasks.forEach((task) => {
      // For each iteration, create a li element and assign it an id
      const li = document.createElement("li");
      li.setAttribute("id", task.id);

      // For each iteration, create a span element and give it a text
      const taskSpan = document.createElement("span");
      taskSpan.textContent = task.text;
      li.appendChild(taskSpan);

      // For each iteration, create a button element for deleting the specific task based on its id
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      // Event listener for button to delete specific task
      deleteBtn.addEventListener("click", function () {
        deleteTaskItem(task.id);
      });

      li.appendChild(deleteBtn);

      taskList.appendChild(li);
    });
  }
});
