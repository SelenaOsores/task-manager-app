import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import "bootstrap/dist/css/bootstrap.min.css";

function TaskCard({ task }) {
    const { deleteTask, updateTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.tittle);
    const [editedDescription, setEditedDescription] = useState(task.description);

    const handleDelete = () => {
        deleteTask(task.id);
    };
    
    const handleToggleCompleted = () => {
        updateTask(task.id, { completed: !task.completed });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateTask(task.id, { tittle: editedTitle, description: editedDescription });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTitle(task.tittle);
        setEditedDescription(task.description);
    };

    return (
        <div className="card shadow-sm mb-2 w-100 border-0">
            <div className="card-body d-flex flex-column justify-content-between align-items-start rounded-4" style={{ background: "#DFE9F5" }}>
                {isEditing ? (
                    <div className="w-100">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Edit title"
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                            placeholder="Edit description"
                        />
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-success btn-sm me-2" onClick={handleSave}>Save</button>
                            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-1 text-primary" style={{ textDecoration: "underline" }}>{task.tittle}</h5>
                            <p className={`mb-1 ${task.completed ? "text-success" : "text-dark"}`} style={{ fontSize: "0.9rem" }}>
                                {task.completed ? "✅ Completed" : "⏳ To Do"}
                            </p>
                        </div>
                        <hr className="my-2" />
                        <p className="card-text text-muted">{task.description}</p>
                    </div>
                )}
                {!isEditing && (
                    <div className="d-flex flex-column flex-md-row mt-2 mt-md-0">
                        <button className="btn btn-outline-primary btn-sm mb-1 mb-md-0 me-md-2" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-outline-success btn-sm mb-1 mb-md-0 me-md-2" onClick={handleToggleCompleted}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskCard;