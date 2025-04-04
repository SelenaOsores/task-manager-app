import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMessage("Error al enviar el correo. Inténtalo de nuevo.");
    } else {
      setMessage("Revisa tu email para acceder.");
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center px-3" style={{ background: "#36393F", height:"90vh" }}>
      <div className="container-fluid d-flex justify-content-center">
        <div 
          className="p-4 p-md-5 text-center rounded-4 shadow-lg w-100" 
          style={{ maxWidth: "420px", background: "#1A1A1A" }}
        >
          <h2 className="fw-bold mb-3 text-white">Iniciar sesión</h2>
          <p className="mb-4 text-light fs-5">Te enviaremos un enlace a tu correo</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control bg-dark text-light border-0 p-3 mb-3"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="btn w-100 fw-bold py-3"
              style={{ background: "#ffffff", color: "#0D0D0D", transition: "0.3s" }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>

          {message && <p className="mt-3 text-success">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;