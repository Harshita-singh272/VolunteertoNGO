import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import AuthForm from "./components/Login_card.jsx";
import "./App.css";

function App() {
  const [authType, setAuthType] = useState(null);

  const openAuth = (type) => {
    setAuthType(type);
  };

  const closeAuth = () => {
    setAuthType(null);
  };

  useEffect(() => {
    if (authType) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [authType]);

  return (
    <>
      <Home onAuthClick={openAuth} />
      
      {authType && (
        <div
          className="auth-overlay"
          onClick={closeAuth}
        >
          <div
            className="auth-popup"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="auth-close"
              type="button"
              onClick={closeAuth}
            >
              ×
            </button>

            <AuthForm type={authType} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;