import React from 'react';
import { useTasks } from '../context/TaskContext';

function TaskCard({ task }) {
    const {deleteTask, updateTask} = useTasks();


    const handleDelete = () =>{
        deleteTask(task.id);
    }
    const handleTogglecompleted = () =>{
        updateTask(task.id, {completed:!task.completed});   
    };

    return (
        <div class='border-2 bg-red-500'>
            {task.tittle} - {task.completed ? "✅ completed" : "⏳ To Do"}
            <button>
                edit
            </button>
            <button onClick={()=>handleTogglecompleted()}>
                completed
            </button>
            <button onClick={()=>handleDelete()}>
                delete
            </button>
        </div>
    )
}

export default TaskCard