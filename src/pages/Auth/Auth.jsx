import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, signUp } from "../../actions/AuthActions.js";
const Auth = () => {
  // initialising an empty object for from
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  // function to handle any change in input value of form.
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // displaying loader while fetching get it from reducers
  const loading = useSelector((state) => state.authReducer.loading);
  // making an instance of navigate hook
  const navigate = useNavigate();
  //  making an instance of dispatch hook
  const dispatch = useDispatch();
  //state to check whether to render sign up page or login page.
  const [isSignUp, setIsSignUp] = useState(false);
  // state to store data of form.
  const [data, setData] = useState(initialState);
  //   to check whether password is same or not.
  const [confirmPass, setConfirmPass] = useState(true);

   // Form Submission
   const handleSubmit = (e) => {
    setConfirmPass(true);
    // page will not redirect to other page
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
};

  //  Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Usernames"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          

          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {setIsSignUp((prev) => !prev);resetForm();}}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Dont have an account ? Sign Up!"}
            </span>
          </div>
          <button className="button infoButton" type="submit" disabled={loading}>
          {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};


export default Auth;
