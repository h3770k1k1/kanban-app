export const handleAddTask = (tasks, setTasks, column) => {
    const newTask = { id: Math.random(), description: "" };
    const updatedTasks = Object.assign({}, tasks);
    updatedTasks[column] = tasks[column].concat(newTask);
    setTasks(updatedTasks);
};

export const handleCloseTask = (tasks, setTasks, column, taskId) => {
    const updatedTasks = Object.assign({}, tasks);
    updatedTasks[column] = tasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
};

export const handleTaskDescriptionChange = (tasks, setTasks, column, taskId, newDescription) => {
    const updatedTasks = Object.assign({}, tasks);
    updatedTasks[column] = tasks[column].map((task) => {
        if (task.id === taskId) {
            return Object.assign({}, task, { description: newDescription });
        }
        return task;
    });
    setTasks(updatedTasks);
};

export const handleDropTask = (taskId, column, tasks, setTasks) => {
    let task = null;
    for (let key in tasks) {
        const foundTask = tasks[key].find((t) => t.id === taskId);
        if (foundTask) {
            task = foundTask;
            break;
        }
    }

    if (task) {
        const updatedTasks = Object.assign({}, tasks);
        for (let key in updatedTasks) {
            updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId);
        }
        updatedTasks[column] = updatedTasks[column].concat(task);
        setTasks(updatedTasks);
    }
};
