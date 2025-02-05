export const handleAddTask = (tasks, setTasks, column) => {
    const newTask = { id: Math.random(), description: "" };
    const updatedTasks = { ...tasks };
    updatedTasks[column] = [...tasks[column], newTask];
    setTasks(updatedTasks);
};

export const handleCloseTask = (tasks, setTasks, column, taskId) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = tasks[column].filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
};


export const handleTaskDescriptionChange = (tasks, setTasks, column, taskId, newDescription) => {
    const updatedTasks = { ...tasks };
    updatedTasks[column] = tasks[column].map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
    );
    setTasks(updatedTasks);
};

export const handleDropTask = (taskId, column, tasks, setTasks) => {
    let task = null;
    Object.keys(tasks).forEach((key) => {
        const foundTask = tasks[key].find((task) => task.id === taskId);
        if (foundTask) {
            task = foundTask;
        }
    });

    if (task) {
        const updatedTasks = { ...tasks };
        Object.keys(updatedTasks).forEach((key) => {
            updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== taskId);
        });

        updatedTasks[column] = [...updatedTasks[column], task];
        setTasks(updatedTasks);
    }
};