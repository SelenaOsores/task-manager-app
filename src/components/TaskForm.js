import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
    const [tasktittle, setTasktittle] = useState("");
    const [description, setDescription] = useState("");
    const {createTask, adding} = useTasks();

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTask(tasktittle, description);
        setTasktittle("");
        setDescription("");
    }; 


    return (
        <div class="border-2 flex ">
            <form onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    tittle="tasktittle"
                    placeholder="Write a task tittle"
                    onChange={(e) => setTasktittle(e.target.value)   }
                    value={tasktittle}
                />
                <input
                    type="text"
                    tittle="description"
                    placeholder="Write a description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <button disabled ={adding}type="submit">{adding ? "adding" : "add"}</button>
            </form>
        </div>
    );
}

export default TaskForm;
