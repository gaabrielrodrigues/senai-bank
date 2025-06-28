import { createContext, useState, useContext } from 'react';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setAuth] = useState(false);

  const login = (email, password) => {
    if (email === 'admin@email.com' && password === '1234') {
      setAuth(true);
    } else {
      alert('Credenciais inválidas');
    }
  };

  const logout = () => setAuth(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
