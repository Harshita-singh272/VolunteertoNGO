
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Login_card.css";

import loginImage from "../assets/backg.jpg";
import loginsticker from "../assets/sticker.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthForm = ({ type, onSuccess }) => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (loading) return;

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      if (formData.password.length < 8) {
        setError("Password must contain at least 8 characters.");
        return;
      }

      if (!formData.role) {
        setError("Please select your account role.");
        return;
      }

      if (!formData.username.trim()) {
        setError("Please enter your username.");
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/signup";

      const requestData = isLogin
        ? {
            email: formData.email.trim(),
            password: formData.password,
          }
        : {
            role: formData.role,
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
          };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      if (!data.token || !data.user) {
        throw new Error(
          "Authentication information was not received from the server."
        );
      }

      const user = data.user;
      const role = user.role?.toLowerCase();

      if (role !== "volunteer" && role !== "ngo") {
        throw new Error("Invalid user role received from server.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      if (!isLogin) {
        const profileRoute =
          role === "volunteer"
            ? "/volunteer-profile/setup"
            : "/ngo/profile/setup";

        window.location.replace(profileRoute);

        return;
      }

      const dashboardRoute =
        role === "volunteer"
          ? "/volunteer-dashboard"
          : "/ngo-dashboard";

      navigate(dashboardRoute, {
        replace: true,
      });

      onSuccess?.();
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
                    autoComplete="username"
                  />
                </div>

                <br />
              </>
            )}

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
                onChange={(event) => {
                  handleChange(event);

                  event.target.setCustomValidity(
                    event.target.validity.typeMismatch
                      ? "Please enter a valid email address."
                      : ""
                  );
                }}
                onInvalid={(event) => {
                  event.target.setCustomValidity(
                    event.target.validity.typeMismatch
                      ? "Please enter a valid email address."
                      : "Please enter your email address."
                  );
                }}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <br />

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
                autoComplete={
                  isLogin ? "current-password" : "new-password"
                }
              />
            </div>

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
                    autoComplete="new-password"
                  />
                </div>
              </>
            )}

            {error && (
              <p
                className="auth_error"
                role="alert"
              >
                {error}
              </p>
            )}

            <br />

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
