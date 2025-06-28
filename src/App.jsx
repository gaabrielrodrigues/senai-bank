import { useAuth } from './context/AuthContext';
import Login from './Login';
import Home from './Home';

export default function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Home /> : <Login />;
}