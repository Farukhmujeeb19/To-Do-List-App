let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
  const list = document.getElementById("taskList");
  const footer = document.getElementById("footer");
  const meta = document.getElementById("metaText");
  const doneCount = document.getElementById("doneCount");

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<div class="empty"><div class="empty-icon">✦</div>No tasks yet — add one above</div>`;
    footer.style.display = "none";
    meta.textContent = "0 tasks";
    return;
  }

  const doneNum = tasks.filter(t => t.done).length;
  meta.textContent = `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`;
  doneCount.textContent = `${doneNum} completed`;
  footer.style.display = doneNum > 0 ? "flex" : "none";

  tasks.forEach((task, i) => {
    const item = document.createElement("div");
    item.className = "task-item" + (task.done ? " done" : "");

    // Checkbox
    const check = document.createElement("button");
    check.className = "check-btn";
    check.title = task.done ? "Mark incomplete" : "Mark complete";
    check.innerHTML = `<svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <path d="M1 5l3.5 3.5L11 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    check.onclick = () => { tasks[i].done = !tasks[i].done; save(); render(); };

    // Text
    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;
    text.title = "Click to toggle";
    text.onclick = () => { tasks[i].done = !tasks[i].done; save(); render(); };

    // Delete
    const del = document.createElement("button");
    del.className = "del-btn";
    del.title = "Remove task";
    del.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`;
    del.onclick = () => { tasks.splice(i, 1); save(); render(); };

    item.appendChild(check);
    item.appendChild(text);
    item.appendChild(del);
    list.appendChild(item);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const val = input.value.trim();
  if (!val) { input.focus(); return; }
  tasks.push({ text: val, done: false });
  input.value = "";
  save();
  render();
  input.focus();
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("taskInput").addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

render();