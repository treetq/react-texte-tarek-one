import axios from "axios";

import { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  sessionToken: null,
  user: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

const saveSession = () => {
  localStorage.setItem("sessionToken", JSON.stringify(sessionToken));
  localStorage.setItem("user", JSON.stringify(user));
};

const loadSession = () => {
  const sessionToken = localStorage.getItem("sessionToken");
  const user = localStorage.getItem("user");
  return {
    sessionToken: sessionToken ? JSON.parse(sessionToken) : null,
    user: user ? JSON.parse(user) : null,
  };
};

export const AuthProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loaded = loadSession();

    if (loaded.sessionToken) {
      setSessionToken(loaded.sessionToken);
      setUser(loaded.user);
      setIsLoggedIn(true);
    }
    setIsInitialized(true);
  }, []);

  const login = useCallback(async (email, password) => {
    const url = "http://localhost:1300/auth/login";
    const body = {
      email,
      password,
    };

    const res = await axios({
      method: "POST",
      url,
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSessionToken(res.data.data.session);
    setUser(res.data.data.user);
    setIsLoggedIn(true);

    saveSession(res.data.data.session, res.data.data.user);
  });

  const logout = useCallback(async () => {
    saveSession("", "");
    setSessionToken(null);
    setUser(null);
    setIsLoggedIn(false);
  });

  const signup = useCallback(async (email, password, displayedName) => {
    const url = "http://localhost:1300/auth/register";
    const body = {
      email,
      password,
      displayedName,
    };

    const res = await axios({
      method: "POST",
      url,
      data: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSessionToken(res.data.data.session);
    setUser(res.data.data.user);
    setIsLoggedIn(true);

    saveSession(res.data.data.session, res.data.data.user);
  });

  return (
    <AuthContext.Provider
      value={{
        isInitialized,
        sessionToken,
        user,
        isLoggedIn,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
