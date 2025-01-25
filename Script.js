document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToDOM(taskText);
    taskInput.value = '';
}

function addTaskToDOM(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.onclick = () => editTask(taskText, li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(taskText, li);

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

function editTask(taskText, li) {
    const newTaskText = prompt('Edit your task:', taskText);
    if (newTaskText === null || newTaskText.trim() === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(taskText);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.firstChild.textContent = newTaskText;
    }
}

function deleteTask(taskText, li) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(taskText);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    }
}