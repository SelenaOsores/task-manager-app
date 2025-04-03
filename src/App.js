
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { supabase } from './supabase/client';
import { TaskContextProvider } from './context/TaskContext';

function App() {
  // Hooks for handling navigation and tracking the current location
  const navigate = useNavigate();
  const location = useLocation();

  // State to manage user session
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Prevents redirection before fetching session

  // useEffect to fetch user session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session); // Store session if it exists
      setIsLoading(false); // Mark loading as complete
    };
    checkSession();

    // Subscribe to authentication state changes to update the session state
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update session state whenever it changes
    });

    // Cleanup: Unsubscribe when the component unmounts
    return () => listener.subscription.unsubscribe();
  }, []);

  // useEffect to handle route redirection based on authentication status
  useEffect(() => {
    if (!isLoading) {
      if (!session && location.pathtittle === "/") {
        // If there's no session and the user is on the home page, redirect to login
        navigate("/login");
      } else if (session && location.pathtittle === "/login") {
        // If the user is logged in but on the login page, redirect to home
        navigate("/");
      }
    }
  }, [session, isLoading, navigate, location.pathtittle]);

  // Display a loading message while fetching the session
  if (isLoading) return <div>Loading...</div>;

  return (
    <div classtittle="App">
      <TaskContextProvider>
      <Routes>
        {/* Home page, accessible only when authenticated */}
        <Route path="/" element={<Home />} />

        {/* Login page, should only be accessible when not logged in */}
        <Route path="/login" element={<Login />} />

        {/* Any unknown route will show a 404 Not Found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
