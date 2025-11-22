document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks
  function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");

      const textSpan = document.createElement("span");
      textSpan.textContent = task.text;

      if (task.completed) {
        textSpan.classList.add("completed");
      }

      // container tombol edit+delete
      const btnContainer = document.createElement("div");
      btnContainer.className = "btn-container";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "edit-btn";
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        editTask(index);
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(index);
      });

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      li.appendChild(textSpan);
      li.appendChild(btnContainer);

      li.addEventListener("click", () => toggleComplete(index));

      list.appendChild(li);
    });
  }

  // Add task
  function addTask(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
  }

  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Edit task
  function editTask(index) {
    input.value = tasks[index].text;
    deleteTask(index);
  }

  // Toggle task completion
  function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  // Save tasks
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  form.addEventListener("submit", addTask);
  renderTasks();
});