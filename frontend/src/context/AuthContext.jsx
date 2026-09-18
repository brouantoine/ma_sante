import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("ma_sante_access"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) return;
    api.get("/auth/me/")
      .then(({ data }) => setUser(data))
      .catch(() => {
        localStorage.removeItem("ma_sante_access");
        localStorage.removeItem("ma_sante_refresh");
        setToken(null);
      });
  }, [token]);

  async function login(username, password) {
    const { data } = await api.post("/auth/login/", { username, password });
    localStorage.setItem("ma_sante_access", data.access);
    localStorage.setItem("ma_sante_refresh", data.refresh);
    setToken(data.access);
    const me = await api.get("/auth/me/");
    setUser(me.data);
  }

  function logout() {
    localStorage.removeItem("ma_sante_access");
    localStorage.removeItem("ma_sante_refresh");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
