import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify";
import { registerUser } from "../../service/Authservice";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHabdler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success("Registration successful. Please log in.");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error occurred while registering");
      }
    }
  };

  return (
    <section
      className="app-section d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="app-card login-card mt-2 mb-2 ">
        <h5 className="card-title text-center mb-3 fw-semibold fs-4">
          Sign up
        </h5>
        <form onSubmit={onSubmitHandler}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingText"
              placeholder="Enter your full name"
              required
              name="name"
              onChange={onChangeHabdler}
              value={data.name}
            />
            <label htmlFor="floatingText">Full Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              name="email"
              onChange={onChangeHabdler}
              value={data.email}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={onChangeHabdler}
              value={data.password}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberPasswordCheck"
            />
            <label className="form-check-label" htmlFor="rememberPasswordCheck">
              Remember password
            </label>
          </div>
          <div className="d-flex mb-2 gap-1">
            <button
              className="btn app-btn-gradient btn-login text-uppercase fw-bold"
              type="submit"
            >
              Sign up
            </button>
          </div>
          <div className="text-center mb-3">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
          <hr className="my-3" />
          <div className="d-grid mb-2">
            <button
              className="btn btn-google btn-login text-uppercase fw-bold"
              type="button"
            >
              <i className="fab fa-google me-2"></i> Sign in with Google
            </button>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-facebook btn-login text-uppercase fw-bold"
              type="button"
            >
              <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
