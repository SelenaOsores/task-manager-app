import {createContext, useContext, useState} from 'react';
import {supabase} from '../supabase/client';

export const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context)throw new Error('useTasks must be used within a TaskContextProvider')
    return context;
};

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);

    const getTasks = async (completed) => {
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser();
    
            if (!user) {
                console.error("No user found.");
                return;
            }

            let query = supabase
                .from("tasks")
                .select()
                .eq("userID", user.id)
                .order("id", { ascending: true });

            if (completed !== undefined) {
                query = query.eq("completed", completed);
            }

            const { data, error } = await query;
            if (error) throw error;

            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error.message);
        }
        setLoading(false);
    };
    const createTask = async (tasktittle,description) =>{
        setAdding(true)
        try {
            // Obtener usuario autenticado
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error getting user:", error.message);
                return;
            }

            const user = data.user;
            if (!user) {
                console.error("No user is logged in");
                return;
            }

            // Insertar la tarea con el userID
            const { data: result, error: insertError } = await supabase
    .from("tasks")
    .insert([
        {
            tittle: tasktittle,
            description: description,
            userID: user.id, 
        },
    ])
    .select(); //devuelve los datos

            if (insertError) {
                console.error("Error inserting task:", insertError.message);
            } else {
                console.log("Task added:", result);
                setTasks([...tasks, ...result])
            }
        } catch (error) {
            console.error(error);
        }finally{
            setAdding(false);
        }
        
    }
    const deleteTask = async (id) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("No user found.");
                return;
            }
    
            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq("userID", user.id) // 'userID' debe coincidir con la base de datos
                .eq("id", id);
    
            if (error) throw error;
    
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error.message);
        }
    };
    const updateTask = async (id, updateFields) => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;
            if (!user) {
                console.error("No user found.");
                return;
            }
    
            const { error, data } = await supabase
                .from("tasks")
                .update(updateFields)
                .eq("userID", user.id)
                .eq("id", id)
                .select(); // Para ver qué se ha actualizado
    
            if (error) throw error;
    
            console.log("Updated task:", data);
            setTasks(tasks.map(task => task.id === id ? { ...task, ...updateFields } : task));
    
        } catch (error) {
            console.error("Error updating task:", error);

        }
    };
    
    
    return (
        <TaskContext.Provider value={{ tasks, getTasks, createTask, adding, loading,deleteTask, updateTask}}>
            {children}
        </TaskContext.Provider>
    );
};