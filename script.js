// ===============================
// NovaTasks Pro - Complete Script
// ===============================

// Default Tasks
const defaultTasks = [
    {
        name: "Complete InternPe Task Submission",
        date: "2026-06-12",
        priority: "High",
        completed: false
    },
    {
        name: "Record Project Demo Video",
        date: "2026-06-12",
        priority: "High",
        completed: true
    },
    {
        name: "Post Project on LinkedIn",
        date: "2026-06-12",
        priority: "High",
        completed: false
    },
    {
        name: "Update Resume",
        date: "2026-06-15",
        priority: "Medium",
        completed: false
    },
    {
        name: "Learn Advanced JavaScript",
        date: "2026-06-18",
        priority: "Medium",
        completed: false
    },
    {
        name: "Upload Project to GitHub",
        date: "2026-06-20",
        priority: "Low",
        completed: false
    }
];

// Load Tasks
let tasks = JSON.parse(localStorage.getItem("tasks"));

if (!tasks) {
    tasks = defaultTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Dashboard + Progress
function updateDashboard() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;

    const percentage =
        total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("progressBar").style.width =
        percentage + "%";

    const progressText =
        document.getElementById("progressText");

    if (progressText) {
        progressText.textContent =
            percentage + "%";
    }
}

// Render Tasks
function renderTasks() {

    const taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";

    const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3
    };

    tasks.sort((a, b) =>
        priorityOrder[a.priority] -
        priorityOrder[b.priority]
    );

    tasks.forEach((task, index) => {

        const taskCard =
            document.createElement("div");

        taskCard.className = "task";

        taskCard.innerHTML = `
            <div class="task-info">

                <h3 class="${task.completed ? "completed" : ""}">
                    ${task.name}
                </h3>

                <p>📅 ${task.date || "No Due Date"}</p>

                <span class="priority ${task.priority.toLowerCase()}">
                    ${task.priority} Priority
                </span>

            </div>

            <div class="actions">

                <button
                    class="complete-btn"
                    onclick="toggleTask(${index})">

                    ${task.completed ? "↩" : "✔"}

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${index})">

                    🗑

                </button>

            </div>
        `;

        taskList.appendChild(taskCard);
    });

    updateDashboard();
}

// Add Task
function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const taskDate =
        document.getElementById("taskDate");

    const priority =
        document.getElementById("priority");

    const taskName =
        taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        name: taskName,
        date: taskDate.value,
        priority: priority.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskDate.value = "";
    priority.selectedIndex = 0;
}

// Complete Task
function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();
        renderTasks();
    }
}

// Search Tasks
function searchTasks() {

    const searchValue =
        document.getElementById("search")
        .value
        .toLowerCase()
        .trim();

    const taskCards =
        document.querySelectorAll(".task");

    taskCards.forEach(card => {

        const taskName =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        card.style.display =
            taskName.includes(searchValue)
            ? "flex"
            : "none";
    });
}

// Show Today's Date
function showDate() {

    const todayDate =
        document.getElementById("todayDate");

    if (todayDate) {

        const today =
            new Date();

        todayDate.textContent =
            today.toDateString();
    }
}

// Enter Key Support
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const taskInput =
            document.getElementById("taskInput");

        if (taskInput) {

            taskInput.addEventListener(
                "keypress",
                function (e) {

                    if (e.key === "Enter") {
                        addTask();
                    }
                }
            );
        }

        showDate();
        renderTasks();
    }
);