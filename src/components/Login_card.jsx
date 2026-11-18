
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login_card.css";

import loginImage from "../assets/backg.jpg";
import loginsticker from "../assets/sticker.png";

// Backend URL
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();

  const isLogin = type === "login";

  const [formData, setFormData] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGES
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  // REDIRECT ACCORDING TO USER ROLE
  const redirectUser = (role) => {
    if (role === "volunteer") {
      navigate("/volunteer-dashboard");
    } else if (role === "ngo") {
      navigate("/ngo-dashboard");
    } else {
      setError("Invalid account role received from server.");
    }
  };

  // HANDLE LOGIN AND SIGNUP
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      let endpoint;
      let requestData;

      // =================================
      // LOGIN
      // =================================

      if (isLogin) {
        endpoint = "/api/auth/login";

        requestData = {
          email: formData.email.trim(),
          password: formData.password,
        };
      }

      // =================================
      // SIGNUP
      // =================================

      else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }

        if (!formData.role) {
          setError("Please select your account role.");
          setLoading(false);
          return;
        }

        requestData = {
          role: formData.role,
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
        };

        endpoint = "/api/auth/signup";
      }

      // =================================
      // SEND REQUEST TO BACKEND
      // =================================

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      // =================================
      // HANDLE BACKEND ERRORS
      // =================================

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      // =================================
      // GET USER INFORMATION
      // =================================

      const user = data.user || data;

      const role = user.role?.toLowerCase();

      if (role !== "volunteer" && role !== "ngo") {
        throw new Error(
          "The server did not return a valid user role."
        );
      }

      // =================================
      // SAVE AUTHENTICATION INFORMATION
      // =================================

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      localStorage.setItem("user", JSON.stringify(user));

      // =================================
      // REDIRECT USER
      // =================================

      redirectUser(role);

    } catch (error) {
      console.error("Authentication error:", error);

      setError(
        error.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login_card"
      style={{
        backgroundImage: `url("${loginImage}")`,
      }}
    >
      <h1>
        {isLogin ? "Welcome Back" : "Join Us"}
      </h1>

      <div className="login_content">

        <img
          src={loginsticker}
          alt="Login"
          className="icon"
        />

        <div className="login_block">

          <h2>
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <form
            className="login_input"
            onSubmit={handleSubmit}
          >

            {/* SIGNUP ROLE */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="role">
                    Sign up as:
                  </label>

                  <br />

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select your role
                    </option>

                    <option value="volunteer">
                      Volunteer
                    </option>

                    <option value="ngo">
                      NGO
                    </option>
                  </select>
                </div>

                <br />

                {/* USERNAME */}
                <div>
                  <label htmlFor="username">
                    Username:
                  </label>

                  <br />

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>

                <br />
              </>
            )}

            {/* EMAIL */}
            <div>
              <label htmlFor="email">
                Email:
              </label>

              <br />

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <br />

            {/* PASSWORD */}
            <div>
              <label htmlFor="password">
                Password:
              </label>

              <br />

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            {!isLogin && (
              <>
                <br />

                <div>
                  <label htmlFor="confirmPassword">
                    Confirm Password:
                  </label>

                  <br />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <p
                className="auth_error"
                role="alert"
              >
                {error}
              </p>
            )}

            <br />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Sign Up"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
