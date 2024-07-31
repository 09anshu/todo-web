// This code will be executed once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const showAllButton = document.getElementById('showAll');
    const showCompletedButton = document.getElementById('showCompleted');
    const showIncompleteButton = document.getElementById('showIncomplete');

    // Load tasks from local storage or initialize with an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks based on the filter
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';

        // Filter tasks based on the selected filter
        let filteredTasks = tasks;
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'incomplete') {
            filteredTasks = tasks.filter(task => !task.completed);
        }

        // Render each task
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    // Function to toggle the completed state of a task
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Attach functions to the window object to make them globally accessible
    window.toggleTask = toggleTask;
    window.deleteTask = deleteTask;

    // Event listeners for buttons
    addTaskButton.addEventListener('click', addTask);
    showAllButton.addEventListener('click', () => renderTasks('all'));
    showCompletedButton.addEventListener('click', () => renderTasks('completed'));
    showIncompleteButton.addEventListener('click', () => renderTasks('incomplete'));

    // Initial render of tasks
    renderTasks();
});
