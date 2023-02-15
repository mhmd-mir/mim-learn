// importing styles
import "./App.css";
// importing routes array
import { routes } from "./routes";
// importing hooks
import { useNavigate, useRoutes } from "react-router-dom";
import { useCallback } from "react";
// importing contexts
import AuthContext from "./context/authContext";
import { useEffect, useState } from "react";


function App() {
  // useRoute hook
  const allRoutes = useRoutes(routes);
  // states =>
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);
  const [update , setUpdate] = useState(false)

  const [indexPageInfo , setIndexPageInfo] = useState({})
  // handlers =>
  const login = useCallback((userInfos, token) => {
    setToken(token);
    localStorage.setItem("user-token", JSON.stringify(token));
    setIsLoggedIn(true);
    setUserInfos(userInfos);
  } , []);
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("user-token");
    setUserInfos(null);
    setIsLoggedIn(false);
  } , []);
  // useEffect
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("user-token"));
    if (userToken) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }).then(res => res.json())
      .then(data => {
        setIsLoggedIn(true)
        setUserInfos(data)
      })
    }else{
      setIsLoggedIn(false);
      setUserInfos(null);
    }
  }, [login , update]);
  // useEffect : index page data => 
  useEffect(() => {
    fetch('http://localhost:4000/v1/infos/index' )
      .then(res => res.json())
      .then(data => setIndexPageInfo(data))
  } , [])
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        setUpdate ,
        indexPageInfo
      }}
    >
      {allRoutes}
    </AuthContext.Provider>
  );
}

export default App;
