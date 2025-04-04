import { Link } from "react-router-dom";
import { supabase } from "../supabase/client";

function Navbar() {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sesión cerrada");
      // Aquí podrías redirigir al login si lo necesitas
      // window.location.href = "/login"; 
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiar y dark" style={{height:"10vh"}}>
        <div className="container">
          <Link className="navbar-brand px-4 text-light" to="/">Task Manager</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-link text-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
