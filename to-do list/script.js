document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const addButton = document.getElementById("add-button");
    const taskInput = document.getElementById("task-input");

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            saveTasksToLocalStorage();
            taskInput.value = "";
        }
    });

    taskList.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("delete")) {
            deleteTask(target);
            saveTasksToLocalStorage();
        } else if (target.classList.contains("edit")) {
            editTask(target);
        }
    });

    function addTask(text) {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
            <span class="task-text">${text}</span>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        `;
        taskList.appendChild(task);
    }

    function deleteTask(button) {
        const task = button.parentElement;
        taskList.removeChild(task);
    }

    function editTask(button) {
        const taskText = button.parentElement.querySelector(".task-text");
        const newText = prompt("Edit task:", taskText.textContent);
        if (newText !== null) {
            taskText.textContent = newText;
            saveTasksToLocalStorage();
        }
    }

    function saveTasksToLocalStorage() {
        const tasks = document.querySelectorAll(".task-text");
        const taskArray = Array.from(tasks).map((task) => task.textContent);
        localStorage.setItem("tasks", JSON.stringify(taskArray));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            const tasks = JSON.parse(storedTasks);
            tasks.forEach((task) => addTask(task));
        }
    }

    loadTasksFromLocalStorage();
});
