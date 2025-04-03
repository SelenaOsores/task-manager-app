import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from '../components/TaskForm';
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error obteniendo usuario:", error.message);
      }
      if (!data?.user) {
        navigate("/login");
      } else {
        setUser(data.user);
      }
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      {user && <p>Bienvenido, {user.email}</p>}
      <button onClick={handleLogout}>Logout</button>
      <TaskForm/>
      <TaskList/>
    </div>
  );
}

export default Home;
