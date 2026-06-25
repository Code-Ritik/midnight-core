const taskName = document.querySelector(".taskName");
const select = document.querySelector(".status");
const addTask = document.querySelector(".addTask");
const numtask = document.querySelector(".num-task");

const mission = document.querySelector("#all-mission");
const pending = document.querySelector("#pending");
const doing = document.querySelector("#doing");
const complete = document.querySelector("#complete");

const searchInput = document.querySelector('input[type="search"]');

let allTaskData = [];


function renderTasks(filter = "") {
    mission.innerHTML = "";
    pending.innerHTML = "";
    doing.innerHTML = "";
    complete.innerHTML = "";

    allTaskData.forEach((taskObj, index) => {

        if (
            filter &&
            !taskObj.task.toLowerCase().includes(filter.toLowerCase())
        ) {
            return;
        }

        const taskHTML = `
        <div class="tasks">
            <div class="tasks-top">
                <h3>${taskObj.task}</h3>
            </div>

            <div class="btns">
                <select class="task-status" data-index="${index}">
                    <option value="pending" ${taskObj.status === "pending" ? "selected" : ""}>⌛ Pending</option>
                    <option value="doing" ${taskObj.status === "doing" ? "selected" : ""}>✍️ Doing</option>
                    <option value="completed" ${taskObj.status === "completed" ? "selected" : ""}>✔️ Completed</option>
                </select>

                <div class="modifly">
                    <button class="btn edit" data-index="${index}">
                        <i class="ri-pencil-line"></i>Edit
                    </button>

                    <button class="btn del" data-index="${index}">
                        <i class="ri-delete-bin-line"></i>Delete
                    </button>
                </div>
            </div>
        </div>
        `;

        // All Tasks Box
        mission.innerHTML += taskHTML;

        // Status Boxes
        if (taskObj.status === "pending") {
            pending.innerHTML += taskHTML;
        } else if (taskObj.status === "doing") {
            doing.innerHTML += taskHTML;
        } else {
            complete.innerHTML += taskHTML;
        }
    });

    addTaskEvents();

    numtask.style.display = allTaskData.length ? "block" : "none";
    numtask.textContent = allTaskData.length;
}

// Add Task
addTask.addEventListener("click", () => {
    const task = taskName.value.trim();

    if (!task) {
        alert("Enter Valid Task");
        return;
    }

    allTaskData.push({
        task: task,
        status: select.value
    });

    taskName.value = "";
    renderTasks();
});

// Status Change + Edit + Delete
function addTaskEvents() {

    // Change Status
    document.querySelectorAll(".task-status").forEach((item) => {
        item.addEventListener("change", function () {

            const index = this.dataset.index;

            allTaskData[index].status = this.value;

            renderTasks(searchInput.value);
        });
    });

    // Edit Task
    document.querySelectorAll(".edit").forEach((btn) => {
        btn.addEventListener("click", function () {

            const index = this.dataset.index;

            const updatedTask = prompt(
                "Edit Task",
                allTaskData[index].task
            );

            if (updatedTask && updatedTask.trim() !== "") {
                allTaskData[index].task = updatedTask.trim();
                renderTasks(searchInput.value);
            }
        });
    });

    // Delete Task
    document.querySelectorAll(".del").forEach((btn) => {
        btn.addEventListener("click", function () {

            const index = this.dataset.index;

            allTaskData.splice(index, 1);

            renderTasks(searchInput.value);
        });
    });
}

// Search Task
searchInput.addEventListener("input", () => {
    renderTasks(searchInput.value);
});

// Clear All Tasks
document.querySelector(".clearTask").addEventListener("click", () => {
    allTaskData = [];
    renderTasks();
});