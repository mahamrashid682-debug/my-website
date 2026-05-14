const API_URL = "http://localhost:4000/tasks";

window.onload = getTasks;

async function getTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";

        const text = document.createElement("span");
        text.innerText = `${task.description} - ${task.status}`;

        if (task.status === "completed") {
            text.classList.add("completed");
        }

        div.appendChild(text);

        if (task.status === "pending") {
            const btn = document.createElement("button");
            btn.innerText = "Mark Complete";

            btn.onclick = () => markComplete(task.id);

            div.appendChild(btn);
        }

        taskList.appendChild(div);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");
    const description = input.value;

    if (!description) {
        alert("Enter a task!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: description,
            status: "pending"
        })
    });

    input.value = "";
    getTasks();
}

async function markComplete(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT"
    });

    getTasks();
}