import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList() {
    const { tasks, getTasks, loading } = useTasks();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getTasks(); // Cargar todas las tareas al inicio
    }, []);

    function handleFilterChange(value) {
        setFilter(value);
    }

    function renderTasks() {
        if (loading) {
            return <h3>Loading...</h3>;
        }

        const filteredTasks = tasks.filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "todo") return !task.completed;
            return true; // "all" muestra todas las tareas
        });

        if (filteredTasks.length === 0) {
            return <p>No tasks found</p>;
        }

        return (
            <ul>
                {filteredTasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </ul>
        );
    }

    return (
        <div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={filter === "completed"}
                        onChange={() => handleFilterChange("completed")}
                    />
                    Show Completed
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter === "todo"}
                        onChange={() => handleFilterChange("todo")}
                    />
                    Show To Do
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filter === "all"}
                        onChange={() => handleFilterChange("all")}
                    />
                    Show All
                </label>
            </div>
            {renderTasks()}
        </div>
    );
}

export default TaskList;