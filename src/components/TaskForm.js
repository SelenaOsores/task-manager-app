import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskForm() {
    const [tasktittle, setTasktittle] = useState("");
    const [description, setDescription] = useState("");
    const { createTask, adding } = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTask(tasktittle, description);
        setTasktittle("");
        setDescription("");
    };

    return (
        <div className="card border-0 p-3 w-100">
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write a task title"
                        onChange={(e) => setTasktittle(e.target.value)}
                        value={tasktittle}
                        required // Hacer que el título sea obligatorio
                    />
                </div>
                <div className="mb-2">
                    <textarea
                        className="form-control"
                        placeholder="Write a description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows="1"
                        style={{ resize: "none", overflow: "hidden" }}
                        onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />
                </div>
                <button className="btn btn-primary w-100" disabled={adding} type="submit">
                    {adding ? "Adding..." : "Add"}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;