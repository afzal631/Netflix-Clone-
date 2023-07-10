import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
  }
  h1 {
    padding: 0 20rem;
  }
  .form {
    width: 60%;
    display: grid;
    grid-template-columns: ${({ showPassword }) =>
      showPassword ? "1fr 1fr" : "2fr 1fr"};
    gap: 1rem;
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (formValues.email !== "" && formValues.password !== "") {
      try {
        const { email, password } = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
      } catch (err) {
        console.log(err);
      }

      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/");
      });
    }else{
      alert("Please enter fields");
    }
  };

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login />
        <div className="body flex flex-col justify-center items-center gap-4">
          <div className="text flex flex-col gap-4 text-center text-[2rem]">
            <h1 className="text-5xl font-bold">
              Unlimited movies, TV shows and more
            </h1>
            <h4 className="text-2xl">Watch anywhere. Cancel anytime</h4>
            <h6 className="text-2xl">
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form ">
            <input
              className="text-white bg-black opacity-60 text-[1.5rem] rounded p-4 border-2 border-solid border-black focus:outline-white"
              type="email"
              placeholder="Email Address"
              value={formValues.email}
              name="email"
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            {showPassword && (
              <input
                className="text-white bg-black opacity-60 text-[1.5rem] rounded p-4 border-2 border-solid border-black focus:outline-white"
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            )}
            {!showPassword && (
              <button
                className="bg-[#e50914] border-none cursor-pointer rounded text-white font-bold text-[1.05rem]"
                style={{ padding: ".5rem 1rem" }}
                onClick={() => setShowPassword(true)}
              >
                Get Started
              </button>
            )}
          </div>
          <button
            className="bg-[#e50914] border-none cursor-pointer text-white rounded font-bold text-[1.05rem]"
            style={{ padding: ".5rem 1rem" }}
            onClick={handleSignIn}
          >
            Sign up
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
