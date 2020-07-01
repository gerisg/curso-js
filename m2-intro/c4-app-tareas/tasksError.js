class TasksError extends Error {
    constructor(message) {
        super(message);
        this.name = 'TasksError';
    }
}

module.exports = TasksError;
