import React, { useState } from "react";
import "../assets/CSS/Signup.css";

import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password, role);
  };
  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-5 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                The best plateform <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>
                  for Conferences
                </span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                This website is a platform for organizing and managing events.
                It includes features like online registration, speaker and
                agenda management, and communication tools.
              </p>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                This platform streamlines the organization of conferences and
                makes it easier for organizers to deliver a
                successful&nbsp;event.
              </p>
            </div>
            <div className="col-lg-5 mb-5 mb-lg-0 position-relative">
              <div
                className="card shadow-2-strong card-registration"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-4 p-md-5">
                  <h2 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    <b> Login</b>
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <div className="form-floating">
                          <input
                            type="email"
                            id="username"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="username">
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="row"></div>
                      <div className="col-md-12 mb-4">
                        <div className="form-floating">
                          <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <input
                        className="btn btn-primary btn-lg"
                        type="submit"
                        defaultValue="Login"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="mt-4">
                      <p>
                        {" "}
                        <b>
                          <a href="#">Forgot password?</a>
                        </b>
                      </p>
                    </div>
                    {error && <div className="error">{error}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
