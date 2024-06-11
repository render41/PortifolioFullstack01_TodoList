document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      addTaskToList(task);
    });
  };

  const addTaskToList = (task) => {
    const li = document.createElement("li");
    li.textContent = task.description;
    li.dataset.id = task.id;
    if (task.completed) {
      li.classList.add("completed");
    }

    const completeButton = document.createElement("button");
    completeButton.textContent = "Completar";
    completeButton.addEventListener("click", () => toggleCompleteTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  };

  const addTask = async (description) => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    const newTask = await response.json();
    addTaskToList(newTask);
  };

  const toggleCompleteTask = async (id) => {
    const task = document.querySelector(`li[data-id='${id}']`);
    const completed = !task.classList.contains("completed");

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    const updatedTask = await response.json();
    if (updatedTask.completed) {
      task.classList.add("completed");
    } else {
      task.classList.remove("completed");
    }
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    const task = document.querySelector(`li[data-id='${id}']`);
    task.remove();
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = taskInput.value.trim();
    if (description) {
      addTask(description);
      taskInput.value = "";
    }
  });

  fetchTasks();
});
