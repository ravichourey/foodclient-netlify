import React, { useContext } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { loginUser } from "../../service/Authservice";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken , refreshFoodList , loadCartData } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const loginPayload = {
      email: data.email, // <-- use 'email' as key
      password: data.password,
    };
    try {
      const response = await loginUser(loginPayload);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await refreshFoodList();
        await loadCartData(response.data.token);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while logging in");
    }
  };
  return (
    <section
      className="app-section d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="app-card login-card">
        <h5 className="card-title text-center mb-4 fw-semibold fs-4">
          Sign In
        </h5>
        <form onSubmit={onSubmitHandler}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              onChange={onChangeHandler}
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
              Sign in
            </button>
            <button
              className="btn btn-google btn-login text-uppercase fw-bold"
              type="submit"
            >
              Reset
            </button>
          </div>
          <div className="text-center mb-3">
            Already have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
