import "../styles/Login_card.css";
import loginImage from "../assets/backg.jpg";
import loginsticker from "../assets/sticker.png";
import React, { useState } from "react";

const AuthForm = ({ type }) => {
  const isLogin = type === "login";

  const [formData, setFormData] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Handles all input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // LOGIN
    if (isLogin) {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      console.log("Login Data:", loginData);

      // Backend connection will come here later
      // POST /api/auth/login

      return;
    }

    // SIGN UP
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const signupData = {
      role: formData.role,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log("Signup Data:", signupData);

    // Backend connection will come here later
    // POST /api/auth/signup
  };

  return (
    <div
      className="login_card"
      style={{ backgroundImage: `url("${loginImage}")` }}
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

            {/* SIGN UP ONLY - ROLE */}
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
                onChange={handleChange}
                placeholder="Enter your email"
                required
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
                  />
                </div>
              </>
            )}
            {error && (
              <>
                <br />
                <p>{error}</p>
              </>
            )}
            <br />
            <br />
            <button type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

