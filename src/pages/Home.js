import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.warn("No se pudo obtener la sesión:", error.message);
        return;
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
    <div className="container-fluid d-flex flex-column align-items-center p-4" style={{ background: "#002F5C", minHeight:"90vh" }}>
      <div className="d-flex flex-row gap-3 w-100" style={{ maxWidth: '1300px', background: "#002F5C" }}>
        <div className="card shadow-sm p-3" style={{ minWidth: '300px', background: "#DFE9F5" }}>
          <h5 className="text-center">New task</h5>
          <TaskForm />
        </div>
        <div className="card shadow-sm p-3 flex-grow-1" style={{ minWidth: '400px', background: "#DFE9F5" }}>
          <h5 className="text-center">Tasks list</h5>
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default Home;