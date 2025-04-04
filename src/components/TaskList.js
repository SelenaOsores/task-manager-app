import React, { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskList() {
    const { tasks, getTasks, loading } = useTasks();
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        getTasks(); 
    }, []);

    function handleFilterChange(value) {
        setFilter(value);
    }

    function renderTasks() {
        if (loading) {
            return <h3 className="text-center text-primary">Loading...</h3>;
        }

        const filteredTasks = tasks.filter(task => {
            if (filter === "completed") return task.completed;
            if (filter === "todo") return !task.completed;
            return true; 
        });

        if (filteredTasks.length === 0) {
            return <p className="text-center text-muted">No tasks found</p>;
        }

        return (
            <ul className="list-group">
                {filteredTasks.map((task) => (
                    <li className="list-group-item border-0 p-0" style={{ background: "#002F5C" }} key={task.id}>
                        <TaskCard task={task} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div className="card p-3 border-0" style={{ background: "#002F5C", width: "100%" }}>
            <div className="btn-group mb-3" role="group">
                <input type="radio" className="btn-check" id="all" name="filter" checked={filter === "all"} onChange={() => handleFilterChange("all")} />
                <label className="btn btn-outline-primary" htmlFor="all">Show All</label>

                <input type="radio" className="btn-check" id="completed" name="filter" checked={filter === "completed"} onChange={() => handleFilterChange("completed")} />
                <label className="btn btn-outline-success" htmlFor="completed">Show Completed</label>

                <input type="radio" className="btn-check" id="todo" name="filter" checked={filter === "todo"} onChange={() => handleFilterChange("todo")} />
                <label className="btn btn-outline-danger" htmlFor="todo">Show To Do</label>
            </div>
            {renderTasks()}
        </div>
    );
}

export default TaskList;