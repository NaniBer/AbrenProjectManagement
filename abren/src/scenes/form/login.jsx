import React, { useState, useEffect } from "react";
import { tokens } from "../../theme";
import { Typography, useTheme, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { loginSucess } from "../../Actions/authActions";
import { useDispatch } from "react-redux";
// import useDispatch from "react-redux";
import Logo from "../../images/abrenWhite.png";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [errors, setErrors] = useState({});

  const fontFamilyStyle = {
    fontFamily: "Dancing Script, cursive",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleRememberMeChange = (e) => {
    const newValue = e.target.checked;
    setRememberMe(newValue);
  };
  const handleAdminChange = (e) => {
    const newValue = e.target.checked;
    setAdmin(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Basic validation
    if (!username) {
      setErrors({ username: "Please enter your Username" });
      return;
    }

    if (!password) {
      setErrors({ password: "Please enter your password" });
      return;
    }

    const formData = { username, password };

    if (admin) {
      formData.type = "admin";
    } else {
      formData.type = "user";
    }
    fetch("/auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      const statusCode = response.status;
      if (statusCode === 200) {
        response.json().then((data) => {
          const user = data.user;
          console.log({ user });

          const id = user._id.toString();
          console.log(id);
          fetch("/Users/getProjects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id }),
          }).then((response) => {
            const statusCode = response.status;
            if (statusCode === 200) {
              //Logged in successfully
              response.json().then((data) => {
                if (!admin) {
                  user.projects = data;
                  // console.log(user.projects);
                  dispatch(loginSucess(user));
                  navigate("/user/");
                } else {
                  dispatch(loginSucess(user));
                  navigate("/admin");
                }
              });
            }
          });
        });
      } else {
        // Handle non-200 status codes if needed
        console.error("Request failed with status code:", statusCode);
      }
    });

    // Simulating login process
    if (username === "example@example.com" && password === "password123") {
      // Successful login
      alert("Login successful!");

      // Remember Me feature
      if (rememberMe) {
        // Save login credentials in localStorage or cookies
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
      } else {
        // Clear saved login credentials
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    } else {
      // Failed login
      setErrors({ login: "Invalid Username or password" });
    }
  };

  // Retrieve saved login credentials on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#1F2A40",
        height: "100vh",
        paddingTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container-sm shadow rounded"
        style={{
          backgroundColor: "#ffffff",
          width: "450px",
          position: "relative",
          height: "auto",
          display: "flex",
          alignItems: "center",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <div className="col">
          <form onSubmit={handleSubmit}>
            {/* <Typography
              variant="h5"
              style={{
                fontFamilyStyle,
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              Abren
            </Typography> */}
            <Box display="flex" justifyContent="center" alignItems="center">
              <img alt="idk" width="100px" height="100px" src={Logo}></img>
            </Box>
            <Typography
              variant="h4"
              style={{
                color: colors.primary[500],
                display: "flex",
                justifyContent: "center",
              }}
            >
              Login
            </Typography>
            <div className="mb-1">
              <label htmlFor="username" className="form-label"></label>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
                placeholder="Username"
                style={{ borderColor: "#6791AF" }}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <div className="input-group">
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Password"
                  style={{ borderColor: "#6791AF" }}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div
              className="col"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div className="mb-3  form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="admin"
                  checked={admin}
                  onChange={handleAdminChange}
                />
                <label
                  className="form-check-label px-2"
                  htmlFor="admin"
                  style={{
                    color: colors.primary[500],
                  }}
                >
                  I am an Admin
                </label>
              </div>
              <div className="mb-3  form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <label
                  className="form-check-label px-2"
                  htmlFor="rememberMe"
                  style={{
                    color: colors.primary[500],
                  }}
                >
                  Remember Me
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "#213D52",
                width: "200px",
                paddingBottom: "5px",
                marginBottom: "5px",
              }}
            >
              Log In
            </button>
          </form>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <p
              style={{
                color: colors.primary[500],
                fontSize: "15px",
              }}
            >
              Don't have an account?{" "}
              <a href="/form" style={{ color: "#213D52" }}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
