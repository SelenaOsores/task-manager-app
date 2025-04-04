import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/client';
import { TaskContextProvider } from './context/TaskContext';
import Navbar from './components/Navbar';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!session && location.pathname === "/") {
        navigate("/login");
      } else if (session && location.pathname === "/login") {
        navigate("/");
      }
    }
  }, [session, isLoading, navigate, location.pathname]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="App">
      <TaskContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;